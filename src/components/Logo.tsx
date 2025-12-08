import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Logo() {
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
        <p className="text-lg font-semibold text-slate-800">PetCare Pro</p>
        <p className="text-sm text-slate-500">Dublin Veterinary Clinic</p>
      </div>
    </Link>
  );
}
