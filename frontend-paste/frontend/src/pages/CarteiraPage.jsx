import { useState } from 'react';

export default function Carteira() {
  // Estados de navegação e filtros
  const [activeFilter, setActiveFilter] = useState('all');
  const [showQrModal, setShowQrModal] = useState(false);
  const [showNewVaccineModal, setShowNewVaccineModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Formulário de Nova Vacina
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    type: 'optional',
    date: '',
    nextDate: '',
    batch: '',
    veterinarian: ''
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Lista de vacinas
  const [vaccines, setVaccines] = useState([
    {
      id: 'v10',
      title: 'V10 Polivalente Canina (Vanguard Plus)',
      category: 'optional',
      status: 'up_to_date', // up_to_date, scheduled, pending
      statusLabel: 'Em Dia • Protegido',
      doseType: 'Dose Anual',
      description: 'Imunização contra Cinomose, Parvovirose, Coronavirose, Adenovirose tipo 1 e 2, Parainfluenza e 4 sorovares de Leptospirose.',
      appliedDate: '15/01/2026',
      nextDate: '15/01/2027',
      manufacturer: 'Zoetis • #A8829-BR',
      vet: 'Dr. Leandro Medeiros (CRMV/SP 38.102)',
      route: 'Via Subcutânea (SC) • Flanco Direito',
      isHistory: false
    },
    {
      id: 'rabies',
      title: 'Vacina Antirrábica (Raiva Canina)',
      category: 'mandatory',
      status: 'scheduled',
      statusLabel: 'Próxima Dose Agendada',
      badge: 'Obrigatória Federal (Lei 13.977)',
      description: 'Prevenção essencial contra encefalomielite viral fatal e zoonose compulsória. Validade da dose anterior em vigor até final do ano.',
      appliedDate: '20/10/2025',
      nextDate: '20/10/2026',
      manufacturer: 'Reforço Anual #3',
      campaign: 'Ponto móvel autorizado no Parque Ibirapuera / Portão 3 e Centro de Controle Zoonoses de 15 a 30 de Outubro.',
      isHistory: false
    },
    {
      id: 'flu',
      title: 'Gripe Canina (Tosse dos Canis / Bronchiguard)',
      category: 'optional',
      status: 'pending',
      statusLabel: 'Pendente há 14 dias',
      doseType: 'Reforço Anual Vencido',
      description: 'Proteção contra Bordetella bronchiseptica e vírus da Parainfluenza. Vacina indispensável para pets com convívio em hotéis, creches e praças.',
      appliedDate: '10/02/2025',
      nextDate: '10/02/2026',
      manufacturer: 'Zoetis • #B9912-BR',
      restrictionNotice: 'A creche registrada (DogHub Jardins) pode recusar a entrada até a apresentação do reforço com 72h de antecedência.',
      isHistory: false
    },
    {
      id: 'giardia',
      title: 'Giardíase Canina (Giardiavax)',
      category: 'optional',
      status: 'up_to_date',
      statusLabel: 'Em Dia • Protegido',
      doseType: 'Dose Anual',
      description: 'Imunização preventiva contra infecção gastrointestinal causada pelo protozoário Giardia lamblia.',
      appliedDate: '05/12/2025',
      nextDate: '05/12/2026',
      manufacturer: 'Zoetis • #G1044-BR',
      vet: 'Dra. Camila Torres (CRMV/SP 41.002)',
      route: 'Via Subcutânea (SC) • Flanco Esquerdo',
      isHistory: false
    }
  ]);

  // Filtragem
  const filteredVaccines = vaccines.filter((vac) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'mandatory') return vac.category === 'mandatory';
    if (activeFilter === 'optional') return vac.category === 'optional';
    if (activeFilter === 'history') return vac.isHistory;
    return true;
  });

  const handleAddVaccine = (e) => {
    e.preventDefault();
    if (!newVaccine.name || !newVaccine.date) return;

    const created = {
      id: Date.now().toString(),
      title: newVaccine.name,
      category: newVaccine.type,
      status: 'up_to_date',
      statusLabel: 'Registrada',
      doseType: 'Dose Manual',
      description: 'Registrada manualmente pelo tutor via painel VaciPet.',
      appliedDate: newVaccine.date,
      nextDate: newVaccine.nextDate || 'Não informada',
      manufacturer: newVaccine.batch || 'Lote não especificado',
      vet: newVaccine.veterinarian || 'Não informado',
      isHistory: false
    };

    setVaccines([created, ...vaccines]);
    setShowNewVaccineModal(false);
    setNewVaccine({ name: '', type: 'optional', date: '', nextDate: '', batch: '', veterinarian: '' });
    triggerToast('Nova vacina registrada com sucesso!');
  };

  return (
    <div className="w-full flex flex-col gap-space-lg pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-lg shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span>
          <span className="font-label-lg">{toastMessage}</span>
        </div>
      )}

      {/* 1. Alerta Topo: Pendência Crítica */}
      <div className="w-full px-margin">
        <div className="w-full text-white rounded-xl p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-sm" style={{ backgroundColor: '#071f3f' }}>
          <div className="flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                warning
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span className="font-label-lg text-label-lg">Atenção Prioritária: Reforço Pendente</span>
                <span className="px-space-xs py-0.5 rounded-full bg-error text-on-error font-label-sm uppercase tracking-wide">
                  Alerta Crítico
                </span>
              </div>
              <p className="font-body-md text-on-error-container/90">
                A imunização contra Gripe Canina (Tosse dos Canis / Bordetella) de Pipoca venceu há 14 dias. Risco aumentado em creches, hotéis e parques.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <button
              onClick={() => triggerToast('Redirecionando para agendamento de dose...')}
              className="px-space-md py-space-xs bg-error text-on-error font-label-lg rounded-lg shadow-sm hover:brightness-110 flex items-center gap-space-xs transition-all"
            >
              <span className="material-symbols-outlined text-lg">medical_services</span>
              Agendar Dose Imediata
            </button>
          </div>
        </div>
      </div>

      {/* 2. Bento Grid: Master Card do Pet + Score Sanitário */}
      <div className="w-full px-margin grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
        {/* Card Master (8 colunas) */}
        <div className="xl:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-lg relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg relative z-10">
            <div className="flex items-center gap-space-lg">
              <div className="relative shrink-0">
                <img
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-md"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb1vEw4fZJxbpTNPpR9nuuUV9ww6O79gQr5NwvxeIIN8nQamIvpySi_xV-ZKoDZHfiUoYNZgiF7G84484C-pKY4RENjUK5fSHtvUQTqIB42Y12enMqlduoF6DYt1Thd3uq-5Y5-cUSqv4Wqqh0scMXcUdqDA4lEZ5u29sqqAWwWCUEUUL8c7eyras8nW8bnZdlLZnOnyncgnIc0SzPPnd_VqX6w_uryo2XZhJ34y-SykPoXKRJ365f"
                  alt="Pipoca"
                />
                <span className="absolute -bottom-2 -right-2 px-space-xs py-0.5 bg-tertiary-container text-on-tertiary-container rounded-full font-label-sm shadow flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Ativo
                </span>
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <h1 className="font-headline-lg text-on-surface tracking-tight">Pipoca</h1>
                  <span className="px-space-sm py-0.5 bg-surface-container-high text-primary font-label-md rounded-full">Golden Retriever</span>
                  <span className="px-space-sm py-0.5 bg-surface-container text-on-surface-variant font-label-sm rounded-full">Canino • Macho</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-space-md gap-y-1 font-body-sm text-on-surface-variant mt-space-xs">
                  <div>
                    <span className="font-label-sm text-outline block">Idade:</span>
                    <strong className="text-on-surface font-semibold">3 anos e 4 meses</strong>
                  </div>
                  <div>
                    <span className="font-label-sm text-outline block">Peso Aferido:</span>
                    <strong className="text-on-surface font-semibold">31.4 kg</strong>
                  </div>
                  <div>
                    <span className="font-label-sm text-outline block">Microchip Oficial:</span>
                    <span className="font-mono text-primary font-semibold">#98109810239</span>
                  </div>
                  <div className="col-span-2 sm:col-span-3 pt-1">
                    <span className="font-label-sm text-outline block">Tutores Responsáveis:</span>
                    <span className="text-on-surface">Dra. Helena Rios & Daniela Cavalcanti • São Paulo - SP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas de Exportação */}
            <div className="flex flex-row lg:flex-col gap-space-xs w-full lg:w-auto shrink-0 pt-space-xs lg:pt-0">
              <button
                onClick={() => triggerToast('Gerando Passaporte Sanitário em PDF...')}
                className="flex-1 lg:flex-initial px-space-md py-space-sm bg-primary-container text-on-primary rounded-lg font-label-lg shadow-sm hover:brightness-110 flex items-center justify-center gap-space-xs transition-all"
              >
                <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                Exportar Passaporte PDF
              </button>
              <button
                onClick={() => setShowQrModal(true)}
                className="flex-1 lg:flex-initial px-space-md py-space-sm bg-surface-container text-on-surface rounded-lg font-label-lg hover:bg-surface-container-high flex items-center justify-center gap-space-xs transition-all"
              >
                <span className="material-symbols-outlined text-lg">qr_code_2</span>
                Comprovação QR Code
              </button>
            </div>
          </div>

          {/* Barra Homologada CFMV */}
          <div className="w-full bg-surface-container-low rounded-lg p-space-sm flex flex-wrap items-center justify-between gap-space-sm relative z-10 text-on-surface-variant font-body-sm">
            <div className="flex items-center gap-space-md flex-wrap">
              <span className="flex items-center gap-1 font-label-md text-on-surface">
                <span className="material-symbols-outlined text-tertiary text-lg">verified_user</span>
                Prontuário Homologado CFMV
              </span>
              <span className="text-outline hidden sm:inline">•</span>
              <span>Última Aferição Física: <strong>12/03/2026</strong></span>
              <span class="text-outline hidden sm:inline">•</span>
              <span>Clínica Base: <strong>Hospital Veterinário Jardins</strong></span>
            </div>
            <div className="flex items-center gap-space-xs text-secondary font-label-md">
              <span className="material-symbols-outlined text-base">lock</span> Registro Auditado
            </div>
          </div>
        </div>

        {/* Card Score de Proteção (4 colunas) */}
        <div className="xl:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between h-full gap-space-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-sm uppercase text-outline tracking-wider">Score Sanitário</span>
              <h2 className="font-headline-sm text-on-surface">Proteção Anual</h2>
            </div>
            <span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm">Protocolo 2026</span>
          </div>

          <div className="flex items-center justify-center gap-space-lg my-space-xs">
            {/* SVG Radial Progress Gauge */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle className="text-surface-container" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="10"></circle>
                <circle
                  className="text-primary-container transition-all duration-1000 ease-out"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  strokeLinecap="round"
                  strokeWidth="10"
                ></circle>
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-display-lg text-headline-lg font-bold text-on-surface leading-none">75%</span>
                <span className="font-label-sm text-tertiary font-bold">Imunizado</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                <span className="font-body-sm text-on-surface-variant">3 Doses Vigentes</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="font-body-sm text-on-surface-variant">1 Reforço Breve</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="font-body-sm font-semibold text-error">1 Pendência Crítica</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-lg p-space-sm flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
            <p className="font-body-sm text-on-surface-variant">
              Pipoca está protegido contra <strong>Cinomose, Parvovirose, Hepatite e Giardíase</strong>. Regularize a Gripe para autorização em canis e viagens.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Toolbar de Ações & Filtros de Abas */}
      <div className="w-full px-margin flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs lg:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'Todas as Vacinas', count: vaccines.length },
            { id: 'mandatory', label: 'Obrigatórias por Lei (Antirrábica)', icon: 'gavel' },
            { id: 'optional', label: 'Preventivas & Especiais', icon: 'health_and_safety' },
            { id: 'history', label: 'Histórico Antigo', icon: 'history' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-space-md py-space-xs rounded-lg font-label-lg transition-all flex items-center gap-space-xs shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.icon && <span className="material-symbols-outlined text-sm">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="px-1.5 py-0.2 bg-on-primary/20 text-on-primary rounded-full text-xs">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-space-sm shrink-0">
          <button
            onClick={() => triggerToast('Selecione a imagem ou PDF da sua carteirinha física.')}
            className="px-space-md py-space-sm bg-surface-container-lowest text-primary rounded-lg font-label-lg shadow-sm hover:bg-surface-container transition-all flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-lg">document_scanner</span>
            Upload de Carteirinha Física
          </button>
          <button
            onClick={() => setShowNewVaccineModal(true)}
            className="px-space-md py-space-sm bg-primary text-on-primary rounded-lg font-label-lg shadow-md hover:bg-primary-container transition-all flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Registrar Nova Vacina
          </button>
        </div>
      </div>

      {/* 4. Lista de Cartões de Vacina */}
      <div className="w-full px-margin flex flex-col gap-space-md">
        {filteredVaccines.map((vac) => (
          <div
            key={vac.id}
            className={`bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md ${
              vac.status === 'pending' ? 'border-2 border-error/30' : ''
            }`}
          >
            <div className="p-space-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
              <div className="flex items-start gap-space-md">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    vac.status === 'pending'
                      ? 'bg-error-container text-error animate-pulse'
                      : vac.status === 'scheduled'
                      ? 'bg-secondary-fixed text-secondary'
                      : 'bg-primary-fixed text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {vac.status === 'pending' ? 'crisis_alert' : vac.status === 'scheduled' ? 'policy' : 'shield'}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-space-sm flex-wrap">
                    <h3 className={`font-title-lg ${vac.status === 'pending' ? 'text-error font-bold' : 'text-on-surface'}`}>
                      {vac.title}
                    </h3>

                    <span
                      className={`px-space-sm py-0.5 rounded-full font-label-sm flex items-center gap-1 ${
                        vac.status === 'pending'
                          ? 'bg-error text-on-error font-bold'
                          : vac.status === 'scheduled'
                          ? 'bg-secondary-container/30 text-on-secondary-container font-semibold'
                          : 'bg-secondary-fixed text-on-secondary-fixed font-semibold'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">
                        {vac.status === 'pending' ? 'error' : vac.status === 'scheduled' ? 'schedule' : 'check'}
                      </span>
                      {vac.statusLabel}
                    </span>

                    {vac.badge && (
                      <span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-label-sm font-semibold">
                        {vac.badge}
                      </span>
                    )}
                    {vac.doseType && (
                      <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm">
                        {vac.doseType}
                      </span>
                    )}
                  </div>

                  <p className="font-body-md text-on-surface-variant max-w-2xl">{vac.description}</p>
                </div>
              </div>

              <div
                className={`grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center gap-space-md lg:gap-space-lg w-full lg:w-auto p-space-md lg:p-0 rounded-lg ${
                  vac.status === 'pending' ? 'bg-error-container/20' : 'bg-surface-container-low lg:bg-transparent'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`font-label-sm ${vac.status === 'pending' ? 'text-error font-semibold' : 'text-outline'}`}>
                    {vac.status === 'pending' ? 'Venceu em:' : 'Data de Aplicação'}
                  </span>
                  <span className={`font-title-md font-semibold ${vac.status === 'pending' ? 'text-error font-bold' : 'text-on-surface'}`}>
                    {vac.appliedDate}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-label-sm text-outline">Próximo Reforço</span>
                  <span className={`font-title-md font-semibold ${vac.status === 'pending' ? 'text-error font-bold' : 'text-primary'}`}>
                    {vac.nextDate}
                  </span>
                </div>

                <div className="flex flex-col col-span-2 sm:col-span-1">
                  <span className="font-label-sm text-outline">Fabricante & Lote</span>
                  <span className="font-body-md font-mono text-on-surface font-medium">{vac.manufacturer}</span>
                </div>

                {vac.status === 'pending' && (
                  <button
                    onClick={() => triggerToast('Abrindo agenda veterinária...')}
                    className="col-span-2 sm:col-span-3 lg:col-span-1 px-space-md py-space-xs bg-error text-on-error font-label-lg rounded-lg shadow-sm hover:brightness-110 flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">calendar_month</span> Agendar
                  </button>
                )}
              </div>
            </div>

            {/* Rodapé técnico ou alertas do cartão */}
            {vac.campaign && (
              <div className="bg-surface-container px-space-lg py-space-sm flex flex-col md:flex-row md:items-center justify-between gap-space-sm text-on-surface font-body-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-sm">campaign</span>
                  </div>
                  <span>
                    <strong className="text-secondary">Campanha Pública Gratuita:</strong> {vac.campaign}
                  </span>
                </div>
                <button
                  onClick={() => triggerToast('Lembrete de vacinação enviado via WhatsApp!')}
                  className="px-space-sm py-1 bg-secondary text-on-secondary rounded font-label-sm shadow-sm hover:brightness-110"
                >
                  Lembrar-me por WhatsApp
                </button>
              </div>
            )}

            {vac.vet && (
              <div className="bg-surface-container-low px-space-lg py-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm text-on-surface-variant font-body-sm">
                <div className="flex items-center gap-space-md flex-wrap">
                  <span className="flex items-center gap-1 text-on-surface">
                    <span className="material-symbols-outlined text-primary text-base">badge</span>
                    Veterinário Aplicador: <strong>{vac.vet}</strong>
                  </span>
                  {vac.route && (
                    <>
                      <span className="text-outline hidden md:inline">|</span>
                      <span>{vac.route}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="inline-flex items-center gap-1 text-tertiary font-label-md bg-surface-container-lowest px-space-sm py-1 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-sm">verified</span> Assinatura Validada
                  </span>
                </div>
              </div>
            )}

            {vac.restrictionNotice && (
              <div className="bg-error-container/40 px-space-lg py-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm text-on-error-container font-body-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-error text-lg">domain_disabled</span>
                  <span><strong>Restrição Temporária:</strong> {vac.restrictionNotice}</span>
                </div>
                <span className="text-error font-label-sm font-bold tracking-wide uppercase">Regularização Urgente</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal QR Code */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-margin">
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-space-lg shadow-xl flex flex-col items-center gap-space-md text-center">
            <div className="w-full flex justify-between items-center">
              <h3 className="font-headline-sm text-on-surface">Comprovação Oficial VaciPet</h3>
              <button onClick={() => setShowQrModal(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="bg-white p-4 rounded-xl border border-outline/20 shadow-inner my-2">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://vacipet.com/pet/pipoca-98109810239"
                alt="QR Code de Validação"
                className="w-44 h-44"
              />
            </div>
            <p className="font-body-sm text-on-surface-variant">
              Apresente este código em creches, hotéis e clínicas veterinárias para comprovação instantânea da vacinação de Pipoca.
            </p>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-space-sm bg-primary text-on-primary font-label-lg rounded-lg shadow"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal Registrar Vacina */}
      {showNewVaccineModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-margin">
          <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-lg shadow-xl flex flex-col gap-space-md">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-sm text-on-surface">Registrar Nova Vacina</h3>
              <button onClick={() => setShowNewVaccineModal(false)} className="text-outline">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddVaccine} className="flex flex-col gap-space-md">
              <div>
                <label className="font-label-md text-on-surface block mb-1">Nome da Vacina *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Vacina Leishmaniose (Leishtec)"
                  value={newVaccine.name}
                  onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                  className="w-full bg-surface-container p-space-sm rounded-lg border border-outline/20 focus:outline-none focus:ring-2 focus:ring-primary font-body-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-space-md">
                <div>
                  <label className="font-label-md text-on-surface block mb-1">Categoria</label>
                  <select
                    value={newVaccine.type}
                    onChange={(e) => setNewVaccine({ ...newVaccine, type: e.target.value })}
                    className="w-full bg-surface-container p-space-sm rounded-lg border border-outline/20 focus:outline-none focus:ring-2 focus:ring-primary font-body-md"
                  >
                    <option value="optional">Preventiva / Especial</option>
                    <option value="mandatory">Obrigatória por Lei</option>
                  </select>
                </div>

                <div>
                  <label className="font-label-md text-on-surface block mb-1">Data da Aplicação *</label>
                  <input
                    type="date"
                    required
                    value={newVaccine.date}
                    onChange={(e) => setNewVaccine({ ...newVaccine, date: e.target.value })}
                    className="w-full bg-surface-container p-space-sm rounded-lg border border-outline/20 focus:outline-none focus:ring-2 focus:ring-primary font-body-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-md">
                <div>
                  <label className="font-label-md text-on-surface block mb-1">Próximo Reforço</label>
                  <input
                    type="date"
                    value={newVaccine.nextDate}
                    onChange={(e) => setNewVaccine({ ...newVaccine, nextDate: e.target.value })}
                    className="w-full bg-surface-container p-space-sm rounded-lg border border-outline/20 focus:outline-none focus:ring-2 focus:ring-primary font-body-md"
                  />
                </div>

                <div>
                  <label className="font-label-md text-on-surface block mb-1">Lote / Fabricante</label>
                  <input
                    type="text"
                    placeholder="Ex: Zoetis #X990"
                    value={newVaccine.batch}
                    onChange={(e) => setNewVaccine({ ...newVaccine, batch: e.target.value })}
                    className="w-full bg-surface-container p-space-sm rounded-lg border border-outline/20 focus:outline-none focus:ring-2 focus:ring-primary font-body-md"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-md text-on-surface block mb-1">Veterinário / Clínica</label>
                <input
                  type="text"
                  placeholder="Ex: Dr. Leandro Medeiros"
                  value={newVaccine.veterinarian}
                  onChange={(e) => setNewVaccine({ ...newVaccine, veterinarian: e.target.value })}
                  className="w-full bg-surface-container p-space-sm rounded-lg border border-outline/20 focus:outline-none focus:ring-2 focus:ring-primary font-body-md"
                />
              </div>

              <div className="flex justify-end gap-space-sm pt-space-xs">
                <button
                  type="button"
                  onClick={() => setShowNewVaccineModal(false)}
                  className="px-space-md py-space-xs text-on-surface-variant hover:bg-surface-container rounded-lg font-label-lg"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-space-md py-space-xs bg-primary text-on-primary rounded-lg font-label-lg shadow">
                  Salvar Vacina
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}