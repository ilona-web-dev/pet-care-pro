import { Link } from 'react-router-dom';
import { MdLocationOn, MdMailOutline, MdPhoneIphone } from 'react-icons/md';
import Logo from '../shared/Logo';

const navigationLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const officeHours = [
  { days: 'Monday – Friday', hours: '08:00 – 20:00' },
  { days: 'Saturday', hours: '09:00 – 18:00' },
  { days: 'Sunday', hours: 'Emergency line only' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Logo variant="light" />
          <p className="text-sm text-slate-400">
            PetCare Pro is a Dublin city clinic combining advanced diagnostics
            with empathetic care. Every visit comes with digital notes and a
            dedicated nurse line.
          </p>
          <div className="flex items-center gap-2 text-sm text-teal-200">
            <MdPhoneIphone aria-hidden="true" />
            <a href="tel:+35311234567" className="hover:text-white">
              +353 1 123 4567
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Navigation
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {navigationLinks.map((item) => (
              <li key={item.href}>
                <a
                  className="text-slate-300 transition hover:text-white"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Hours
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {officeHours.map((slot) => (
              <li
                key={slot.days}
                className="flex items-center justify-between border-b border-white/5 pb-1"
              >
                <span>{slot.days}</span>
                <span className="text-slate-400">{slot.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Visit us
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MdLocationOn
                aria-hidden="true"
                className="text-lg text-teal-300"
              />
              <p>62 Lower Grand Canal Street, Dublin 2</p>
            </div>
            <div className="flex items-start gap-3">
              <MdMailOutline
                aria-hidden="true"
                className="text-lg text-teal-300"
              />
              <a className="hover:text-white" href="mailto:care@petcarepro.ie">
                care@petcarepro.ie
              </a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <p className="text-xs tracking-wide text-rose-200 uppercase">
                Emergency line
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                +353 1 555 2470
              </p>
              <p className="text-slate-400">
                24/7 nurse triage for urgent cases.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} PetCare Pro — Dublin</p>
          <div className="flex flex-col items-center gap-1 text-xs text-slate-500 sm:flex-row sm:gap-3">
            <p>Registered Veterinary Practice No. 28734 · Fear-Free Certified</p>
            <Link to="/login" className="text-teal-200 hover:text-white">
              Admin login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
