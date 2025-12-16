import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

const baseClass =
  'mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500/40';

export default function FormInput({ id, hasError, className, ...props }: FormInputProps) {
  return (
    <input
      aria-invalid={hasError ? 'true' : 'false'}
      id={id}
      className={clsx(
        baseClass,
        className,
        hasError && 'border-rose-400 focus-visible:ring-rose-400/40'
      )}
      {...props}
    />
  );
}
