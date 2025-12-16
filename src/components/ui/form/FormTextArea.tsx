import clsx from 'clsx';
import type { TextareaHTMLAttributes } from 'react';

type FormTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

const baseClass =
  'mt-2 min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500/40';

export default function FormTextArea({ id, hasError, className, ...props }: FormTextAreaProps) {
  return (
    <textarea
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
