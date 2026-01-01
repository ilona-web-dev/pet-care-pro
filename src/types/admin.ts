export type Client = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
  createdAt: string;
};

export type PetSpecies = 'dog' | 'cat' | 'bird' | 'other';
export type PetSex = 'male' | 'female';

export type Pet = {
  id: string;
  ownerId: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  sex?: PetSex;
  birthDate?: string;
  weightKg?: number;
  microchip?: string;
  notes?: string;
  createdAt: string;
};

export type VisitStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';

export type Visit = {
  id: string;
  petId: string;
  visitDate: string;
  reason: string;
  status: VisitStatus;
  vetName?: string;
  diagnosis?: string;
  treatment?: string;
  invoiceAmount?: number;
  notes?: string;
  createdAt: string;
};

export type Vet = {
  id: string;
  fullName: string;
  role: string;
  yearsExperience: number;
  active: boolean;
};
