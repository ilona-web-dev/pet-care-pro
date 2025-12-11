type FieldErrorProps = {
  message?: string;
};

export default function FieldError({ message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-1 text-sm text-rose-600" role="status">
      {message}
    </p>
  );
}
