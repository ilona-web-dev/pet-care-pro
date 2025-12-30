type AdminHeaderProps = {
  title: string;
  btnText: string;
  onAction: () => void;
};

export default function AdminHeader({
  title,
  btnText,
  onAction,
}: AdminHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white pb-4">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
      <button
        className="cursor-pointer rounded-full bg-teal-600 px-4 py-2 text-sm text-white"
        onClick={onAction}
      >
        {btnText}
      </button>
    </header>
  );
}
