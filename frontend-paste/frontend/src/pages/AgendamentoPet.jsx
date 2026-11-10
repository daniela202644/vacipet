import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createAppointment, getActivePetId, getAppointments, getPets, getTutorSession, setActivePetId } from '../api';

function getLocalDateTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

export default function AgendamentoPet() {
  const tutor = getTutorSession();
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [petId, setPetId] = useState('');
  const [service, setService] = useState('Consulta veterinária');
  const [veterinarian, setVeterinarian] = useState('Dr. Leandro José Medeiros');
  const [dateTime, setDateTime] = useState(getLocalDateTime);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([getPets(tutor.id), getAppointments(tutor.id)])
      .then(([petData, appointmentData]) => {
        if (!active) return;
        setPets(petData);
        setAppointments(appointmentData);
        const savedId = getActivePetId();
        const selectedPet = petData.find((pet) => String(pet.id) === savedId) || petData[0];
        if (selectedPet) {
          setPetId(String(selectedPet.id));
          setActivePetId(selectedPet.id);
        }
      })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [tutor.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (!petId) {
      setError('Cadastre um pet antes de agendar um atendimento.');
      return;
    }
    if (new Date(dateTime) <= new Date()) {
      setError('Escolha uma data e horário futuros.');
      return;
    }
    setIsSaving(true);
    try {
      const saved = await createAppointment({
        pet_id: Number(petId),
        tutor_id: tutor.id,
        servico: service,
        veterinario: veterinarian,
        data_hora: dateTime,
        observacoes: notes.trim() || null,
      });
      const pet = pets.find((item) => String(item.id) === petId);
      setAppointments((current) => [...current, { ...saved, pet_nome: pet?.nome }].sort(
        (first, second) => new Date(first.data_hora) - new Date(second.data_hora)
      ));
      setNotes('');
      setSuccess('Atendimento agendado e salvo na sua conta.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface px-4 pb-28 pt-8 sm:px-6">
      <header className="relative mx-auto mb-8 w-full max-w-6xl overflow-hidden rounded-xl bg-primary px-6 py-7 text-white shadow-lg sm:px-9 sm:py-9">
        <div className="absolute inset-y-0 right-0 hidden w-[40%] lg:block">
          <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85" alt="Cão em consulta veterinária" className="h-full w-full object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase text-tertiary-fixed"><span className="material-symbols-outlined text-sm">medical_services</span> Clínica veterinária</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Agendar atendimento</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">Escolha o pet, o serviço e um horário. A reserva fica vinculada à sua conta.</p>
          <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5 text-sm text-white/80">
            <span className="material-symbols-outlined text-tertiary-fixed">event_available</span>
            <span>{appointments.length} {appointments.length === 1 ? 'atendimento na agenda' : 'atendimentos na agenda'}</span>
          </div>
        </div>
      </header>

      {error && <p role="alert" className="mx-auto mb-4 max-w-6xl rounded-lg border border-error/30 bg-error-container/40 px-4 py-3 text-sm text-error">{error}</p>}
      {success && <p role="status" className="mx-auto mb-4 max-w-6xl rounded-lg border border-tertiary/30 bg-tertiary-fixed/40 px-4 py-3 text-sm font-semibold text-tertiary">{success}</p>}

      {pets.length === 0 && !isLoading ? (
        <section className="mx-auto max-w-6xl rounded-xl border border-primary-fixed bg-surface-container-lowest p-7 shadow-sm">
          <h2 className="text-lg font-bold text-on-surface">Nenhum pet cadastrado</h2>
          <p className="mt-1 text-on-surface-variant">Cadastre o pet que receberá o atendimento para continuar.</p>
          <Link to="/pet" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2.5 font-bold text-on-primary"><span className="material-symbols-outlined">pets</span>Cadastrar pet</Link>
        </section>
      ) : (
        <div className="mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="overflow-hidden rounded-xl border border-primary-fixed bg-surface-container-lowest shadow-md" aria-labelledby="booking-title">
            <div className="bg-surface-container-low px-6 py-5"><p className="text-xs font-bold uppercase text-primary">Nova reserva</p><h2 id="booking-title" className="mt-1 text-xl font-bold text-on-surface">Dados do atendimento</h2></div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <label className="block text-sm font-semibold text-on-surface-variant">Pet
                <select required value={petId} onChange={(event) => { setPetId(event.target.value); setActivePetId(event.target.value); }} disabled={isLoading} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed">
                  {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.nome}</option>)}
                </select>
              </label>
              <label className="block text-sm font-semibold text-on-surface-variant">Atendimento
                <select value={service} onChange={(event) => setService(event.target.value)} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed">
                  <option>Consulta veterinária</option>
                  <option>Vacinação</option>
                  <option>Retorno</option>
                  <option>Exame</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-on-surface-variant">Veterinário
                <select required value={veterinarian} onChange={(event) => setVeterinarian(event.target.value)} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed">
                  <option>Dr. Leandro José Medeiros</option>
                  <option>Dra. Marina Albuquerque</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-on-surface-variant">Data e horário
                <input required type="datetime-local" min={getLocalDateTime()} value={dateTime} onChange={(event) => setDateTime(event.target.value)} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
              </label>
              <label className="block text-sm font-semibold text-on-surface-variant">Observações
                <textarea rows="3" maxLength="1000" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Conte à clínica o motivo da visita ou alguma necessidade do pet." className="mt-1 w-full resize-y rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
              </label>
              <button type="submit" disabled={isSaving || isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-4 py-3 font-bold text-on-primary shadow-sm transition hover:bg-primary disabled:opacity-60">
                <span className="material-symbols-outlined">{isSaving ? 'progress_activity' : 'event_available'}</span>
                {isSaving ? 'Salvando...' : 'Confirmar agendamento'}
              </button>
            </form>
          </section>

          <section aria-labelledby="appointments-list-title">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="appointments-list-title" className="flex items-center gap-2 text-xl font-bold text-on-surface"><span className="material-symbols-outlined text-primary">calendar_month</span>Seus atendimentos</h2>
              <Link to="/pet" className="text-sm font-bold text-primary">Gerenciar pets</Link>
            </div>
            {isLoading ? <p className="text-on-surface-variant">Carregando agenda...</p> : appointments.length === 0 ? (
              <div className="rounded-xl border border-primary-fixed bg-surface-container-lowest p-6 text-on-surface-variant shadow-sm">Você ainda não tem atendimentos agendados.</div>
            ) : (
              <ul className="space-y-3">
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="rounded-xl border border-primary-fixed bg-surface-container-lowest p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-on-surface">{appointment.servico}</h3>
                        <p className="mt-1 text-sm text-on-surface-variant">Pet: {appointment.pet_nome}</p>
                        <p className="mt-1 text-sm font-semibold text-on-surface-variant">Veterinário: {appointment.veterinario || 'A definir'}</p>
                        <time className="mt-2 block text-sm font-semibold text-primary" dateTime={appointment.data_hora}>
                          {new Date(appointment.data_hora).toLocaleString('pt-BR')}
                        </time>
                        {appointment.observacoes && <p className="mt-2 text-sm text-on-surface-variant">{appointment.observacoes}</p>}
                      </div>
                      <span className="rounded-full bg-tertiary-fixed/50 px-3 py-1 text-xs font-bold capitalize text-tertiary">{appointment.status || 'agendado'}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </main>
  );
}