import { supabase } from '../lib/supabaseClient';
import type { Pet, PetResponse, PetSex, PetSpecies } from '../types/admin';

export type PetRow = {
  id: string;
  owner_id: string;
  name: string;
  species: PetSpecies | null;
  breed: string | null;
  sex: PetSex | null;
  birth_date: string | null;
  weight_kg: number | null;
  microchip: string | null;
  notes: string | null;
  created_at: string;
};

export type CreatePetPayload = {
  ownerId: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  sex?: PetSex;
  birthDate?: string;
  weightKg?: number;
  microchip?: string;
  notes?: string;
};

export type UpdatePetPayload = {
  id: string;
  data: Partial<CreatePetPayload>;
};

export const mapPet = (row: PetRow): Pet => ({
  id: row.id,
  ownerId: row.owner_id,
  name: row.name,
  species: row.species ?? 'other',
  breed: row.breed ?? undefined,
  sex: row.sex ?? undefined,
  birthDate: row.birth_date ?? undefined,
  weightKg: row.weight_kg ?? undefined,
  microchip: row.microchip ?? undefined,
  notes: row.notes ?? undefined,
  createdAt: row.created_at,
});

const mapCreatePetPayload = (payload: CreatePetPayload) => ({
  owner_id: payload.ownerId,
  name: payload.name,
  species: payload.species,
  breed: payload.breed ?? null,
  sex: payload.sex ?? null,
  birth_date: payload.birthDate ?? null,
  weight_kg: payload.weightKg ?? null,
  microchip: payload.microchip ?? null,
  notes: payload.notes ?? null,
});

const mapUpdatePetPayload = (payload: Partial<CreatePetPayload>) => ({
  owner_id: payload.ownerId ?? undefined,
  name: payload.name ?? undefined,
  species: payload.species ?? undefined,
  breed: payload.breed ?? undefined,
  sex: payload.sex ?? undefined,
  birth_date: payload.birthDate ?? undefined,
  weight_kg: payload.weightKg ?? undefined,
  microchip: payload.microchip ?? undefined,
  notes: payload.notes ?? undefined,
});

export async function fetchPets(
  page: number,
  rowsPerPage: number,
): Promise<PetResponse> {
  const from = page * rowsPerPage;
  const to = from + rowsPerPage - 1;

  const { data, error, count } = await supabase
    .from('pets')
    .select('*', { count: 'exact' })
    .order('created_at')
    .range(from, to);

  if (error) throw error;
  const rows = (data ?? []) as PetRow[];
  return { data: rows.map(mapPet), count: count ?? 0 };
}

export async function createPet(payload: CreatePetPayload): Promise<Pet> {
  const { data, error } = await supabase
    .from('pets')
    .insert(mapCreatePetPayload(payload))
    .select()
    .single<PetRow>();

  if (error) throw error;
  return mapPet(data);
}

export async function fetchAllPets(): Promise<Pet[]> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at');
  if (error) throw error;
  return (data ?? []).map(mapPet);
}

export async function updatePet({ id, data }: UpdatePetPayload): Promise<Pet> {
  const { data: row, error } = await supabase
    .from('pets')
    .update(mapUpdatePetPayload(data))
    .eq('id', id)
    .select()
    .single<PetRow>();

  if (error) throw error;
  return mapPet(row);
}
