import { describe, expect, it } from 'vitest';
import { visitSchema } from './visitSchema';

describe('visitSchema', () => {
  it('accepts valid payload', () => {
    const result = visitSchema.safeParse({
      visitDate: '2025-02-01',
      petId: 'pet-1',
      vetId: 'vet-1',
      reason: 'vaccination',
      status: 'planned',
      invoiceAmount: '45',
    });

    expect(result.success).toBe(true);
  });

  it('requires pet, vet, and date', () => {
    const result = visitSchema.safeParse({
      visitDate: '',
      petId: '',
      vetId: '',
      reason: 'grooming',
      status: 'planned',
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues.map((issue) => issue.path.join('.'))).toEqual(
      expect.arrayContaining(['visitDate', 'petId', 'vetId']),
    );
  });

  it('rejects invalid status or amount', () => {
    const result = visitSchema.safeParse({
      visitDate: '2025-02-10',
      petId: 'pet-1',
      vetId: 'vet-1',
      reason: 'follow_up',
      status: 'unknown',
      invoiceAmount: 'abc',
    });

    expect(result.success).toBe(false);
  });
});
