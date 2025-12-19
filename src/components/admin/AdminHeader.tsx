export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white pb-4">
      <h1 className="text-lg font-semibold text-slate-800">Admin Panel</h1>
      <button className="rounded-full bg-teal-600 px-4 py-2 text-sm text-white">
        Add client
      </button>
    </header>
  );
}
