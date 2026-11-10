import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import GlobalNavigation from './components/GlobalNavigation';
import HomePage from './pages/homepage'; 
import PetProfilePage from './pages/PetProfilePage';
import ReceitasPage from './pages/ReceitasPage';
import CarteiraPage from './pages/CarteiraPage';
import AgendamentoPet from './pages/AgendamentoPet';
import LojaPage from './pages/LojaPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SobrenosPage from './pages/SobrenosPage';
import RecupSenhaPage from './pages/RecupSenhaPage';
import SaudePetsPage from './pages/SaudePetsPage';
import { getTutorSession } from './api';

const isGithubPagesBuild = import.meta.env.PROD && !import.meta.env.VITE_API_URL;


function AppLayout() {
  return (
    <>
      <Outlet />
      <GlobalNavigation />
    </>
  );
}

function ProtectedRoute() {
  const tutor = getTutorSession();
  return tutor ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recuperar-senha" element={<RecupSenhaPage />} />

          {isGithubPagesBuild ? (
            <>
              <Route path="/" element={<SobrenosPage />} />
              <Route path="/receitas" element={<ReceitasPage />} />
              <Route path="/loja" element={<LojaPage />} />
              <Route path="/sobre-nos" element={<SobrenosPage />} />
              <Route path="/saude" element={<SaudePetsPage />} />
            </>
          ) : (
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/pet" element={<PetProfilePage />} />
              <Route path="/pet/:id" element={<PetProfilePage />} />
              <Route path="/receitas" element={<ReceitasPage />} />
              <Route path="/carteira" element={<CarteiraPage />} />
              <Route path="/agendamento" element={<AgendamentoPet />} />
              <Route path="/loja" element={<LojaPage />} />
              <Route path="/sobre-nos" element={<SobrenosPage />} />
              <Route path="/saude" element={<SaudePetsPage />} />
            </Route>
          )}

          <Route path="/Receitas" element={<Navigate to="/receitas" replace />} />
          <Route path="/Carteira" element={<Navigate to="/carteira" replace />} />
          <Route path="/Agendamento" element={<Navigate to="/agendamento" replace />} />
          <Route path="/Loja" element={<Navigate to="/loja" replace />} />
          <Route path="/Login" element={<Navigate to="/login" replace />} />
          <Route path="/Register" element={<Navigate to="/register" replace />} />
          <Route path="/Sobrenos" element={<Navigate to="/sobre-nos" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;