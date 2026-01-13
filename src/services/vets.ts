import { supabase } from '../lib/supabaseClient';
import { type Vet } from '../types/admin';

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

type UpdateVetPayload = {
  id: string;
  data: Partial<CreateVetPayload>;
};

export const mapVet = (row: VetRow): Vet => ({
  id: row.id,
  fullName: row.full_name,
  role: row.role,
  yearsExperience: row.years_experience,
  isActive: row.is_active,
  notes: row.notes,
});

const mapCreateVetPayload = (payload: CreateVetPayload) => ({
  full_name: payload.fullName,
  role: payload.role,
  years_experience: payload.yearsExperience,
  is_active: payload.isActive,
  notes: payload.notes ?? null,
});

const mapUpdateVetPayload = (payload: Partial<CreateVetPayload>) => ({
  full_name: payload.fullName ?? undefined,
  role: payload.role ?? undefined,
  years_experience: payload.yearsExperience ?? undefined,
  is_active: payload.isActive ?? undefined,
  notes: payload.notes ?? undefined,
});

export async function fetchVets(): Promise<Vet[]> {
  const { data, error } = await supabase
    .from('vets')
    .select('*')
    .order('created_at');

  if (error) throw error;
  const rows = (data ?? []) as VetRow[];
  return rows.map(mapVet);
}

export async function createVet(payload: CreateVetPayload): Promise<Vet> {
  const { data, error } = await supabase
    .from('vets')
    .insert(mapCreateVetPayload(payload))
    .select()
    .single<VetRow>();

  if (error) throw error;
  return mapVet(data);
}

export async function updateVet({ id, data }: UpdateVetPayload): Promise<Vet> {
  const { data: row, error } = await supabase
    .from('vets')
    .update(mapUpdateVetPayload(data))
    .eq('id', id)
    .select()
    .single<VetRow>();

  if (error) throw error;
  return mapVet(row);
}
