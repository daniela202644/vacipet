import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAppointments, getPets, getTutorSession } from '../api';

export default function HomePage() {
  const tutor = getTutorSession();
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([getPets(tutor.id), getAppointments(tutor.id)])
      .then(([petData, appointmentData]) => {
        if (!active) return;
        setPets(petData);
        setAppointments(appointmentData);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => { active = false; };
  }, [tutor.id]);

  return (
    <main className="min-h-screen bg-surface px-4 pb-28 pt-8 sm:px-6">
      <header className="relative mx-auto mb-8 w-full max-w-6xl overflow-hidden rounded-xl bg-primary px-6 py-7 text-white shadow-lg sm:px-9 sm:py-9">
        <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
          <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85" alt="Golden retriever em atendimento veterinário" className="h-full w-full object-cover object-center opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/75 to-transparent" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase text-tertiary-fixed">
            <span className="material-symbols-outlined text-sm">verified_user</span> VaciPet · Painel do tutor
          </span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Olá, {tutor.nome}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">Acompanhe seus pets e organize os próximos cuidados em um só lugar.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/pet" className="inline-flex items-center gap-2 rounded-lg bg-tertiary-fixed px-4 py-3 font-bold text-primary hover:brightness-95">
              <span className="material-symbols-outlined">add</span> Cadastrar um pet
            </Link>
            <Link to="/agendamento" className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-3 font-bold text-white hover:bg-white/20">
              <span className="material-symbols-outlined">calendar_month</span> Agendar atendimento
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-sm">
            <span><strong className="mr-1 text-xl text-tertiary-fixed">{pets.length}</strong> pets cadastrados</span>
            <span><strong className="mr-1 text-xl text-tertiary-fixed">{appointments.length}</strong> atendimentos na agenda</span>
          </div>
        </div>
      </header>

      {error && <p role="alert" className="mx-auto mb-5 max-w-6xl rounded-lg border border-error/30 bg-error-container/40 px-4 py-3 text-sm text-error">{error}</p>}

      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <section aria-labelledby="home-pets-title">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-primary">pets</span>
              <h2 id="home-pets-title" className="text-xl font-bold text-on-surface">Seus pets</h2>
            </div>
            <Link to="/pet" className="text-sm font-bold text-primary hover:underline">Gerenciar pets</Link>
          </div>
          {isLoading ? <p className="text-on-surface-variant">Carregando sua conta...</p> : pets.length === 0 ? (
            <div className="rounded-xl border border-primary-fixed bg-surface-container-lowest p-7 shadow-sm">
              <span className="material-symbols-outlined text-3xl text-primary" aria-hidden="true">pets</span>
              <h3 className="mt-2 text-lg font-bold text-on-surface">Comece cadastrando seu primeiro pet</h3>
              <p className="mt-1 text-sm text-on-surface-variant">Depois você poderá registrar vacinas e marcar atendimentos para ele.</p>
              <Link to="/pet" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2.5 font-bold text-on-primary"><span className="material-symbols-outlined">add</span>Cadastrar pet</Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {pets.map((pet) => (
                <Link key={pet.id} to={`/pet/${pet.id}`} className="group relative overflow-hidden rounded-xl border border-primary-fixed bg-surface-container-lowest p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="absolute -right-4 -top-5 text-primary-fixed/70 transition-transform group-hover:rotate-12">
                    <span className="material-symbols-outlined text-8xl" aria-hidden="true">pets</span>
                  </div>
                  <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg bg-tertiary-fixed text-primary"><span className="material-symbols-outlined">pets</span></span>
                  <h3 className="relative mt-4 text-lg font-bold text-on-surface">{pet.nome}</h3>
                  <p className="relative mt-1 text-sm text-on-surface-variant">{[pet.especie, pet.raca].filter(Boolean).join(' · ')}</p>
                  <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">Ver prontuário <span className="material-symbols-outlined text-base">arrow_forward</span></span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary-container bg-primary-container p-6 text-white shadow-md" aria-labelledby="quick-actions-title">
            <p className="text-xs font-bold uppercase tracking-wider text-tertiary-fixed">Seu próximo passo</p>
            <h2 id="quick-actions-title" className="mt-1 text-xl font-bold">Acesso rápido</h2>
            <div className="mt-4 grid gap-2">
              <Link to="/carteira" className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 font-semibold hover:bg-white/20"><span className="flex items-center gap-3"><span className="material-symbols-outlined text-tertiary-fixed">vaccines</span>Carteira de vacinas</span><span aria-hidden="true">→</span></Link>
              <Link to="/agendamento" className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 font-semibold hover:bg-white/20"><span className="flex items-center gap-3"><span className="material-symbols-outlined text-tertiary-fixed">event_available</span>Agendar atendimento</span><span aria-hidden="true">→</span></Link>
              <Link to="/receitas" className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 font-semibold hover:bg-white/20"><span className="flex items-center gap-3"><span className="material-symbols-outlined text-tertiary-fixed">restaurant</span>Receitas e cuidados</span><span aria-hidden="true">→</span></Link>
            </div>
          </section>

          <section className="rounded-xl border border-primary-fixed bg-surface-container-lowest p-6 shadow-sm" aria-labelledby="appointments-title">
            <div className="flex items-center justify-between gap-3">
              <h2 id="appointments-title" className="text-lg font-bold text-on-surface">Próximos atendimentos</h2>
              <Link to="/agendamento" className="text-sm font-bold text-primary">Agendar</Link>
            </div>
            {appointments.length === 0 ? (
              <p className="mt-3 rounded-lg bg-surface-container-low p-4 text-sm text-on-surface-variant">Você ainda não tem atendimentos agendados.</p>
            ) : (
              <ul className="mt-3 divide-y divide-primary-fixed/70">
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="flex gap-3 py-3">
                    <span className="material-symbols-outlined mt-0.5 text-primary">calendar_month</span>
                    <div><p className="font-semibold text-on-surface">{appointment.servico} · {appointment.pet_nome}</p>
                      <time className="text-sm text-on-surface-variant" dateTime={appointment.data_hora}>{new Date(appointment.data_hora).toLocaleString('pt-BR')}</time></div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}