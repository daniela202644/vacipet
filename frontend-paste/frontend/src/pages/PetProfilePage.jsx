import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createPet, getPets, getTutorSession } from '../api';

const emptyPet = { nome: '', especie: 'Cão', raca: '', idade: '', peso: '' };

export default function PetProfilePage() {
  const tutor = getTutorSession();
  const { id } = useParams();
  const [pets, setPets] = useState([]);
  const [petForm, setPetForm] = useState(emptyPet);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getPets(tutor.id)
      .then((data) => {
        if (active) setPets(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => { active = false; };
  }, [tutor.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      const pet = await createPet({
        tutor_id: tutor.id,
        ...petForm,
        peso: petForm.peso || null,
      });
      setPets((current) => [pet, ...current]);
      setPetForm(emptyPet);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const selectedPet = pets.find((pet) => String(pet.id) === id) || pets[0];

  return (
    <main className="min-h-screen bg-surface px-4 pb-28 pt-8 sm:px-6">
      <header className="relative mx-auto mb-8 w-full max-w-6xl overflow-hidden rounded-xl bg-primary px-6 py-7 text-white shadow-lg sm:px-9 sm:py-9">
        <div className="absolute inset-y-0 right-0 hidden w-[40%] lg:block">
          <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85" alt="Cão recebendo cuidados veterinários" className="h-full w-full object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase text-tertiary-fixed"><span className="material-symbols-outlined text-sm">pets</span> Perfil familiar</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Seus pets, em primeiro lugar</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">Cadastre os animais da família e mantenha os dados de cada um organizados.</p>
          <p className="mt-5 text-sm text-white/70">Tutor responsável <strong className="text-white">{tutor.nome}</strong><span className="mx-2 text-white/30">·</span><strong className="text-tertiary-fixed">{pets.length}</strong> {pets.length === 1 ? 'pet cadastrado' : 'pets cadastrados'}</p>
        </div>
      </header>

      {error && <p role="alert" className="mx-auto mb-5 max-w-6xl rounded-lg border border-error/30 bg-error-container/40 px-4 py-3 text-sm text-error">{error}</p>}

      <div className="mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
        <section className="space-y-4" aria-labelledby="pet-list-title">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><span className="material-symbols-outlined text-2xl text-primary">pets</span><h2 id="pet-list-title" className="text-xl font-bold text-on-surface">Animais cadastrados</h2></div>
            <span className="rounded-full bg-secondary-fixed px-3 py-1 text-sm font-bold text-primary">{pets.length} {pets.length === 1 ? 'pet' : 'pets'}</span>
          </div>
          {isLoading ? <p className="text-on-surface-variant">Carregando seus pets...</p> : pets.length === 0 ? (
            <div className="rounded-xl border border-primary-fixed bg-surface-container-lowest p-6 shadow-sm">
              <span className="material-symbols-outlined text-3xl text-primary">pets</span>
              <p className="mt-2 text-on-surface-variant">Você ainda não cadastrou nenhum pet. Use o formulário para começar.</p>
            </div>
          ) : pets.map((pet) => (
            <Link
              key={pet.id}
              to={`/pet/${pet.id}`}
              className={`group block overflow-hidden rounded-xl border bg-surface-container-lowest shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg ${String(selectedPet?.id) === String(pet.id) ? 'border-primary ring-2 ring-primary-fixed' : 'border-primary-fixed'}`}
            >
              <div className="flex items-center justify-between gap-4 bg-surface-container-low px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-container text-tertiary-fixed"><span className="material-symbols-outlined text-2xl">{pet.especie === 'Gato' ? 'cruelty_free' : 'pets'}</span></span>
                  <div className="min-w-0"><h3 className="truncate text-lg font-bold text-on-surface">{pet.nome}</h3><p className="mt-0.5 truncate text-sm text-on-surface-variant">{[pet.especie, pet.raca].filter(Boolean).join(' · ')}</p></div>
                </div>
                <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 px-5 py-4 text-sm text-on-surface-variant">
                {pet.idade && <span><strong className="text-on-surface">Idade:</strong> {pet.idade} anos</span>}
                {pet.peso && <span><strong className="text-on-surface">Peso:</strong> {pet.peso} kg</span>}
                <span className="font-bold text-primary">Abrir prontuário e carteira</span>
              </div>
            </Link>
          ))}
          {selectedPet && (
            <div className="rounded-xl bg-primary p-5 text-white shadow-md">
              <p className="text-xs font-bold uppercase text-tertiary-fixed">Pet selecionado</p>
              <h2 className="mt-1 text-2xl font-extrabold">{selectedPet.nome}</h2>
              <p className="mt-1 text-sm text-white/75">{selectedPet.especie}{selectedPet.raca ? ` · ${selectedPet.raca}` : ''}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/carteira" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-teal-900">Carteira de vacinas</Link>
                <Link to="/agendamento" className="rounded-lg border border-white/40 px-4 py-2 text-sm font-bold text-white">Agendar atendimento</Link>
              </div>
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-xl border border-primary-fixed bg-surface-container-lowest shadow-md" aria-labelledby="new-pet-title">
          <div className="bg-surface-container-low px-6 py-5"><p className="text-xs font-bold uppercase text-primary">Novo prontuário</p><h2 id="new-pet-title" className="mt-1 text-xl font-bold text-on-surface">Cadastrar pet</h2></div>
          <div className="p-6">
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Nome
              <input required maxLength="255" value={petForm.nome} onChange={(event) => setPetForm({ ...petForm, nome: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-semibold text-slate-700">Espécie
                <select value={petForm.especie} onChange={(event) => setPetForm({ ...petForm, especie: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed">
                  <option>Cão</option><option>Gato</option><option>Outro</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700">Raça
                <input maxLength="120" value={petForm.raca} onChange={(event) => setPetForm({ ...petForm, raca: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-semibold text-slate-700">Idade (anos)
                <input type="number" min="0" max="100" value={petForm.idade} onChange={(event) => setPetForm({ ...petForm, idade: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
              </label>
              <label className="block text-sm font-semibold text-slate-700">Peso (kg)
                <input type="number" min="0" step="0.01" value={petForm.peso} onChange={(event) => setPetForm({ ...petForm, peso: event.target.value })} className="mt-1 w-full rounded-lg border border-outline/30 bg-surface-container-lowest px-3 py-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
              </label>
            </div>
            <button type="submit" disabled={isSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-4 py-3 font-bold text-on-primary shadow-sm transition hover:bg-primary disabled:opacity-60">
              <span className="material-symbols-outlined">{isSaving ? 'progress_activity' : 'add'}</span>
              {isSaving ? 'Salvando...' : 'Salvar pet'}
            </button>
          </form>
          </div>
        </section>
      </div>
    </main>
  );
}