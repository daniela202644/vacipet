import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginTutor, saveTutorSession } from '../api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await loginTutor({ email: identifier, senha: password });
      saveTutorSession(data.tutor, data.token, remember);
      navigate('/');
    } catch (error) {
      alert(error.message || 'Erro ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col justify-center items-center antialiased">
      <main className="w-full max-w-7xl mx-auto px-margin bg-surface">
        <div className="flex flex-col w-full py-8 md:py-12">
          <div className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-xl bg-surface-container-lowest">
            {/* Efeitos Decorativos de Fundo */}
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[720px]">
              {/* Coluna Esquerda: Formulário de Acesso */}
              <section className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-surface-container-lowest">
                <div>
                  {/* Cabeçalho da Marca */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-11 h-11 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                      <span 
                        className="material-symbols-outlined text-title-lg" 
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        pets
                      </span>
                    </div>
                    <div>
                      <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold">
                        Vaci<span className="text-secondary">Pet</span>
                      </span>
                      <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                        Carteira Digital Animal
                      </p>
                    </div>
                  </div>

                  {/* Título & Subtítulo */}
                  <div className="mb-8">
                    <h1 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold tracking-tight">
                      Acesse sua conta no VaciPet
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                      Gerencie a saúde preventiva, histórico vacinal e consultas clínicas do seu pet em um único ambiente seguro e homologado.
                    </p>
                  </div>

                  {/* Login Social Rápido */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <button 
                      className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors duration-200 text-on-surface font-label-lg text-label-lg" 
                      type="button"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                      </svg>
                      <span>Entrar com Google</span>
                    </button>
                  </div>

                  {/* Divisor */}
                  <div className="relative flex items-center justify-center my-6">
                    <div className="w-full h-px bg-surface-container-high"></div>
                    <span className="absolute px-3 bg-surface-container-lowest font-body-sm text-body-sm text-outline">
                      ou acesse com seu e-mail ou CPF
                    </span>
                  </div>

                  {/* Formulário */}
                  <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5 font-medium" htmlFor="identifier">
                        E-mail ou CPF do Tutor
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                          badge
                        </span>
                        <input 
                          className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg shadow-sm outline-none transition-all placeholder:text-outline/60 border border-[#dae2fd] focus:border-primary focus:ring-2 focus:ring-primary/20" 
                          id="identifier" 
                          name="identifier" 
                          placeholder="exemplo@vetmail.com ou 000.000.000-00" 
                          required 
                          type="text"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="font-label-md text-label-md text-on-surface-variant font-medium" htmlFor="password">
                          Senha de Acesso
                        </label>
                        <Link className="font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors" to="/recuperar-senha">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                          lock
                        </span>
                        <input 
                          className="w-full pl-11 pr-11 py-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg shadow-sm outline-none transition-all placeholder:text-outline/60 border border-[#dae2fd] focus:border-primary focus:ring-2 focus:ring-primary/20" 
                          id="password" 
                          name="password" 
                          placeholder="••••••••••••" 
                          required 
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                          aria-label="Alternar visibilidade de senha" 
                          className="absolute right-3.5 text-outline hover:text-on-surface transition-colors p-1" 
                          onClick={togglePasswordVisibility} 
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input 
                          className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary" 
                          id="remember" 
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Lembrar de mim neste dispositivo</span>
                      </label>
                      <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                        <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
                        <span className="hidden sm:inline">Conexão Segura</span>
                      </div>
                    </div>

                    {/* Botão de Ação Primária */}
                    <button 
                      className="w-full mt-2 py-3.5 px-6 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-xl active:scale-[0.99] disabled:opacity-75" 
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                          <span>Autenticando Prontuário...</span>
                        </>
                      ) : (
                        <>
                          <span>Entrar na Minha Conta</span>
                          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Alerta Preventivo de Zoonoses / Vacinação */}
                  <div className="mt-6 p-3.5 rounded-lg bg-error-container/40 flex items-start gap-3">
                    <span 
                      className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5" 
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      notification_important
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                      <strong className="font-semibold text-error">Atenção preventiva:</strong> Atrasos no ciclo antirrábico e polivalente desativam certificados digitais e emitem alertas automáticos para zoonoses.
                    </p>
                  </div>
                </div>

                {/* Rodapé do Cartão de Entrada */}
                <div className="mt-8 pt-6 bg-transparent flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Ainda não tem conta no VaciPet?
                  </p>
                  <Link className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-bold hover:underline" to="/register">
                    Cadastre-se gratuitamente
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </Link>
                </div>
              </section>

              {/* Coluna Direita: Painel Informativo & Benefícios Clínicos */}
              <section className="lg:col-span-5 bg-surface-container text-on-surface p-6 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
                {/* Elementos Vetoriais Decorativos de Fundo */}
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary-fixed/50 blur-2xl pointer-events-none"></div>
                <div className="absolute -left-12 bottom-0 w-48 h-48 rounded-full bg-tertiary-fixed-dim/20 blur-xl pointer-events-none"></div>

                <div className="relative z-10">
                  {/* Tag de Status Oficial */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-wide uppercase">
                      Plataforma Oficial de Saúde Animal
                    </span>
                  </div>

                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight mb-3">
                    O passaporte de proteção completa para quem você mais ama.
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Elimine carteirinhas de papel perdidas ou rasgadas com nosso ecossistema médico interoperável entre clínicas, hospitais e órgãos sanitários.
                  </p>

                  {/* Imagem Contextual Estilizada */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-md mb-6 bg-surface-container-high">
                    <img 
                      className="w-full h-full object-cover object-center" 
                      alt="Médica veterinária examinando cão golden retriever" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyw22N3OjXVKqG7GNKu9Y09_6w4svQGtHWb2EwebFnHDup-CXF94iMSuNevBzCMXM1zxWPWniz3D8gjIyzja1ntVeeJrWm_K4jQu4LIOVPWc2H3e8KvQAjK1d0j8mSlbgdVdtlIj8gJ4BnVpwWIoc6pkC2Uk4aNeLJ2vIrIAo6akrccpgRgvEL6jK-n--E-Sb_-2KvxgUN17apT5YaB3KT2O9wJNoXnV7O9qg1Wjq8VUQqU362WK-J" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent flex items-end p-3">
                      <span className="font-label-sm text-label-sm text-surface-bright flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">verified</span> Prontuário verificado em tempo real
                      </span>
                    </div>
                  </div>

                  {/* Grade de Benefícios / Destaques */}
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                      </div>
                      <div>
                        <h4 className="font-label-md text-label-md text-on-surface font-bold">100% Digital e Infalsificável</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">QR Code de autenticidade criptografada com assinatura do médico veterinário.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                      </div>
                      <div>
                        <h4 className="font-label-md text-label-md text-on-surface font-bold">Avisos Prévios via WhatsApp</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Lembretes automáticos enviados com 15 dias de antecedência para reforços.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
                      </div>
                      <div>
                        <h4 className="font-label-md text-label-md text-on-surface font-bold">Válido em Companhias Aéreas e Hotéis</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Padrão nacional e internacional aceito para embarques e hospedagens pet.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selos de Credibilidade e Métricas */}
                <div className="relative z-10 pt-6 mt-6 bg-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-headline-sm text-headline-sm font-extrabold text-primary">+15.000</span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">pets registrados</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline">Em mais de 450 clínicas credenciadas</p>
                  </div>

                  {/* Homologação & Segurança */}
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-lowest/70 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary text-[24px]">gavel</span>
                    <div className="text-left leading-tight">
                      <p className="font-label-sm text-label-sm font-bold text-on-surface">Diretrizes CFMV</p>
                      <p className="font-label-sm text-[10px] text-outline">Segurança LGPD &amp; TLS 1.3</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;