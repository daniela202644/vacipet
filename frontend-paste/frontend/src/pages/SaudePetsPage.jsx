import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const diseaseGuides = [
  {
    species: 'Cães',
    group: 'Infecciosa',
    name: 'Parvovirose',
    signs: 'Vômitos, diarreia intensa (às vezes com sangue), apatia e falta de apetite, especialmente em filhotes ou cães sem vacinação completa.',
    action: 'Procure atendimento veterinário imediatamente. A desidratação pode evoluir rápido; não espere os sintomas passarem.',
    urgency: 'Urgente',
    icon: 'coronavirus',
  },
  {
    species: 'Cães',
    group: 'Infecciosa',
    name: 'Cinomose',
    signs: 'Secreção nos olhos ou nariz, tosse, febre, alterações digestivas e, em alguns casos, tremores, tiques ou dificuldade para andar.',
    action: 'Avaliação veterinária no mesmo dia. Avise a clínica antes de chegar se houver suspeita de doença contagiosa.',
    urgency: 'Urgente',
    icon: 'sick',
  },
  {
    species: 'Cães',
    group: 'Transmitida por carrapatos',
    name: 'Erliquiose',
    signs: 'Febre, cansaço, redução do apetite, gengivas pálidas, manchas roxas ou sangramentos; pode haver histórico de carrapatos.',
    action: 'Marque consulta rapidamente. Só exame veterinário confirma a causa e define o tratamento.',
    urgency: 'Rápido',
    icon: 'pest_control',
  },
  {
    species: 'Cães',
    group: 'Ouvido',
    name: 'Otite',
    signs: 'Coçar ou balançar a cabeça, mau cheiro, vermelhidão, secreção ou dor ao tocar a orelha.',
    action: 'Agende avaliação. Não pingue medicamentos nem introduza cotonetes no canal auditivo.',
    urgency: 'Consulta',
    icon: 'hearing',
  },
  {
    species: 'Cães',
    group: 'Boca',
    name: 'Doença periodontal',
    signs: 'Mau hálito persistente, gengiva avermelhada, tártaro, dificuldade para mastigar ou deixar a comida cair.',
    action: 'Marque avaliação odontológica veterinária. Limpeza e tratamento devem ser orientados pela equipe clínica.',
    urgency: 'Consulta',
    icon: 'dentistry',
  },
  {
    species: 'Gatos',
    group: 'Infecciosa',
    name: 'Panleucopenia felina',
    signs: 'Apatia intensa, febre, falta de apetite, vômitos e diarreia, sobretudo em filhotes ou gatos sem vacinação completa.',
    action: 'Procure atendimento imediatamente e mantenha o gato separado de outros felinos até receber orientação.',
    urgency: 'Urgente',
    icon: 'coronavirus',
  },
  {
    species: 'Gatos',
    group: 'Urinário',
    name: 'Obstrução urinária',
    signs: 'Entrar repetidamente na caixa, fazer força, vocalizar ou produzir pouca ou nenhuma urina. Pode parecer prisão de ventre.',
    action: 'Emergência veterinária imediata, especialmente em gatos machos. Não espere até o dia seguinte.',
    urgency: 'Emergência',
    icon: 'water_drop',
  },
  {
    species: 'Gatos',
    group: 'Rins',
    name: 'Doença renal crônica',
    signs: 'Beber e urinar mais, perder peso, comer menos, vomitar ou ficar mais quieto. É mais comum com o avanço da idade.',
    action: 'Agende consulta para exame clínico e exames laboratoriais. Esses sinais também podem ter outras causas.',
    urgency: 'Consulta',
    icon: 'kidney',
  },
  {
    species: 'Gatos',
    group: 'Viroses',
    name: 'FeLV e FIV',
    signs: 'Podem não causar sinais visíveis por muito tempo. Infecções recorrentes, emagrecimento, febre persistente ou gengivas pálidas merecem avaliação.',
    action: 'A confirmação é feita por testes veterinários. Converse sobre testagem, vacinação indicada e prevenção de transmissão.',
    urgency: 'Consulta',
    icon: 'biotech',
  },
  {
    species: 'Gatos',
    group: 'Pele',
    name: 'Dermatofitose (micose)',
    signs: 'Áreas arredondadas sem pelo, descamação ou pelos quebrados. Pode passar para outros animais e pessoas.',
    action: 'Procure orientação veterinária e lave as mãos após contato. Evite aplicar pomadas humanas.',
    urgency: 'Consulta',
    icon: 'dermatology',
  },
];

const speciesFilters = ['Todos', 'Cães', 'Gatos'];

export default function SaudePetsPage() {
  const [species, setSpecies] = useState('Todos');
  const [search, setSearch] = useState('');

  const filteredGuides = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('pt-BR');
    return diseaseGuides.filter((guide) => {
      const matchesSpecies = species === 'Todos' || guide.species === species;
      const matchesSearch = !term || `${guide.name} ${guide.group} ${guide.signs}`.toLocaleLowerCase('pt-BR').includes(term);
      return matchesSpecies && matchesSearch;
    });
  }, [search, species]);

  return (
    <main className="min-h-screen bg-surface px-4 pb-28 pt-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="relative grid overflow-hidden rounded-xl bg-primary text-white shadow-lg lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative z-10 p-6 sm:p-9 lg:py-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase text-tertiary-fixed">
              <span className="material-symbols-outlined text-sm">health_and_safety</span>
              Guia de observação
            </span>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold sm:text-4xl">Como reconhecer sinais de alerta no seu pet</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              Conheça sinais comuns de algumas doenças em cães e gatos e saiba quando buscar ajuda. Os sintomas orientam a observação, mas não confirmam um diagnóstico.
            </p>
          </div>
          <div className="relative min-h-48 lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85"
              alt="Cão sendo examinado em uma clínica veterinária"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/30 to-transparent lg:bg-gradient-to-l" />
          </div>
        </header>

        <section className="mt-6 grid gap-4 rounded-xl border border-error/30 bg-error-container/40 p-5 sm:grid-cols-[auto_1fr] sm:items-start" aria-labelledby="emergency-title">
          <span className="material-symbols-outlined text-3xl text-error" aria-hidden="true">emergency</span>
          <div>
            <h2 id="emergency-title" className="text-lg font-extrabold text-error">Procure emergência veterinária</h2>
            <p className="mt-1 text-sm leading-relaxed text-on-surface">
              Dificuldade para respirar, desmaio, convulsão, sangramento intenso, suspeita de veneno, vômitos repetidos ou tentativa de urinar sem conseguir exigem atendimento imediato.
            </p>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="disease-list-title">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-secondary">Sinais por espécie</p>
              <h2 id="disease-list-title" className="mt-1 text-2xl font-extrabold text-on-surface">O que observar</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex rounded-lg bg-surface-container-low p-1" role="group" aria-label="Filtrar por espécie">
                {speciesFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={species === filter}
                    onClick={() => setSpecies(filter)}
                    className={`rounded-md px-3 py-2 text-sm font-bold transition-colors ${species === filter ? 'bg-primary-container text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <label className="relative block sm:w-72">
                <span className="sr-only">Buscar doença ou sintoma</span>
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" aria-hidden="true">search</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar doença ou sintoma"
                  className="w-full rounded-lg border border-outline/25 bg-surface-container-lowest py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary-fixed"
                />
              </label>
            </div>
          </div>

          <p className="mt-4 text-sm text-on-surface-variant">{filteredGuides.length} {filteredGuides.length === 1 ? 'guia encontrado' : 'guias encontrados'}</p>
          {filteredGuides.length === 0 ? (
            <p className="mt-3 rounded-xl border border-primary-fixed bg-surface-container-lowest p-6 text-on-surface-variant">Nenhum guia corresponde à busca. Tente outro sintoma ou selecione outra espécie.</p>
          ) : (
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {filteredGuides.map((guide) => (
                <article key={guide.name} className="flex h-full flex-col rounded-xl border border-primary-fixed bg-surface-container-lowest p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined rounded-lg bg-primary-fixed p-2 text-primary" aria-hidden="true">{guide.icon}</span>
                      <div>
                        <p className="text-xs font-bold uppercase text-secondary">{guide.species} · {guide.group}</p>
                        <h3 className="mt-1 text-lg font-extrabold text-on-surface">{guide.name}</h3>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${guide.urgency === 'Emergência' || guide.urgency === 'Urgente' ? 'bg-error-container text-error' : guide.urgency === 'Rápido' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-tertiary-fixed text-on-tertiary-fixed'}`}>
                      {guide.urgency}
                    </span>
                  </div>
                  <div className="mt-5 space-y-3 text-sm leading-relaxed">
                    <p className="text-on-surface-variant"><strong className="text-on-surface">Sinais observáveis:</strong> {guide.signs}</p>
                    <p className="rounded-lg bg-surface-container-low p-3 text-on-surface-variant"><strong className="text-primary">O que fazer:</strong> {guide.action}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="mt-8 rounded-xl border border-outline/20 bg-surface-container-low p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-2xl text-primary" aria-hidden="true">info</span>
            <div>
              <h2 className="font-bold text-on-surface">Este guia não substitui uma consulta</h2>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                Muitas doenças têm sinais parecidos e alguns pets escondem desconforto. Não dê medicamentos humanos nem interrompa tratamentos sem orientação profissional. Em caso de dúvida, fale com um médico-veterinário.
              </p>
              <Link to="/agendamento" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2.5 text-sm font-bold text-on-primary hover:bg-primary">
                <span className="material-symbols-outlined text-lg">event_available</span>
                Agendar uma avaliação
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}