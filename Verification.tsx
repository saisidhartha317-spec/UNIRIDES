
import React, { useState } from 'react';
import { User } from '../types';
import { verifyDocument } from '../services/geminiService';

interface VerificationProps {
  user: User;
  onComplete: (user: User) => void;
}

const Verification: React.FC<VerificationProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState<1 | 2>(1); // 1: ID, 2: License (Optional)
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'ID' | 'License') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const isPDF = file.type === 'application/pdf';
    
    if (!validImageTypes.includes(file.type) && !isPDF) {
      setError("Please upload a valid image (JPG, PNG) or a PDF file.");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const resultDataUrl = reader.result as string;
        const base64 = resultDataUrl.split(',')[1];
        const mimeType = file.type;
        
        // Pass user.college only when verifying Student ID
        const result = await verifyDocument(
          base64, 
          type, 
          mimeType, 
          type === 'ID' ? user.college : undefined
        );

        if (result.isValid && result.confidence > 0.6) {
          if (type === 'ID') {
            setStep(2);
          } else {
            onComplete({ ...user, isVerified: true, isDriver: true });
          }
        } else {
          // Provide more specific feedback if the college didn't match
          const errorMessage = result.reason || (type === 'ID' 
            ? `The ID card does not seem to match ${user.college}. Please ensure you uploaded the correct card.` 
            : "We couldn't verify this document clearly. Please ensure the text is legible.");
          setError(errorMessage);
        }
        setIsVerifying(false);
      };
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 py-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {step === 1 ? 'Verify Your Student ID' : 'Add Driving License'}
        </h2>
        <p className="text-slate-600 mt-2">
          {step === 1 
            ? `Verifying ID for ${user.college}` 
            : 'Want to offer rides? Upload your driving license (Image or PDF).'}
        </p>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
        {isVerifying ? (
          <div className="space-y-4 py-8">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="font-medium text-slate-700 animate-pulse">
              {step === 1 ? `Checking ID against ${user.college}...` : 'Gemini AI is analyzing your License...'}
            </p>
            <p className="text-xs text-slate-400">Secure AI processing in progress.</p>
          </div>
        ) : (
          <div className="space-y-6 w-full">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600">
              {step === 1 ? (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm5 3a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ) : (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
            
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <div className="relative">
              <input 
                type="file" 
                id="doc-upload" 
                accept={step === 1 ? "image/*" : "image/*,.pdf"}
                className="hidden" 
                onChange={(e) => handleFileUpload(e, step === 1 ? 'ID' : 'License')}
              />
              <label 
                htmlFor="doc-upload"
                className="cursor-pointer block w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
              >
                {step === 1 ? `Upload ID for ${user.college}` : 'Upload License (Image/PDF)'}
              </label>
            </div>

            {step === 2 && (
              <button 
                onClick={() => onComplete({ ...user, isVerified: true, isDriver: false })}
                className="text-indigo-600 font-medium hover:underline text-sm"
              >
                I don't have a car, I just want to join as a passenger
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
        <div className="bg-blue-600 text-white rounded-full p-1 mt-0.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>Strict College Verification:</strong> The uploaded ID must clearly show it belongs to <strong>{user.college}</strong>. This ensures all users on this campus are legitimate students.
        </p>
      </div>
    </div>
  );
};

export default Verification;
