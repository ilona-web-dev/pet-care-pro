import { supabase } from '../lib/supabaseClient';
import { type Pet, type PetSex } from '../types/admin';
import { type PetSpecies } from '../types/admin';

// Raw Supabase row for pets table
type PetRow = {
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

// Payload received from UI when creating a pet
type CreatePetPayload = {
  name: string;
  species: PetSpecies;
  breed?: string;
  sex?: PetSex;
  birthDate?: string;
  notes?: string;
  ownerId: string;
};

// Maps Supabase row -> domain Pet model
export const mapPet = (row: PetRow): Pet => ({
  id: row.id,
  name: row.name,
  species: row.species ?? 'other',
  breed: row.breed ?? undefined,
  sex: row.sex ?? undefined,
  birthDate: row.birth_date ?? undefined,
  weightKg: row.weight_kg ?? undefined,
  microchip: row.microchip ?? undefined,
  notes: row.notes ?? undefined,
  ownerId: row.owner_id,
  createdAt: row.created_at,
});

// Maps UI payload -> Supabase insert payload
export const mapCreatePetPayload = (payload: CreatePetPayload) => ({
  name: payload.name,
  species: payload.species ?? null,
  breed: payload.breed ?? null,
  sex: payload.sex ?? null,
  birth_date: payload.birthDate,
  notes: payload.notes ?? null,
  owner_id: payload.ownerId ?? null,
});

// Fetches pets list from Supabase
export async function fetchPets(): Promise<Pet[]> {
  const { data: pets, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at');

  if (error) {
    throw error;
  }
  const rows = (pets ?? []) as PetRow[];
  return rows.map(mapPet);
}

// Creates a new pet record in Supabase and returns mapped Pet
export async function createPet(payload: CreatePetPayload): Promise<Pet> {
  const { data: pet, error } = await supabase
    .from('pets')
    .insert(mapCreatePetPayload(payload))
    .select()
    .single<PetRow>();

  if (error) throw error;
  return mapPet(pet);
}
