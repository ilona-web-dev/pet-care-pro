import { supabase } from '../lib/supabaseClient';
import { mapVisit } from './visits';
import { mapClient, type ClientRow } from './clients';

import type {
  Pet,
  PetResponse,
  PetSex,
  PetSort,
  PetSpecies,
} from '../types/admin';

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

type FetchPetsOptions = {
  search?: string;
  sort: PetSort;
};

export async function fetchPets(
  page: number,
  rowsPerPage: number,
  filters?: FetchPetsOptions,
): Promise<PetResponse> {
  const from = page * rowsPerPage;
  const to = from + rowsPerPage - 1;
  const searchValue = filters?.search?.trim();
  const sortValue = filters?.sort ?? 'name-asc';

  let query = supabase.from('pets').select('*', { count: 'exact' });

  if (searchValue) {
    const pattern = `%${searchValue}%`;
    query = query.or(
      `name.ilike.${pattern},species.ilike.${pattern},breed.ilike.${pattern}`,
    );
  }

  switch (sortValue) {
    case 'name-desc':
      query = query.order('name', { ascending: false });
      break;
    case 'name-asc':
      query = query.order('name', { ascending: true });
      break;
    case 'created-desc':
      query = query.order('created_at', { ascending: false });
      break;
    case 'created-asc':
      query = query.order('created_at', { ascending: true });
      break;
  }

  const { data, error, count } = await query.range(from, to);

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

export const PET_NOT_DELETED = 'PET_NOT_DELETED';

export async function deletePet(id: string) {
  const { data, error } = await supabase
    .from('pets')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error(PET_NOT_DELETED);
}

export async function fetchPetDetails(petId: string) {
  const { data: petRow, error: petError } = await supabase
    .from('pets')
    .select('*')
    .eq('id', petId)
    .maybeSingle<PetRow>();

  if (petError || !petRow) throw petError ?? new Error('Pet not found');
  const pet = mapPet(petRow);

  const { data: ownerRow, error: ownerError } = await supabase
    .from('clients')
    .select('*')
    .eq('id', petRow.owner_id)
    .maybeSingle<ClientRow>();

  if (ownerError || !ownerRow) throw ownerError ?? new Error('Owner not found');
  const owner = mapClient(ownerRow);

  const { data: visitRows, error: visitError } = await supabase
    .from('visits')
    .select('*')
    .eq('pet_id', petId)
    .order('visit_date', { ascending: false });

  if (visitError) throw visitError;
  const visits = (visitRows ?? []).map(mapVisit);

  return { pet, owner, visits };
}
