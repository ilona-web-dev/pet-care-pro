import NavLink from './NavLink';

export type MenuItemsProps = {
  id: number;
  title: string;
  link: string;
};

const menuItems: MenuItemsProps[] = [
  { id: 1, title: 'Services', link: '#services' },
  { id: 2, title: 'Team', link: '#team' },
  { id: 3, title: 'Reviews', link: '#reviews' },
  { id: 4, title: 'Location', link: '#location' },
];

export default function Navigation() {
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
