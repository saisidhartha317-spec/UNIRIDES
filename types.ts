
export type Gender = 'Male' | 'Female' | 'Other';
export type VehicleType = 'Car' | 'Bike';

export interface User {
  id: string;
  name: string;
  college: string;
  gender: Gender;
  isVerified: boolean;
  isDriver: boolean;
  vehiclePreference?: VehicleType;
  avatar: string;
  idCardUrl?: string;
  licenseUrl?: string;
}

export interface Ride {
  id: string;
  title: string;
  driverId: string;
  driverName: string;
  driverGender: Gender;
  vehicleType: VehicleType;
  origin: string;
  destination: string;
  time: string;
  availableSeats: number;
  pricePerSeat: number;
}

export interface VerificationResult {
  isValid: boolean;
  extractedName?: string;
  extractedCollege?: string;
  documentType: 'ID' | 'License' | 'Unknown';
  confidence: number;
  reason?: string;
}
