import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerTutor } from '../api';
//modificar o register e o login!!!!!11!!!!1!!!1!!1!!11!1!!1
const RegisterPage = () => {
  // 1. ESTADOS
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  // 2. FUNÇÃO QUE ENVIA PARA O BACKEND-------------------------------------------------------------
  // 2. FUNÇÃO QUE ENVIA PARA O BACKEND
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // 3. O SEU DESIGN EXISTENTE CONTINUA AQUI EM BAIXO
  // -------------------------------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [optinWhatsapp, setOptinWhatsapp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Manipuladores de input com máscaras
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 10) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    setFormData((prev) => ({ ...prev, whatsapp: value }));
  };

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 9) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}.${value.slice(3)}`;
    }
    setFormData((prev) => ({ ...prev, cpf: value }));
  };

  // Validação de força da palavra-passe
  const getPasswordStrength = (val) => {
    const hasLength = val.length >= 8;
    const hasNum = /\d/.test(val);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);
    const hasUpperLower = /[a-z]/.test(val) && /[A-Z]/.test(val);

    let score = 0;
    if (val.length > 0) score++;
    if (hasLength) score++;
    if (hasNum && hasSpecial) score++;
    if (hasUpperLower && hasLength && hasNum && hasSpecial) score++;

    return { score, hasLength, hasNum, hasSpecial };
  };

  const strength = getPasswordStrength(formData.password);
  
  let strengthLabel = 'Muito fraca';
  let labelClass = 'text-outline';
  let barClasses = ['bg-surface-variant', 'bg-surface-variant', 'bg-surface-variant', 'bg-surface-variant'];

  if (formData.password.length > 0) {
    if (strength.score === 1) {
      strengthLabel = 'Fraca';
      labelClass = 'text-error';
      barClasses = ['bg-error', 'bg-surface-variant', 'bg-surface-variant', 'bg-surface-variant'];
    } else if (strength.score === 2) {
      strengthLabel = 'Razoável';
      labelClass = 'text-secondary';
      barClasses = ['bg-secondary-container', 'bg-secondary-container', 'bg-surface-variant', 'bg-surface-variant'];
    } else if (strength.score === 3) {
      strengthLabel = 'Boa';
      labelClass = 'text-primary';
      barClasses = ['bg-primary', 'bg-primary', 'bg-primary', 'bg-surface-variant'];
    } else if (strength.score >= 4) {
      strengthLabel = 'Excelente e Segura';
      labelClass = 'text-tertiary';
      barClasses = ['bg-tertiary-fixed-dim', 'bg-tertiary-fixed-dim', 'bg-tertiary-fixed-dim', 'bg-tertiary-fixed-dim'];
    }
  }

  const passwordsMatch = formData.confirmPassword.length === 0 || formData.password === formData.confirmPassword;

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Você precisa aceitar os termos para continuar.');
      return;
    }
    if (!passwordsMatch) {
      alert('As palavras-passe introduzidas não coincidem. Por favor, verifique.');
      return;
    }

    setIsLoading(true);
    try {
      await registerTutor({
        nome: formData.fullName,
        email: formData.email,
        senha: formData.password,
        telefone: formData.whatsapp,
        cpf: formData.cpf,
      });
      alert('Conta criada com sucesso!');
      navigate('/login');
    } catch (error) {
      alert(error.message || 'Erro ao conectar com o servidor Node.js.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col justify-center items-center">
      <main className="w-full max-w-7xl mx-auto px-margin bg-surface">
        <div className="flex flex-col w-full">
          <div className="relative w-full py-space-xl flex items-center justify-center">
            {/* Ambient glowing backdrop blurs */}
            <div className="absolute -top-12 -left-16 w-96 h-96 bg-primary-fixed-dim/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute bottom-8 right-0 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
            
            {/* Main Container: Asymmetric High-Impact Clinical Split */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              
              {/* LEFT COLUMN: Value Proposition, Trust & Visual Proof */}
              <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-8">
                {/* Brand / Category Identifier */}
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-md">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">VaciPet</span>
                      <span className="bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full font-label-sm text-label-sm uppercase">Oficial</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-outline">Plataforma Nacional de Imunização Veterinária</span>
                  </div>
                </div>

                {/* Hero Pitch Statement */}
                <div className="flex flex-col gap-space-xs mt-space-sm">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high w-fit">
                    <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">100% Gratuito para Tutores</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight leading-tight">
                    Saúde preventiva e segurança vacinal em um só lugar.
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    Monitore reforços, emita atestados sanitários em viagens e garanta a proteção vital dos seus companheiros sem perder prazos.
                  </p>
                </div>

                {/* Trust & Value Bento Pillars */}
                <div className="flex flex-col gap-space-sm mt-space-xs">
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-md transition-all hover:bg-surface-container-low">
                    <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">verified</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-md text-title-md text-on-surface font-semibold">Carteira Digital Gratuita para Sempre</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Histórico de lotes, datas de aplicação e certificado criptografado CVI contra extravios.</span>
                    </div>
                  </div>
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-md transition-all hover:bg-surface-container-low">
                    <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">domain_add</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-md text-title-md text-on-surface font-semibold">Integração Direta com Zoonoses e Clínicas</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Sincronização em tempo real de campanhas públicas municipais e hospitais credenciados.</span>
                    </div>
                  </div>
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-md transition-all hover:bg-surface-container-low">
                    <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center text-tertiary flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">groups</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-md text-title-md text-on-surface font-semibold">Múltiplos Cães e Gatos na Mesma Conta</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Gerencie a rotina de quantos animais precisar com perfis independentes e avisos unificados.</span>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card */}
                <div className="p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm relative overflow-hidden mt-space-xs">
                  <div className="absolute -right-4 -bottom-4 text-surface-container-high/60 pointer-events-none select-none">
                    <span className="material-symbols-outlined text-[110px]">format_quote</span>
                  </div>
                  <div className="flex items-center gap-space-sm relative z-10">
                    <img 
                      className="w-12 h-12 rounded-full object-cover shadow-sm flex-shrink-0" 
                      alt="Tutora Dra. Camila Vasconcellos" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlUd3u0Zj8czfp6l-l70EnA1Gt8kxTCcZD69IbBnhVw2PCDWsiQNC9d55utpmp5LDNRkEXkoxOieZhIgQMTcb3EbQ5QcNeGMS9DgC9J3lwPD4g_253M4PdA8-fG8EUM3NVM42lEEBQkcjJNPhcgxiZVm_g-DBgJsDRW3XBPDz3ZXunbIne2ORapLTrJMgyev8QCrhNRqzlvgHcFAGXaJV5aVr0J7FzeEajK9Y4_Ck4TnbMWtmpCS6O"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-sm text-title-md text-on-surface font-bold leading-none">Dra. Camila Vasconcellos</span>
                      <span className="font-body-sm text-body-sm text-outline">Tutora de 3 resgatados &amp; Médica</span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant relative z-10 italic">
                    "Nunca mais perdi uma dose de reforço da giárdia e antirrábica. O aviso de campanhas pelo WhatsApp evitou filas no posto de Zoonoses."
                  </p>
                  <div className="flex items-center gap-1 text-primary relative z-10">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-label-sm text-label-sm text-on-surface font-bold ml-1">4.9/5 em adesão clínica</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Registration Card Container */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xl flex flex-col gap-space-lg relative">
                  {/* Card Header */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Passo 1 de 2: Perfil do Tutor</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-medium">Acesso Seguro SSL</span>
                    </div>
                    <h1 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">
                      Crie sua conta gratuita no VaciPet
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Comece agora a proteger a saúde e o calendário vacinal do seu pet.
                    </p>
                  </div>

                  {/* Quick Social / Gov.br Signups */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                    <button className="group flex items-center justify-center gap-space-sm px-space-md py-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-all active:scale-[0.99] shadow-sm" type="button">
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                      </svg>
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface">Cadastrar com Google</span>
                    </button>
                  </div>

                  {/* Semantic Separator */}
                  <div className="relative flex items-center justify-center my-space-xs">
                    <div className="w-full h-px bg-surface-variant"></div>
                    <span className="absolute px-4 bg-surface-container-lowest font-body-sm text-body-sm text-outline">
                      ou preencha seus dados de acesso
                    </span>
                  </div>

                  {/* Structured Form */}
                  <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
                    {/* Block: Personal Identity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="font-label-md text-label-md text-on-surface-variant font-semibold flex items-center justify-between" htmlFor="fullName">
                          <span>Nome Completo do Tutor</span>
                          <span className="font-label-sm text-label-sm text-outline">Obrigatório</span>
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
                          <input 
                            className="w-full h-11 pl-11 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all" 
                            id="fullName" 
                            placeholder="Ex.: Mariana Silva Costa" 
                            required 
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Primary Email */}
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="email">
                          E-mail principal de contato e avisos
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">alternate_email</span>
                          <input 
                            className="w-full h-11 pl-11 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all" 
                            id="email" 
                            placeholder="tutor@exemplo.com.br" 
                            required 
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="flex flex-col gap-1">
                        <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="whatsapp">
                          WhatsApp / Celular
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">chat</span>
                          <input 
                            className="w-full h-11 pl-11 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all" 
                            id="whatsapp" 
                            placeholder="(11) 99876-5432" 
                            required 
                            type="tel"
                            value={formData.whatsapp}
                            onChange={handlePhoneChange}
                          />
                        </div>
                        <span className="font-body-sm text-body-sm text-secondary font-medium flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">notifications_active</span>
                          Para receber lembretes de reforço vacinal
                        </span>
                      </div>

                      {/* CPF */}
                      <div className="flex flex-col gap-1">
                        <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="cpf">
                          CPF do Responsável
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">badge</span>
                          <input 
                            className="w-full h-11 pl-11 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all" 
                            id="cpf" 
                            maxLength="14" 
                            placeholder="000.000.000-00" 
                            required 
                            type="text"
                            value={formData.cpf}
                            onChange={handleCpfChange}
                          />
                        </div>
                        <span className="font-body-sm text-body-sm text-outline flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">verified_user</span>
                          Necessário para emissão e validação do CVI
                        </span>
                      </div>
                    </div>

                    {/* Block: Password Security */}
                    <div className="p-space-md rounded-xl bg-surface-container-low/70 flex flex-col gap-space-sm mt-space-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                        {/* Password */}
                        <div className="flex flex-col gap-1">
                          <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="password">
                            Criar Senha forte
                          </label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                            <input 
                              className="w-full h-11 pl-11 pr-10 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                              id="password" 
                              placeholder="••••••••" 
                              required 
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={handleChange}
                            />
                            <button 
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface" 
                              onClick={() => setShowPassword(!showPassword)} 
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1">
                          <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="confirmPassword">
                            Confirmar Senha
                          </label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock_reset</span>
                            <input 
                              className={`w-full h-11 pl-11 pr-10 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:outline-none focus:ring-2 transition-all ${!passwordsMatch ? 'ring-2 ring-error focus:ring-error' : 'focus:ring-primary'}`} 
                              id="confirmPassword" 
                              placeholder="••••••••" 
                              required 
                              type={showConfirmPassword ? "text" : "password"}
                              value={formData.confirmPassword}
                              onChange={handleChange}
                            />
                            <button 
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface" 
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Visual Password Strength Meter */}
                      <div className="flex flex-col gap-1.5 mt-1">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-outline">Força da segurança:</span>
                          <span className={`font-label-sm text-label-sm font-bold ${labelClass}`}>{strengthLabel}</span>
                        </div>
                        {/* Track with segments */}
                        <div className="w-full grid grid-cols-4 gap-1.5 h-1.5">
                          {barClasses.map((bgClass, idx) => (
                            <div key={idx} className={`rounded-full transition-all duration-300 ${bgClass}`}></div>
                          ))}
                        </div>
                        {/* Criteria Indicators */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-outline font-body-sm text-body-sm">
                          <span className={strength.hasLength ? 'inline-flex items-center gap-1 text-tertiary font-semibold transition-colors' : 'inline-flex items-center gap-1 text-outline transition-colors'}>
                            <span className="material-symbols-outlined text-[14px]">circle</span> 8+ caracteres
                          </span>
                          <span className={strength.hasNum ? 'inline-flex items-center gap-1 text-tertiary font-semibold transition-colors' : 'inline-flex items-center gap-1 text-outline transition-colors'}>
                            <span className="material-symbols-outlined text-[14px]">circle</span> Números
                          </span>
                          <span className={strength.hasSpecial ? 'inline-flex items-center gap-1 text-tertiary font-semibold transition-colors' : 'inline-flex items-center gap-1 text-outline transition-colors'}>
                            <span className="material-symbols-outlined text-[14px]">circle</span> Símbolos (@$!%*)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Legal & Consent Checkboxes */}
                    <div className="flex flex-col gap-space-sm pt-space-xs">
                      <label className="flex items-start gap-space-sm cursor-pointer select-none">
                        <input 
                          className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary-container border-outline-variant bg-surface-container-low cursor-pointer accent-primary" 
                          id="agreeTerms" 
                          required 
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                        />
                        <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                          Concordo com os <a className="text-primary font-semibold underline hover:text-on-primary-fixed-variant" href="#termos">Termos de Uso</a> e a <a className="text-primary font-semibold underline hover:text-on-primary-fixed-variant" href="#privacidade">Política de Privacidade</a> do VaciPet.
                        </span>
                      </label>
                      <label className="flex items-start gap-space-sm cursor-pointer select-none">
                        <input 
                          className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary-container border-outline-variant bg-surface-container-low cursor-pointer accent-primary" 
                          id="optinWhatsapp" 
                          type="checkbox"
                          checked={optinWhatsapp}
                          onChange={(e) => setOptinWhatsapp(e.target.checked)}
                        />
                        <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                          Desejo receber avisos de campanhas gratuitas da prefeitura pelo WhatsApp <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-1.5 py-[2px] rounded-full font-bold ml-1">Recomendado</span>
                        </span>
                      </label>
                    </div>

                    {/* Submit Call to Action */}
                    <div className="flex flex-col gap-space-xs mt-space-sm">
                      <button 
                        className="w-full py-4 px-space-lg rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md font-bold tracking-tight shadow-md hover:shadow-xl transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-80 disabled:cursor-not-allowed" 
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                            <span>A criar a sua carteira...</span>
                          </>
                        ) : (
                          <>
                            <span>Criar Conta &amp; Cadastrar Meu Pet</span>
                            <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
                          </>
                        )}
                      </button>
                      <div className="flex items-center justify-center gap-2 text-outline font-body-sm text-body-sm">
                        <span className="material-symbols-outlined text-[16px] text-tertiary">lock_outline</span>
                        <span>Seus dados são protegidos pela LGPD com criptografia ponta a ponta</span>
                      </div>
                    </div>
                  </form>

                  {/* Card Footer Login Link */}
                  <div className="pt-space-md mt-space-xs text-center border-t border-surface-variant/40">
                    <span className="font-body-md text-body-md text-on-surface-variant">Já possui uma conta? </span>
                    <Link className="font-title-sm text-title-md text-primary font-bold hover:underline" to="/login">Faça login aqui</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    
  );
};

export default RegisterPage;