import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

type LogoProps = {
  variant?: 'light' | 'dark';
};

export default function Logo({ variant = 'dark' }: LogoProps) {
  const titleColor = variant === 'dark' ? 'text-slate-800' : 'text-white';
  const subtitleColor =
    variant === 'dark' ? 'text-slate-500' : 'text-slate-300';

  return (
    <Link
      to="/"
      aria-label="PetCare Pro home"
      className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
    >
      <img
        className="h-14 w-14 rounded-full object-cover"
        src={logo}
        alt="PetCare Pro logo"
      />
      <div>
        <p className={`text-lg font-semibold ${titleColor}`}>PetCare Pro</p>
        <p className={`text-sm ${subtitleColor}`}>Dublin Veterinary Clinic</p>
      </div>
    </Link>
  );
}
