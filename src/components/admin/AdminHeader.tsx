export default function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <h1 className="text-lg font-semibold text-slate-900">Admin Panel</h1>
      <button className="rounded-full bg-teal-600 px-4 py-2 text-sm text-white">
        Add client
      </button>
    </header>
  );
}
