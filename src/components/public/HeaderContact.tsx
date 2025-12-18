import { MdPhone } from 'react-icons/md';

export default function HeaderContact() {
  return (
    <div>
      <div className="hidden flex-col text-right sm:flex">
        <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
          24/7 line
        </span>
      </div>
      <div className="hidden items-center gap-2 text-teal-600 sm:flex">
        <MdPhone aria-hidden="true" className="text-xl text-teal-600" />
        <a
          href="tel:+35311234567"
          aria-label="Call PetCare Pro at +353 1 123 4567"
          className="text-lg font-semibold text-teal-600"
        >
          +353 1 123 4567
        </a>
      </div>
    </div>
  );
}
