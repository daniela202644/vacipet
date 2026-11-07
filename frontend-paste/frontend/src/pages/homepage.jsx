import { Link } from 'react-router-dom';

// ---------------------------------------------------------
    // COMPONENTE: PÁGINA INICIAL (DASHBOARD)
    // ---------------------------------------------------------
    const HomePage = () => {
      

      return (
        <div className="flex flex-col w-full pb-10">
          
          {/* BANNER DE CAMPANHA */}
          <section className="w-full px-margin pt-space-md">
            <div
              className="relative overflow-hidden rounded-xl text-white shadow-lg p-space-lg flex flex-col lg:flex-row items-center justify-between gap-space-lg"
              style={{ backgroundColor: '#071f3f' }}
            >
              <div className="absolute -right-12 -bottom-16 w-64 h-64 rounded-full bg-secondary-fixed opacity-10 pointer-events-none blur-2xl"></div>
              <div className="flex items-start sm:items-center gap-space-md z-10">
                <div className="p-space-sm bg-surface-container-lowest/15 backdrop-blur-md rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed text-3xl">verified_user</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-space-xs mb-1">
                    <span className="px-space-xs py-0.5 rounded-full bg-tertiary text-on-tertiary text-xs uppercase tracking-wide">100% Gratuito</span>
                    <span className="text-primary-fixed text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed inline-block"></span>
                      Vigilância Epidemiológica & Zoonoses
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Campanha Oficial Antirrábica 2026 — Prefeitura de Limoeiro
                  </h2>
                  <p className="text-sm text-white max-w-2xl mt-0.5">
                    Postos Fixos e Volantes atendendo todos os bairros de Limoeiro até 30 de Setembro. Proteja cães e gatos a partir de 3 meses.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm shrink-0 z-10 w-full sm:w-auto">
                <button className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-primary font-bold shadow-sm hover:bg-surface-container-low transition-all">
                  <span className="material-symbols-outlined text-lg text-primary">pin_drop</span>
                  Ver Postos Próximos
                </button>
              </div>
            </div>
          </section>

          {/* ÁREA PRINCIPAL */}
          <section className="w-full px-margin pt-space-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              
              {/* COLUNA ESQUERDA (8 colunas) */}
              <div className="lg:col-span-8 flex flex-col gap-gutter">
                
                {/* CARD PRINCIPAL: PERFIL DO PET */}
                <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md pb-space-sm bg-surface-container-low/60 -mx-space-lg -mt-space-lg p-space-lg rounded-t-xl">
                    <div className="flex items-center gap-space-md">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 bg-surface-container-high">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCpmN2pcAxfLxG2MwJiqYUdQwEfAIWvMNjH4Ki5ICdvM1HtLcOb6epHhsNtaD8YdGemohy4ANxNBYa8oJSmWCr786UDpvdkQ6CEhnyScGq1u1Go7sJdDGaqlWHrn5B4nxFzgp6BpSXFFFlemkOdi7aCB3tTAq5ZoUsnFjs29EZxJKxBR6OYIUishF0RNF9noICNqqfw0N3sgvzWYAd5DRPKiVuvxOUEQuks1mLfTQ5ns_ahwpNs4ph" alt="Pipoca" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-space-sm">
                          <h3 className="text-xl font-bold text-on-surface">Pipoca</h3>
                          <span className="text-xs px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-mono">ID #46389</span>
                          <span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-tertiary text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">shield</span> Imunidade Ativa
                          </span>
                        </div>
                        <p className="text-sm text-on-surface-variant">Cão • Jack Russell Terrier • 3 anos e 2 meses • Microchip: 981098102948210</p>
                      </div>
                    </div>
                    <Link to="/pet/1" className="inline-flex items-center gap-space-xs text-sm font-bold text-primary hover:text-primary-container transition-colors">
                      Histórico Clínico <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>

                  {/* LEMBRETE DE CONSULTA */}
                  <div className="rounded-xl bg-surface-container-low p-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                    <div className="flex items-start gap-space-md">
                      <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-2xl">medical_services</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-space-xs flex-wrap">
                          <span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-primary text-xs font-bold uppercase">Consulta Agendada</span>
                        </div>
                        <h4 className="text-lg font-bold text-on-surface mt-1">Dr. Leandro José Medeiros</h4>
                        <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 mt-space-xs text-sm text-on-surface">
                          <span className="inline-flex items-center gap-1 font-bold text-primary">
                            <span className="material-symbols-outlined text-base">calendar_clock</span> 09/09/2026 às 10:00 AM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STATUS VACINAL E PROGRESSO */}
                  <div className="p-space-md rounded-xl bg-surface-container-lowest flex flex-col gap-space-sm border border-outline/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-primary text-lg">shield_with_heart</span>
                        <span className="text-base font-bold text-on-surface">Ciclo Vacinal Anual</span>
                      </div>
                      <span className="text-sm font-bold text-primary">75% Protegido (3 de 4)</span>
                    </div>
                    
                    <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-xs text-left">
                      <div className="p-space-xs rounded-lg bg-surface-container-low flex flex-col">
                        <span className="text-xs text-on-surface-variant font-bold">Polivalente (V10)</span>
                        <span className="text-sm text-tertiary flex items-center gap-0.5 font-bold"><span className="material-symbols-outlined text-sm">check_circle</span> Aplicada</span>
                      </div>
                      <div className="p-space-xs rounded-lg bg-error-container/30 flex flex-col">
                        <span className="text-xs text-error font-bold">Antirrábica 2026</span>
                        <span className="text-sm text-error flex items-center gap-0.5 font-bold"><span className="material-symbols-outlined text-sm">error</span> Pendente</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO RÁPIDA */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
                  <Link to="/agendamento" className="p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm transition-all group flex flex-col items-center text-center gap-space-xs">
                    <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-2xl">event_repeat</span>
                    </div>
                    <span className="text-sm font-bold text-on-surface mt-1">Agendar Retorno</span>
                  </Link>
                  <button className="p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm transition-all group flex flex-col items-center text-center gap-space-xs">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-2xl">badge</span>
                    </div>
                    <span className="text-sm font-bold text-on-surface mt-1">2ª Via Certificado</span>
                  </button>
                </div>
              </div>

              {/* COLUNA DIREITA (4 colunas) - PROMOÇÕES */}
              <div className="lg:col-span-4 flex flex-col gap-gutter">
                <div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm overflow-hidden" style={{ backgroundImage: 'radial-gradient(#ba1a1a 0.75px, transparent 0.75px)', backgroundSize: '16px 16px', backgroundColor: '#ffffff' }}>
                  <div className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-error text-on-error text-xs tracking-wider uppercase font-bold shadow-sm mb-space-sm">
                    <span className="material-symbols-outlined text-sm">local_fire_department</span> Melhor Preço do Ano
                  </div>
                  <div className="rounded-xl p-space-md bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
                    <div className="w-full h-44 rounded-lg overflow-hidden bg-surface-container-low relative">
                      <img className="w-full h-full object-contain p-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeJtYi0kJFNZ6eX5WRZmQmY30JkDp4wmTXUDgZxAYMj_OdWurhp2hstikQBddOo89Qe7RhQR01N9N-wN-KfE9oWF7v5qLgIhRzs4f7aacmLXza6e79auhz2KvGgyxkVvfj9N3_OCq7ZHMXLqypfjq-Oxl7rLjZfFTHv2FC6syPy02M67mu3dLEbUKgzrgXgYEBWIMRQyo8DVS0IxyI3drOwNgxxnufI3uuc3X0ZrzKHPiaDLE3iBKe" alt="Ração Pedigree" />
                      <span className="absolute top-2 right-2 bg-error text-on-error text-xs px-space-xs py-0.5 rounded-md font-bold">-20% OFF</span>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-lg font-bold text-on-surface leading-tight mt-0.5">Ração Pedigree Carne e Frango 10,1 kg</h4>
                    </div>
                    <div className="flex items-baseline justify-between pt-space-xs">
                      <div className="flex flex-col">
                        <span className="text-sm text-outline line-through">De R$ 112,49</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm text-error font-bold">R$</span>
                          <span className="text-3xl text-error font-extrabold leading-none">89,99</span>
                        </div>
                      </div>
                    </div>
                    <Link to="/loja" className="w-full mt-space-xs inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-error text-on-error text-base font-bold shadow hover:opacity-95 transition-opacity">
                      <span className="material-symbols-outlined text-lg">shopping_cart_checkout</span> Garantir Oferta
                    </Link>
                  </div>
                </div>
              </div>
              
            </div>
          </section>
        </div>
      );
    };

export default HomePage;