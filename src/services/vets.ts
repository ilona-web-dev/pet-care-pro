import { type Vet } from '../types/admin';
import { supabase } from '../lib/supabaseClient';

export type VetRow = {
  id: string;
  created_at: string;
  full_name: string;
  role: string;
  years_experience: number;
  is_active: boolean;
  notes?: string;
};

type CreateVetPayload = {
  fullName: string;
  role: string;
  yearsExperience: number;
  isActive: boolean;
  notes?: string;
};

export const mapCreateVetPayload = (payload: CreateVetPayload) => ({
  full_name: payload.fullName,
  role: payload.role,
  years_experience: payload.yearsExperience,
  is_active: payload.isActive,
  notes: payload.notes ?? null,
});

export const mapVet = (row: VetRow): Vet => ({
  id: row.id,
  fullName: row.full_name,
  role: row.role,
  yearsExperience: row.years_experience,
  isActive: row.is_active,
  notes: row.notes,
});

export async function fetchVets(): Promise<Vet[]> {
  const { data: vets, error } = await supabase
    .from('vets')
    .select('*')
    .order('created_at');

  if (error) throw error;
  const rows = (vets ?? []) as VetRow[];
  return rows.map(mapVet);
}

export async function createVet(payload: CreateVetPayload): Promise<Vet> {
  const { data: vet, error } = await supabase
    .from('vets')
    .insert(mapCreateVetPayload(payload))
    .select()
    .single<VetRow>();

  if (error) throw error;
  return mapVet(vet);
}
