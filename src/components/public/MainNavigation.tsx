export type MenuItemsProps = {
  id: number;
  title: string;
  link: string;
};

type NavLinksProps = {
  menuItem: MenuItemsProps;
};

const menuItems: MenuItemsProps[] = [
  { id: 1, title: 'Services', link: '/#services' },
  { id: 2, title: 'Team', link: '/#team' },
  { id: 3, title: 'Reviews', link: '/#reviews' },
  { id: 4, title: 'Location', link: '/#contact' },
];

export default function MainNavigation() {
  return (
    <nav aria-label="Primary" className="hidden items-center md:flex">
      <ul className="flex items-center gap-6 text-sm font-medium text-slate-600">
        {menuItems.map((menuItem) => (
          <li key={menuItem.id}>
            <NavLink menuItem={menuItem} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NavLink({ menuItem }: NavLinksProps) {
  return (
    <a
      href={menuItem.link}
      className="text-sm transition hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
    >
      {menuItem.title}
    </a>
  );
}
