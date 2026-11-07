export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="font-bold text-white text-lg tracking-tight mb-1">
            Vaci<span className="text-teal-500">Pet</span>
          </p>
          <p className="text-xs">Saúde e Imunização Animal</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-medium tracking-wide text-slate-300 border border-slate-700">
            CRMV/SP
          </span>
          <span className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-medium tracking-wide text-slate-300 border border-slate-700">
            REGISTRO MAPA
          </span>
          <span className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-medium tracking-wide text-slate-300 border border-slate-700">
            PROTOCOLO WSAVA
          </span>
        </div>
      </div>
    </footer>
  );
}