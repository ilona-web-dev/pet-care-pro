import { type Vet } from '../types/admin';
import { supabase } from '../lib/supabaseClient';

export type VetRow = {
  id: string;
  created_at: string;
  full_name: string;
  role: string;
  years_experience: number;
  active: boolean;
};

export const mapVet = (row: VetRow): Vet => ({
  id: row.id,
  fullName: row.full_name,
  role: row.role,
  yearsExperience: row.years_experience,
  active: row.active,
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
