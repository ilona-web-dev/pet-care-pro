import { describe, expect, it } from 'vitest';
import { petSchema } from './petSchema';

describe('petSchema', () => {
  it('accepts valid payload', () => {
    const result = petSchema.safeParse({
      ownerId: 'owner-1',
      name: 'Milo',
      species: 'dog',
      weightKg: '4.3',
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.data.weightKg).toBe('4.3');
  });

  it('requires ownerId and name', () => {
    const result = petSchema.safeParse({
      ownerId: '',
      name: '',
      species: 'cat',
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues.map((issue) => issue.path.join('.'))).toEqual([
      'ownerId',
      'name',
    ]);
  });

  it('rejects non-numeric weight', () => {
    const result = petSchema.safeParse({
      ownerId: 'owner-1',
      name: 'Luna',
      species: 'dog',
      weightKg: 'abc',
    });

    expect(result.success).toBe(false);
  });
});
