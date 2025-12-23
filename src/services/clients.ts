import { supabase } from '../lib/supabaseClient';
import type { Client } from '../types/admin';

export type ClientRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string | null;
  notes: string | null;
  created_at: string;
};

export type CreateClientPayload = {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
};

export const mapClient = (row: ClientRow): Client => ({
  id: row.id,
  fullName: row.full_name,
  email: row.email,
  phone: row.phone,
  address: row.address ?? '',
  notes: row.notes ?? '',
  createdAt: row.created_at,
});

export async function fetchClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at')
    .returns<ClientRow[]>();

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapClient);
}

export async function createClient(
  payload: CreateClientPayload,
): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .insert({
      full_name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      address: payload.address ?? null,
      notes: payload.notes ?? null,
    })
    .select()
    .single<ClientRow>();

  if (error) {
    throw error;
  }

  return mapClient(data);
}
