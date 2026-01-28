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

export type VisitReason =
  | 'vaccination'
  | 'routine_checkup'
  | 'follow_up'
  | 'grooming'
  | 'other';

export type VisitStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';

export type Visit = {
  id: string;
  petId: string;
  vetId: string;
  visitDate: string;
  reason: VisitReason;
  status: VisitStatus;
  vetName?: string;
  diagnosis?: string;
  treatment?: string;
  invoiceAmount?: number;
  notes?: string;
};

export type Vet = {
  id: string;
  fullName: string;
  role: string;
  yearsExperience: number;
  isActive: boolean;
  notes?: string;
};

export type ClientResponse = {
  data: Client[];
  count: number;
};

export type PetResponse = {
  data: Pet[];
  count: number;
};

export type VisitResponse = {
  data: Visit[];
  count: number;
};

export type VetResponse = {
  data: Vet[];
  count: number;
};

export type ClientSort =
  | 'name-asc'
  | 'name-desc'
  | 'created-asc'
  | 'created-desc';
