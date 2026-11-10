const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '')
  || (import.meta.env.DEV ? 'http://localhost:5000' : '');

async function request(path, options = {}) {
  if (!API_URL) {
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