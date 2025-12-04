import Logo from './Logo';
import Navigation from './Navigation';
import HeaderContact from './HeaderContact';

export default function Header() {
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo />
        <Navigation />
        <HeaderContact />
      </div>
    </header>
  );
}
