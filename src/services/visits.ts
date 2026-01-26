import { supabase } from '../lib/supabaseClient';
import {
  type Visit,
  type VisitReason,
  type VisitResponse,
  type VisitStatus,
} from '../types/admin';

export type VisitRow = {
  id: string;
  created_at: string;
  pet_id: string;
  vet_id: string;
  visit_date: string;
  reason: VisitReason;
  status: VisitStatus;
  diagnosis: string | null;
  treatment: string | null;
  invoice_amount: number | null;
  notes: string | null;
};

export type CreateVisitPayload = {
  petId: string;
  vetId: string;
  visitDate: string;
  reason: VisitReason;
  status: VisitStatus;
  diagnosis?: string;
  treatment?: string;
  invoiceAmount?: number;
  notes?: string;
};

export type UpdateVisitPayload = {
  id: string;
  data: Partial<CreateVisitPayload>;
};

export const mapVisit = (row: VisitRow): Visit => ({
  id: row.id,
  petId: row.pet_id,
  vetId: row.vet_id,
  visitDate: row.visit_date,
  reason: row.reason,
  status: row.status,
  diagnosis: row.diagnosis ?? undefined,
  treatment: row.treatment ?? undefined,
  invoiceAmount: row.invoice_amount ?? undefined,
  notes: row.notes ?? undefined,
});

const mapCreateVisitPayload = (payload: CreateVisitPayload) => ({
  pet_id: payload.petId,
  vet_id: payload.vetId,
  visit_date: payload.visitDate,
  reason: payload.reason,
  status: payload.status,
  diagnosis: payload.diagnosis ?? null,
  treatment: payload.treatment ?? null,
  invoice_amount: payload.invoiceAmount ?? null,
  notes: payload.notes ?? null,
});

const mapUpdateVisitPayload = (payload: Partial<CreateVisitPayload>) => ({
  pet_id: payload.petId ?? undefined,
  vet_id: payload.vetId ?? undefined,
  visit_date: payload.visitDate ?? undefined,
  reason: payload.reason ?? undefined,
  status: payload.status ?? undefined,
  diagnosis: payload.diagnosis ?? undefined,
  treatment: payload.treatment ?? undefined,
  invoice_amount: payload.invoiceAmount ?? undefined,
  notes: payload.notes ?? undefined,
});

export async function fetchVisits(
  page: number,
  rowsPerPage: number,
): Promise<VisitResponse> {
  const from = page * rowsPerPage;
  const to = from + rowsPerPage - 1;

  const { data, error, count } = await supabase
    .from('visits')
    .select('*', { count: 'exact' })
    .order('created_at')
    .range(from, to);

  if (error) throw error;
  const rows = (data ?? []) as VisitRow[];
  return { data: rows.map(mapVisit), count: count ?? 0 };
}

export async function fetchAllVisits(): Promise<Visit[]> {
  const { data, error } = await supabase
    .from('visits')
    .select('*', { count: 'exact' })
    .order('created_at');

  if (error) throw error;
  return (data ?? []).map(mapVisit);
}

export async function createVisit(payload: CreateVisitPayload): Promise<Visit> {
  const { data, error } = await supabase
    .from('visits')
    .insert(mapCreateVisitPayload(payload))
    .select()
    .single<VisitRow>();

  if (error) throw error;
  return mapVisit(data);
}

export async function updateVisit({
  id,
  data,
}: UpdateVisitPayload): Promise<Visit> {
  const { data: row, error } = await supabase
    .from('visits')
    .update(mapUpdateVisitPayload(data))
    .eq('id', id)
    .select()
    .single<VisitRow>();

  if (error) throw error;
  return mapVisit(row);
}

export const VISIT_NOT_DELETED = 'VISIT_NOT_DELETED';

export async function deleteVisit(id: string) {
  const { data, error } = await supabase
    .from('visits')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error(VISIT_NOT_DELETED);
}
