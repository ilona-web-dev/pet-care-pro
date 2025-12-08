import { type MenuItemsProps } from './Navigation';

type NavLinksProps = {
  menuItem: MenuItemsProps;
};

export default function NavLink({ menuItem }: NavLinksProps) {
  return (
    <a
      href={menuItem.link}
      className="text-sm transition hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
    >
      {menuItem.title}
    </a>
  );
}
