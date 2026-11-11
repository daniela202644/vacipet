import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { clearTutorSession, getTutorSession } from '../api';

const isStaticPagesBuild = import.meta.env.PROD && !import.meta.env.VITE_API_URL;
const links = [
  { to: '/', label: 'Início', icon: 'home' },
  { to: '/pet', label: 'Meus pets', icon: 'pets' },
  { to: '/carteira', label: 'Carteira', icon: 'vaccines' },
  { to: '/agendamento', label: 'Agendar', icon: 'calendar_month' },
  { to: '/receitas', label: 'Receitas', icon: 'restaurant' },
  { to: '/saude', label: 'Saúde', icon: 'health_and_safety' },
  { to: '/loja', label: 'Loja', icon: 'shopping_bag' },
  { to: '/sobre-nos', label: 'Sobre nós', icon: 'info' },
];

export default function GlobalNavigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tutor = getTutorSession();
  const publicRoutes = ['/login', '/register', '/recuperar-senha'];

  if (publicRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav
      aria-label="Navegação principal"
      className="flex items-center gap-1 overflow-x-auto rounded-xl border border-primary-fixed/70 bg-surface-container-lowest/95 p-1.5 shadow-[0_8px_28px_rgba(7,31,63,0.18)] backdrop-blur-md"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        width: 'calc(100% - 24px)',
        maxWidth: '940px',
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
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
            }`
          }
        >
          <span className="material-symbols-outlined text-lg">{icon}</span>
          <span className="hidden sm:inline">{label}</span>
        </NavLink>
      ))}
      {tutor && !isStaticPagesBuild ? (
        <button
          type="button"
          title="Sair da conta"
          aria-label="Sair da conta"
          onClick={() => {
            clearTutorSession();
            navigate('/login');
          }}
          className="flex flex-1 min-w-fit items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span className="hidden sm:inline">Sair</span>
        </button>
      ) : !isStaticPagesBuild ? (
        <NavLink to="/login" className="flex flex-1 min-w-fit items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container-high hover:text-primary">
          <span className="material-symbols-outlined text-lg">account_circle</span>
          <span className="hidden sm:inline">Entrar</span>
        </NavLink>
      ) : null}
    </nav>
  );
}
