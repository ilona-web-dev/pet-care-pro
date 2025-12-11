import clsx from 'clsx';
import type { TextareaHTMLAttributes } from 'react';
import FieldError from './FieldError';

type FormTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const baseClass =
  'mt-2 min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500/40';

export default function FormTextArea({ label, id, error, className, ...props }: FormTextAreaProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <textarea
        aria-invalid={error ? 'true' : 'false'}
        id={id}
        className={clsx(
          baseClass,
          className,
          error && 'border-rose-400 focus-visible:ring-rose-400/40'
        )}
        {...props}
      />
      <FieldError message={error} />
    </div>
  );
}
