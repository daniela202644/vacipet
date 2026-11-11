const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '')
  || (import.meta.env.DEV ? 'https://backend-paste.onrender.com' : '');
const IS_GITHUB_PAGES_DEMO = import.meta.env.PROD && !import.meta.env.VITE_API_URL;
const DEMO_DATA_KEY = 'vacipet:github-pages-demo';

function createDemoSeed() {
  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + 2);
  appointmentDate.setHours(10, 0, 0, 0);

  return {
    pets: [{
      id: 1,
      tutor_id: 1,
      nome: 'Pipoca',
      especie: 'Cão',
      raca: 'Golden Retriever',
      idade: 3,
      peso: '26.40',
    }],
    vaccines: [
      {
        id: 1,
        pet_id: 1,
        vacina_nome: 'V10 Polivalente Canina',
        categoria: 'optional',
        data_aplicacao: '2026-01-15',
        data_proxima_dose: '2027-01-15',
        lote: 'DEMO-V10-01',
        fabricante: 'Fabricante demonstrativo',
      },
      {
        id: 2,
        pet_id: 1,
        vacina_nome: 'Vacina Antirrábica',
        categoria: 'mandatory',
        data_aplicacao: '2025-10-20',
        data_proxima_dose: '2026-10-20',
        lote: 'DEMO-RAIVA-01',
        fabricante: 'Fabricante demonstrativo',
      },
    ],
    appointments: [{
      id: 1,
      pet_id: 1,
      tutor_id: 1,
      pet_nome: 'Pipoca',
      servico: 'Consulta veterinária',
      veterinario: 'Dr. Leandro José Medeiros',
      data_hora: appointmentDate.toISOString(),
      observacoes: 'Reserva de exemplo para a demonstração.',
      status: 'agendado',
    }],
  };
}

function getDemoData() {
  try {
    const saved = localStorage.getItem(DEMO_DATA_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    localStorage.removeItem(DEMO_DATA_KEY);
  }
  return createDemoSeed();
}

function saveDemoData(data) {
  localStorage.setItem(DEMO_DATA_KEY, JSON.stringify(data));
}

function demoRequest(path, options) {
  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body) : {};
  const data = getDemoData();

  if (method === 'GET' && path.startsWith('/pets/tutor/')) return data.pets;
  if (method === 'GET' && path.startsWith('/carteira/')) {
    const petId = Number(path.split('/').pop());
    return data.vaccines.filter((vaccine) => vaccine.pet_id === petId);
  }
  if (method === 'GET' && path.startsWith('/agendamentos/tutor/')) return data.appointments;

  if (method === 'POST' && path === '/pets') {
    const pet = { ...body, id: Date.now(), tutor_id: 1 };
    data.pets.unshift(pet);
    saveDemoData(data);
    return pet;
  }
  if (method === 'POST' && path === '/carteira') {
    const vaccine = {
      ...body,
      id: Date.now(),
      vacina_nome: body.nome,
      pet_id: Number(body.pet_id),
    };
    data.vaccines.unshift(vaccine);
    saveDemoData(data);
    return vaccine;
  }
  if (method === 'POST' && path === '/agendamentos') {
    const pet = data.pets.find((item) => item.id === Number(body.pet_id));
    const appointment = {
      ...body,
      id: Date.now(),
      tutor_id: 1,
      pet_id: Number(body.pet_id),
      pet_nome: pet?.nome || 'Pet de demonstração',
      status: 'agendado',
    };
    data.appointments.push(appointment);
    saveDemoData(data);
    return appointment;
  }

  throw new Error('Esta ação não está disponível na demonstração pública.');
}

async function request(path, options = {}) {
  if (!API_URL) {
    if (IS_GITHUB_PAGES_DEMO) return demoRequest(path, options);
    throw new Error('Login, cadastro e dados pessoais precisam de uma API hospedada; esta versão GitHub Pages é apenas informativa.');
  }
  const token = localStorage.getItem('vacipet:token')
    || sessionStorage.getItem('vacipet:token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Não foi possível concluir a solicitação.');
  }

  return data;
}

function post(path, body) {
  return request(path, { method: 'POST', body: JSON.stringify(body) });
}

export function getTutorSession() {
  if (IS_GITHUB_PAGES_DEMO) {
    return { id: 1, nome: 'Demonstração VaciPet', email: 'demo@vacipet.invalid' };
  }

  const savedTutor = localStorage.getItem('vacipet:tutor')
    || sessionStorage.getItem('vacipet:tutor');
  const savedToken = localStorage.getItem('vacipet:token')
    || sessionStorage.getItem('vacipet:token');

  if (!savedTutor || !savedToken) {
    clearTutorSession();
    return null;
  }

  try {
    return JSON.parse(savedTutor);
  } catch {
    localStorage.removeItem('vacipet:tutor');
    sessionStorage.removeItem('vacipet:tutor');
    return null;
  }
}

export function getActivePetId() {
  return sessionStorage.getItem('vacipet:petId') || localStorage.getItem('vacipet:petId');
}

export function setActivePetId(petId) {
  sessionStorage.setItem('vacipet:petId', String(petId));
}

export function saveTutorSession(tutor, token, remember = false) {
  const storage = remember ? localStorage : sessionStorage;
  const otherStorage = remember ? sessionStorage : localStorage;
  otherStorage.removeItem('vacipet:tutor');
  otherStorage.removeItem('vacipet:token');
  storage.setItem('vacipet:tutor', JSON.stringify(tutor));
  storage.setItem('vacipet:token', token);
}

export function clearTutorSession() {
  localStorage.removeItem('vacipet:tutor');
  sessionStorage.removeItem('vacipet:tutor');
  localStorage.removeItem('vacipet:token');
  sessionStorage.removeItem('vacipet:token');
  localStorage.removeItem('vacipet:petId');
  sessionStorage.removeItem('vacipet:petId');
}

export function registerTutor(tutor) {
  return post('/tutores/register', tutor);
}

export function loginTutor(credentials) {
  return post('/tutores/login', credentials);
}

export function getPets(tutorId) {
  return request(`/pets/tutor/${encodeURIComponent(tutorId)}`);
}

export function createPet(pet) {
  return post('/pets', pet);
}

export function getVaccines(petId) {
  return request(`/carteira/${encodeURIComponent(petId)}`);
}

export function createVaccine(vaccine) {
  return post('/carteira', vaccine);
}

export function getAppointments(tutorId) {
  return request(`/agendamentos/tutor/${encodeURIComponent(tutorId)}`);
}

export function createAppointment(appointment) {
  return post('/agendamentos', appointment);
}