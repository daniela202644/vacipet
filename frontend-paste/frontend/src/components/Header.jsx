import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl">pets</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">
            Vaci<span className="text-teal-600">Pet</span>
          </span>
        </Link>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar vacinas, clínicas ou produtos..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <Link
            to="/agendamento"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">calendar_add_on</span>
            <span className="hidden sm:inline">Agendar</span>
          </Link>

          <Link
            to="/carteira"
            className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
              P
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold leading-none text-slate-800">Pipoca</p>
              <p className="text-[10px] text-slate-500 leading-none mt-0.5">Cão • Golden</p>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}