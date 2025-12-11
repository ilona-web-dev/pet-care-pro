import clsx from 'clsx';
import type { SelectHTMLAttributes } from 'react';
import FieldError from './FieldError';

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
};

const baseClass =
  'mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500/40';

export default function FormSelect({
  label,
  id,
  options,
  error,
  className,
  placeholder,
  ...props
}: FormSelectProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        className={clsx(baseClass, className, error && 'border-rose-400')}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}
