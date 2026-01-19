import Logo from '../shared/Logo';
import Navigation from './MainNavigation';
import HeaderContact from './HeaderContact';

type PublicHeaderProps = {
  hideNav?: boolean;
};

export default function PublicHeader({ hideNav = false }: PublicHeaderProps) {
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo />
        {!hideNav && <Navigation />}
        <HeaderContact />
      </div>
    </header>
  );
}
