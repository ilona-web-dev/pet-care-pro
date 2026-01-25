import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

type AdminHeaderProps = {
  title: string;
  btnText?: string;
  onAction?: () => void;
};

export default function AdminHeader({
  title,
  btnText,
  onAction,
}: AdminHeaderProps) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white pb-4">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>

      <div className="flex items-center gap-3">
        {btnText && onAction && (
          <button
            className="cursor-pointer rounded-full bg-teal-600 px-4 py-2 text-sm text-white"
            onClick={onAction}
          >
            {btnText}
          </button>
        )}

        <button
          type="button"
          onClick={handleSignOut}
          className="cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
