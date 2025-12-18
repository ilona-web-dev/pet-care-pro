export type Client = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
  createdAt: string;
};

export type Pet = {
  id: string;
  ownerId: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'other';
  breed?: string;
  sex?: 'male' | 'female';
  birthdate?: string;
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
