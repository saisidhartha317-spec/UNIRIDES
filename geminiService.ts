
import { GoogleGenAI, Type } from "@google/genai";
import { VerificationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const verifyDocument = async (
  base64Data: string, 
  expectedType: 'ID' | 'License',
  mimeType: string = 'image/jpeg',
  expectedCollege?: string
): Promise<VerificationResult> => {
  try {
    const prompt = `Analyze this document (${mimeType}). We are looking for a ${expectedType === 'ID' ? 'College Student ID' : 'Driving License'}. 
    ${expectedType === 'ID' && expectedCollege ? `CRITICAL: The user claims to be from "${expectedCollege}". Verify if this ID card matches this college specifically.` : ''}
    
    Verify if it is valid, extract the full name and ${expectedType === 'ID' ? 'College Name' : 'Expiration Date'}.
    
    Rules for isValid:
    1. The document must be clearly a ${expectedType === 'ID' ? 'Student ID' : 'Driving License'}.
    ${expectedType === 'ID' && expectedCollege ? `2. The college name on the card MUST match "${expectedCollege}" (allow for minor typos or abbreviations).` : ''}
    3. The image must be clear enough to read.
    
    Return a JSON object indicating validity, extracted data, and a confidence score (0-1). If invalid, provide a clear reason.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { inlineData: { data: base64Data, mimeType: mimeType } },
            { text: prompt }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: { type: Type.BOOLEAN },
            extractedName: { type: Type.STRING },
            extractedCollege: { type: Type.STRING },
            documentType: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            reason: { type: Type.STRING }
          },
          required: ["isValid", "confidence", "documentType"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return {
      ...result,
      documentType: result.documentType || expectedType
    };
  } catch (error) {
    console.error("Verification failed:", error);
    return {
      isValid: false,
      documentType: 'Unknown',
      confidence: 0,
      reason: "Verification service error. Please check your internet connection and try again."
    };
  }
};

export const matchRides = async (userProfile: any, rides: any[]) => {
  const prompt = `Given the user ${userProfile.name} from ${userProfile.college} and the following available rides: ${JSON.stringify(rides)}, 
  recommend the top 2 best matches. Ensure the strict safety rule: ${userProfile.gender}s can only ride with ${userProfile.gender}s.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });
  
  return response.text;
};
