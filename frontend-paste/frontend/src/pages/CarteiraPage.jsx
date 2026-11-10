import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createVaccine, getActivePetId, getPets, getTutorSession, getVaccines, setActivePetId } from '../api';

const emptyVaccine = { name: '', category: 'optional', date: '', nextDate: '', batch: '', manufacturer: '' };

function formatDate(value) {
  if (!value) return 'Não informada';
  return new Date(`${String(value).slice(0, 10)}T00:00:00`).toLocaleDateString('pt-BR');
}

function mapVaccine(record) {
  const isPending = record.data_proxima_dose && new Date(`${record.data_proxima_dose}T00:00:00`) < new Date(new Date().toDateString());
  return {
    id: record.id,
    title: record.vacina_nome || 'Vacina',
    category: record.categoria || 'optional',
    status: isPending ? 'pending' : 'up_to_date',
    appliedDate: formatDate(record.data_aplicacao),
    nextDate: formatDate(record.data_proxima_dose),
    batch: record.lote,
    manufacturer: record.fabricante,
  };
}

export default function CarteiraPage() {
  const tutor = getTutorSession();
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState('');
  const [vaccines, setVaccines] = useState([]);
  const [loadedPetId, setLoadedPetId] = useState('');
  const [newVaccine, setNewVaccine] = useState(emptyVaccine);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoadingPets, setIsLoadingPets] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const isLoadingVaccines = Boolean(selectedPetId && loadedPetId !== selectedPetId);

  useEffect(() => {
    let active = true;
    getPets(tutor.id)
      .then((data) => {
        if (!active) return;
        setPets(data);
        const savedId = getActivePetId();
        const pet = data.find((item) => String(item.id) === savedId) || data[0];
        if (pet) {
          setSelectedPetId(String(pet.id));
          setActivePetId(pet.id);
        }
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => { if (active) setIsLoadingPets(false); });
    return () => { active = false; };
  }, [tutor.id]);

  useEffect(() => {
    if (!selectedPetId) return undefined;
    let active = true;
    setActivePetId(selectedPetId);
    getVaccines(selectedPetId)
      .then((data) => {
        if (!active) return;
        setVaccines(data.map(mapVaccine));
        setLoadedPetId(String(selectedPetId));
      })
      .catch((requestError) => {
        if (!active) return;
        setError(requestError.message);
        setLoadedPetId(String(selectedPetId));
      });
    return () => { active = false; };
  }, [selectedPetId]);

  const filteredVaccines = useMemo(() => vaccines.filter((vaccine) => (
    filter === 'all' || vaccine.category === filter
  )), [filter, vaccines]);

  const handleAddVaccine = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (!selectedPetId) {
      setError('Cadastre ou selecione um pet antes de registrar uma vacina.');
      return;
    }
    setIsSaving(true);
    try {
      const saved = await createVaccine({
        pet_id: Number(selectedPetId),
        nome: newVaccine.name.trim(),
        categoria: newVaccine.category,
        data_aplicacao: newVaccine.date,
        data_proxima_dose: newVaccine.nextDate || null,
        lote: newVaccine.batch.trim() || null,
        fabricante: newVaccine.manufacturer.trim() || null,
      });
      setVaccines((current) => [mapVaccine(saved), ...current]);
      setNewVaccine(emptyVaccine);
      setSuccess('Vacina registrada na carteira.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const pendingCount = vaccines.filter((vaccine) => vaccine.status === 'pending').length;

  return (
    <main className="min-h-screen bg-surface px-4 pb-28 pt-8 sm:px-6">
      <header className="relative mx-auto mb-8 w-full max-w-6xl overflow-hidden rounded-xl bg-primary px-6 py-7 text-white shadow-lg sm:px-9 sm:py-9">
        <div className="absolute inset-y-0 right-0 hidden w-[40%] lg:block">
          <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85" alt="Cão em consulta veterinária" className="h-full w-full object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase text-tertiary-fixed"><span className="material-symbols-outlined text-sm">vaccines</span> Saúde e prevenção</span>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Carteira de vacinas</h1>
            <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">Histórico organizado por pet, salvo junto com os dados da sua conta.</p>
            <div className="mt-6 flex flex-wrap gap-6 border-t border-white/15 pt-5 text-sm">
              <span><strong className="mr-1 text-xl text-tertiary-fixed">{vaccines.length}</strong> registros</span>
              <span><strong className="mr-1 text-xl text-tertiary-fixed">{pendingCount}</strong> reforços vencidos</span>
            </div>
          </div>
          <label className="relative z-10 min-w-48 text-sm font-bold text-white">Pet
          <select value={selectedPetId} onChange={(event) => setSelectedPetId(event.target.value)} disabled={isLoadingPets || pets.length === 0} className="mt-1 block w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-tertiary-fixed">
            {pets.length === 0 && <option value="">Nenhum pet cadastrado</option>}
            {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.nome}</option>)}
          </select>
          </label>
        </div>
      </header>

      {error && <p role="alert" className="mx-auto mb-4 max-w-6xl rounded-lg border border-error/30 bg-error-container/40 px-4 py-3 text-sm text-error">{error}</p>}
      {success && <p role="status" className="mx-auto mb-4 max-w-6xl rounded-lg border border-tertiary/30 bg-tertiary-fixed/40 px-4 py-3 text-sm font-semibold text-tertiary">{success}</p>}

      {pets.length === 0 && !isLoadingPets ? (
        <section className="mx-auto max-w-6xl rounded-xl border border-primary-fixed bg-surface-container-lowest p-7 shadow-sm">
          <h2 className="text-lg font-bold text-on-surface">Cadastre um pet para começar</h2>
          <p className="mt-1 text-on-surface-variant">Cada vacina fica vinculada ao animal correspondente.</p>
          <Link to="/pet" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2.5 font-bold text-on-primary"><span className="material-symbols-outlined">pets</span>Ir para meus pets</Link>
        </section>
      ) : (
        <div className="mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section aria-labelledby="vaccine-list-title">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 id="vaccine-list-title" className="flex items-center gap-2 text-xl font-bold text-on-surface"><span className="material-symbols-outlined text-primary">health_and_safety</span>Registros ({vaccines.length})</h2>
              <div className="flex gap-1" role="group" aria-label="Filtrar carteira">
                {[['all', 'Todas'], ['mandatory', 'Obrigatórias'], ['optional', 'Preventivas']].map(([value, label]) => (
                  <button key={value} type="button" onClick={() => setFilter(value)} aria-pressed={filter === value} className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${filter === value ? 'bg-primary-container text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4 flex gap-3 text-sm">
              <span className="rounded-lg border border-tertiary/20 bg-tertiary-fixed/40 px-3 py-2 font-semibold text-tertiary">{vaccines.length - pendingCount} em dia</span>
              <span className="rounded-lg border border-error/20 bg-error-container/30 px-3 py-2 font-semibold text-error">{pendingCount} com reforço vencido</span>
            </div>
            {isLoadingVaccines ? <p className="text-on-surface-variant">Carregando carteira...</p> : filteredVaccines.length === 0 ? (
              <div className="rounded-xl border border-primary-fixed bg-surface-container-lowest p-6 text-on-surface-variant shadow-sm">Nenhum registro neste filtro ainda.</div>
            ) : (
              <ul className="space-y-3">
                {filteredVaccines.map((vaccine) => (
                  <li key={vaccine.id} className="overflow-hidden rounded-xl border border-primary-fixed bg-surface-container-lowest shadow-sm">
                    <div className={`h-1.5 ${vaccine.status === 'pending' ? 'bg-error' : 'bg-tertiary'}`} />
                    <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-on-surface">{vaccine.title}</h3>
                        <p className="mt-1 text-sm text-on-surface-variant">{vaccine.category === 'mandatory' ? 'Obrigatória' : 'Preventiva'}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${vaccine.status === 'pending' ? 'bg-error-container/40 text-error' : 'bg-tertiary-fixed/50 text-tertiary'}`}>
                        {vaccine.status === 'pending' ? 'Reforço vencido' : 'Registrada'}
                      </span>
                    </div>
                    <dl className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-surface-container-low p-4 text-sm sm:grid-cols-3">
                      <div><dt className="text-on-surface-variant">Aplicada</dt><dd className="font-semibold text-on-surface">{vaccine.appliedDate}</dd></div>
                      <div><dt className="text-on-surface-variant">Próxima dose</dt><dd className="font-semibold text-on-surface">{vaccine.nextDate}</dd></div>
                      {vaccine.batch && <div><dt className="text-on-surface-variant">Lote</dt><dd className="font-semibold text-on-surface">{vaccine.batch}</dd></div>}
                      {vaccine.manufacturer && <div><dt className="text-on-surface-variant">Fabricante</dt><dd className="font-semibold text-on-surface">{vaccine.manufacturer}</dd></div>}
                    </dl>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Link to="/agendamento" className="mt-5 inline-flex items-center gap-2 font-bold text-primary">Agendar atendimento <span className="material-symbols-outlined text-base">arrow_forward</span></Link>
          </section>

          <section className="overflow-hidden rounded-xl border border-primary-fixed bg-surface-container-lowest shadow-md" aria-labelledby="add-vaccine-title">
            <div className="bg-surface-container-low px-6 py-5"><p className="text-xs font-bold uppercase text-primary">Atualizar prontuário</p><h2 id="add-vaccine-title" className="mt-1 text-xl font-bold text-on-surface">Registrar vacina</h2></div>
            <div className="p-6">
            <form onSubmit={handleAddVaccine} className="mt-5 space-y-4">
              <label className="block text-sm font-semibold text-on-surface-variant">Nome da vacina
                <input required maxLength="255" value={newVaccine.name} onChange={(event) => setNewVaccine({ ...newVaccine, name: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
              </label>
              <label className="block text-sm font-semibold text-on-surface-variant">Categoria
                <select value={newVaccine.category} onChange={(event) => setNewVaccine({ ...newVaccine, category: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed">
                  <option value="optional">Preventiva</option><option value="mandatory">Obrigatória</option>
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm font-semibold text-on-surface-variant">Data aplicada
                  <input required type="date" value={newVaccine.date} onChange={(event) => setNewVaccine({ ...newVaccine, date: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
                </label>
                <label className="block text-sm font-semibold text-on-surface-variant">Próxima dose
                  <input type="date" value={newVaccine.nextDate} onChange={(event) => setNewVaccine({ ...newVaccine, nextDate: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
                </label>
              </div>
              <label className="block text-sm font-semibold text-on-surface-variant">Lote
                <input maxLength="120" value={newVaccine.batch} onChange={(event) => setNewVaccine({ ...newVaccine, batch: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
              </label>
              <label className="block text-sm font-semibold text-on-surface-variant">Fabricante / clínica
                <input maxLength="255" value={newVaccine.manufacturer} onChange={(event) => setNewVaccine({ ...newVaccine, manufacturer: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
              </label>
              <button type="submit" disabled={isSaving || pets.length === 0} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-4 py-3 font-bold text-on-primary shadow-sm transition hover:bg-primary disabled:opacity-60">
                <span className="material-symbols-outlined">{isSaving ? 'progress_activity' : 'add'}</span>
                {isSaving ? 'Salvando...' : 'Salvar registro'}
              </button>
            </form>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}