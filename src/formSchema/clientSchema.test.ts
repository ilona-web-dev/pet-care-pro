import { clientSchema } from './clientSchema';
import { describe, it, expect } from 'vitest';

describe('clientSchema', () => {
  it('accepts valid payload', () => {
    const result = clientSchema.safeParse({
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+123456789',
      address: 'Dublin',
      notes: 'Prefers morning calls',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing required fields', () => {
    const result = clientSchema.safeParse({
      fullName: '',
      email: 'not-an-email',
      phone: '12',
    });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues.map((issue) => issue.path.join('.'))).toEqual(
      expect.arrayContaining(['fullName', 'email', 'phone']),
    );
  });
});
