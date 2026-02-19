import { describe, expect, it } from 'vitest';
import { vetSchema } from './vetSchema';

describe('vetSchema', () => {
  it('accepts valid payload', () => {
    const result = vetSchema.safeParse({
      fullName: 'Dr. Aoife',
      role: 'Surgery lead',
      yearsExperience: 10,
      isActive: true,
      notes: 'Orthopedics specialist',
    });

    expect(result.success).toBe(true);
  });

  it('requires name, role and experience', () => {
    const result = vetSchema.safeParse({
      fullName: '',
      role: '',
      yearsExperience: 0,
      isActive: true,
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues.map((issue) => issue.path.join('.'))).toEqual(
      expect.arrayContaining(['fullName', 'role', 'yearsExperience']),
    );
  });

  it('rejects invalid boolean or negative experience', () => {
    const result = vetSchema.safeParse({
      fullName: 'Dr. Test',
      role: 'General practice',
      yearsExperience: -2,
      isActive: 'maybe' as unknown as boolean,
    });

    expect(result.success).toBe(false);
  });
});
