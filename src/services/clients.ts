import { supabase } from '../lib/supabaseClient';
import type { Client } from '../types/admin';

// Raw row returned from Supabase (snake_case + nullable fields)
export type ClientRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string | null;
  notes: string | null;
  created_at: string;
};

// Payload passed from UI when creating a client
export type CreateClientPayload = {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
};

// Maps DB row into our domain Client model (camelCase + defaults)
export const mapClient = (row: ClientRow): Client => ({
  id: row.id,
  fullName: row.full_name,
  email: row.email,
  phone: row.phone,
  address: row.address ?? '',
  notes: row.notes ?? '',
  createdAt: row.created_at,
});

// Fetches all clients from Supabase
export async function fetchClients(): Promise<Client[]> {
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at');

  if (error) throw error;

  const rows = (clients ?? []) as ClientRow[];
  return rows.map(mapClient);
}

// Creates a new client and returns mapped result
export async function createClient(
  payload: CreateClientPayload,
): Promise<Client> {
  const { data: client, error } = await supabase
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

  return mapClient(client);
}
