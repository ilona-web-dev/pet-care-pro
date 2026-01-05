import { supabase } from '../lib/supabaseClient';
import { type Visit, type VisitStatus, type VisitReason } from '../types/admin';

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

type CreateVisitPayload = {
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

export async function fetchVisits() {
  const { data: visits, error } = await supabase
    .from('visits')
    .select('*')
    .order('created_at');

  if (error) throw error;

  const rows = (visits ?? []) as VisitRow[];
  return rows.map(mapVisit);
}

export async function createVisit(payload: CreateVisitPayload): Promise<Visit> {
  const { data: visit, error } = await supabase
    .from('visits')
    .insert({
      pet_id: payload.petId,
      vet_id: payload.vetId,
      visit_date: payload.visitDate,
      reason: payload.reason,
      status: payload.status,
      diagnosis: payload.diagnosis ?? null,
      treatment: payload.treatment ?? null,
      invoice_amount: payload.invoiceAmount ?? null,
      notes: payload.notes ?? null,
    })
    .select()
    .single<VisitRow>();

  if (error) throw error;
  return mapVisit(visit);
}
