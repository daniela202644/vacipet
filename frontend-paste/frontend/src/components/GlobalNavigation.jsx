import { NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Início', icon: 'home' },
  { to: '/pet/1', label: 'Meu pet', icon: 'pets' },
  { to: '/carteira', label: 'Carteira', icon: 'vaccines' },
  { to: '/agendamento', label: 'Agendar', icon: 'calendar_month' },
  { to: '/receitas', label: 'Receitas', icon: 'restaurant' },
  { to: '/loja', label: 'Loja', icon: 'shopping_bag' },
  { to: '/sobre-nos', label: 'Sobre nós', icon: 'info' },
  { to: '/login', label: 'Entrar', icon: 'account_circle' },
];

export default function GlobalNavigation() {
  const { pathname } = useLocation();
  const publicRoutes = ['/login', '/register', '/recuperar-senha'];

  if (publicRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav
      aria-label="Navegação principal"
      className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur-md"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        width: 'calc(100% - 24px)',
        maxWidth: '680px',
        transform: 'translateX(-50%)',
        justifyContent: 'space-between',
        zIndex: 9999,
      }}
    >
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-1 min-w-fit items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold transition-colors ${
              isActive
                ? 'bg-teal-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-teal-700'
            }`
          }
        >
          <span className="material-symbols-outlined text-lg">{icon}</span>
          <span className="hidden sm:inline">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
