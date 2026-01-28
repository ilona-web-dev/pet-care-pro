import { supabase } from '../lib/supabaseClient';
import type { Client, ClientResponse, ClientSort } from '../types/admin';

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

export type UpdateClientPayload = {
  id: string;
  data: Partial<CreateClientPayload>;
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

const mapCreateClientPayload = (payload: CreateClientPayload) => ({
  full_name: payload.fullName,
  email: payload.email,
  phone: payload.phone,
  address: payload.address ?? null,
  notes: payload.notes ?? null,
});

const mapUpdateClientPayload = (payload: Partial<CreateClientPayload>) => ({
  full_name: payload.fullName ?? undefined,
  email: payload.email ?? undefined,
  phone: payload.phone ?? undefined,
  address: payload.address ?? undefined,
  notes: payload.notes ?? undefined,
});

type FetchClientsOptions = {
  search?: string;
  sort?: ClientSort;
};

export async function fetchClients(
  page: number,
  rowsPerPage: number,
  filters?: FetchClientsOptions,
): Promise<ClientResponse> {
  const from = page * rowsPerPage;
  const to = from + rowsPerPage - 1;
  const searchValue = filters?.search?.trim();
  const sortValue = filters?.sort ?? 'name-asc';

  let query = supabase.from('clients').select('*', { count: 'exact' });

  if (searchValue) {
    const pattern = `%${searchValue}%`;
    query = query.or(`full_name.ilike.${pattern},email.ilike.${pattern}`);
  }

  switch (sortValue) {
    case 'name-desc':
      query = query.order('full_name', { ascending: false });
      break;
    case 'name-asc':
      query = query.order('full_name', { ascending: true });
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
  const rows = (data ?? []) as ClientRow[];
  return { data: rows.map(mapClient), count: count ?? 0 };
}

export async function fetchAllClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at');

  if (error) throw error;
  const rows = (data ?? []) as ClientRow[];
  return rows.map(mapClient);
}

export async function createClient(
  payload: CreateClientPayload,
): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .insert(mapCreateClientPayload(payload))
    .select()
    .maybeSingle<ClientRow>();

  if (error || !data) throw new Error('Client insert blocked');
  return mapClient(data);
}

export async function updateClient({
  id,
  data,
}: UpdateClientPayload): Promise<Client> {
  const { data: row, error } = await supabase
    .from('clients')
    .update(mapUpdateClientPayload(data))
    .eq('id', id)
    .select()
    .maybeSingle<ClientRow>();

  if (error || !row) throw error ?? new Error('Client update blocked by RLS');
  return mapClient(row);
}

export const CLIENT_NOT_DELETED = 'CLIENT_NOT_DELETED';

export async function deleteClient(id: string) {
  const { data, error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error(CLIENT_NOT_DELETED);
}
