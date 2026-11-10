import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [method, setMethod] = useState('email'); // 'email' | 'whatsapp'
  const [identifier, setIdentifier] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Alternar método de envio (E-mail / WhatsApp)
  const handleSwitchMethod = (newMethod) => {
    if (newMethod === method) return;
    setMethod(newMethod);
    setIdentifier('');
  };

  // Submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Textos dinâmicos baseados no método escolhido
  const isEmail = method === 'email';
  const labelText = isEmail ? 'E-mail cadastrado ou CPF do tutor' : 'Número de Celular com DDD (WhatsApp)';
  const placeholderText = isEmail ? 'nome@exemplo.com.br ou 000.000.000-00' : '(11) 98765-4321 ou CPF do tutor';
  const inputIcon = isEmail ? 'alternate_email' : 'smartphone';
  const helperText = isEmail
    ? 'Digite o e-mail verificado da sua carteira ou os 11 dígitos do seu CPF.'
    : 'Informe o número com DDD cadastrado na sua conta.';

  const getButtonText = () => {
    if (isSubmitted) return 'Recuperação indisponível';
    return 'Verificar opções de recuperação';
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col justify-center items-center">
      <main className="w-full max-w-7xl mx-auto px-margin bg-surface">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-5xl mx-auto py-space-lg md:py-space-xl">
            
            {/* Link de Retorno */}
            <div className="mb-space-lg">
              <Link
                className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg group" 
                to="/login"
              >
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1">arrow_back</span>
                <span>Voltar para o Login</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              
              {/* COLUNA ESQUERDA: Formulário Principal (7 colunas) */}
              <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary-container"></div>
                
                {/* Header do Formulário */}
                <div className="flex items-center gap-space-md mb-space-lg">
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-surface-container-low text-primary shadow-sm">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
                      <circle className="text-surface-container-high" cx="28" cy="28" fill="none" r="24" stroke="currentColor" strokeWidth="2.5"></circle>
                      <circle className="text-primary-container" cx="28" cy="28" fill="none" r="24" stroke="currentColor" strokeDasharray="150" strokeDashoffset="40" strokeWidth="2.5"></circle>
                    </svg>
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock_reset</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">VaciPet • Acesso Seguro</span>
                    <h1 className="font-headline-md text-headline-md text-on-surface">Recuperar Acesso à sua Conta</h1>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                  A recuperação automática por e-mail ou WhatsApp ainda não está configurada neste ambiente.
                </p>

                {/* Tabs de Seleção de Método */}
                <div className="p-space-xs bg-surface-container-low rounded-lg grid grid-cols-2 gap-space-xs mb-space-lg">
                  <button
                    type="button"
                    onClick={() => handleSwitchMethod('email')}
                    className={`flex items-center justify-center gap-space-xs py-space-sm px-space-md rounded-lg font-label-md text-label-md transition-all ${
                      isEmail
                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    <span>Receber link por E-mail</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSwitchMethod('whatsapp')}
                    className={`flex items-center justify-center gap-space-xs py-space-sm px-space-md rounded-lg font-label-md text-label-md transition-all ${
                      !isEmail
                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>WhatsApp / SMS</span>
                  </button>
                </div>

                {/* Formulário */}
                <form className="space-y-space-md" onSubmit={handleSubmit}>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs" htmlFor="identifier-input">
                      {labelText}
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                        {inputIcon}
                      </span>
                      <input
                        id="identifier-input"
                        name="identifier"
                        type={isEmail ? 'text' : 'tel'}
                        className="w-full pl-11 pr-space-md py-3 bg-surface-container-lowest text-on-surface placeholder:text-outline-variant font-body-md text-body-md rounded-lg outline-none transition-all shadow-sm focus:bg-surface-bright focus:shadow-md"
                        placeholder={placeholderText}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                      />
                    </div>
                    <p className="mt-1.5 font-body-sm text-body-sm text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">info</span>
                      <span>{helperText}</span>
                    </p>
                  </div>

                  {/* Caixa de Aviso de Validade */}
                  <div className="p-space-md bg-surface-container-low rounded-lg flex items-start gap-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">verified_user</span>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      Nenhuma mensagem será enviada até que um provedor de e-mail ou SMS seja configurado no servidor.
                    </div>
                  </div>

                  {/* Botão de Envio */}
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="w-full py-3.5 px-space-lg rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.005] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitted ? (
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    ) : (
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    )}
                    <span>{getButtonText()}</span>
                  </button>
                </form>

                {/* Painel de Feedback / Confirmação */}
                {isSubmitted && (
                  <div role="status" className="mt-space-lg rounded-lg border border-amber-300 bg-amber-50 p-space-md">
                    <p className="font-title-md text-title-md font-bold text-amber-900">Nenhum link ou código foi enviado.</p>
                    <p className="mt-1 font-body-sm text-body-sm text-amber-900">Configure um provedor de e-mail ou SMS no servidor para habilitar a recuperação segura.</p>
                  </div>
                )}

                {/* Rodapé do Form */}
                <div className="mt-space-lg pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
                  <div className="font-body-sm text-body-sm text-on-surface-variant text-center sm:text-left">
                    Lembrou sua senha?
                    <Link className="font-label-md text-label-md text-primary font-bold hover:underline ml-1" to="/login">
                      Fazer Login
                    </Link>
                  </div>
                  <a className="font-body-sm text-body-sm text-outline hover:text-on-surface text-center" href="#faq">
                    Dúvidas frequentes
                  </a>
                </div>
              </div>

              {/* COLUNA DIREITA: Informações e Suporte (5 colunas) */}
              <div className="lg:col-span-5 space-y-space-md">
                
                {/* Avisos Importantes */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm relative overflow-hidden">
                  <div className="flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-lg bg-error-container text-error flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">emergency</span>
                    </div>
                    <div>
                      <h2 className="font-title-md text-title-md text-on-surface mb-1">Avisos Importantes</h2>
                      <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                        <li className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-error text-[16px] shrink-0 mt-0.5">priority_high</span>
                          <span><strong>Não recebeu a mensagem?</strong> Verifique sua pasta de Spam/Lixo Eletrônico ou confirme o número de telefone informado.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-outline text-[16px] shrink-0 mt-0.5">phone_disabled</span>
                          <span>Perdeu o número do celular ou não tem mais acesso ao e-mail? Solicite verificação presencial na sua clínica credenciada.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Proteção LGPD */}
                <div className="bg-surface-container rounded-xl p-space-lg shadow-sm">
                  <div className="flex items-center gap-space-sm mb-space-sm">
                    <span className="material-symbols-outlined text-tertiary text-[24px]">verified</span>
                    <span className="font-title-md text-title-md text-on-surface">Proteção de Dados Sanitários LGPD</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    Seus dados veterinários, microchips e histórico vacinal permanecem criptografados com chave ponta-a-ponta e preservados de forma inviolável durante qualquer processo de recuperação de credenciais.
                  </p>
                  <div className="flex items-center justify-between pt-space-xs font-label-sm text-label-sm text-outline">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-tertiary">check</span> Certificação CFMV / ICP-Brasil
                    </span>
                    <span className="font-mono text-outline-variant">SHA-256</span>
                  </div>
                </div>

                {/* Banner de Suporte */}
                <div className="rounded-xl overflow-hidden shadow-sm bg-surface-container-low relative group">
                  <div 
                    className="h-36 w-full bg-cover bg-center" 
                    style={{ 
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAHhxaREs-wuHqo3dv7r5WNze1l0vlkPz4rgjccO36Py0HIGuUS4vsmkARxxGAalGEVVyy8n2nSKTVfc9f8fUfi-wPswDhsFQoFdVstEvP4p99BhSC-ZNKcbtZ_XryEayevyAV-rMUcdXQ5PsQmgbK0G_f55j5OPWpP1-VQSHgz-8xc-77gWkuJuY3CdZO7RD6yP6PKc5tZ6gjA_dKjd8nqrH8akrv0R6PjbkPzZGWK87kRhLc_gy7t')" 
                    }}
                  ></div>
                  <div className="p-space-md bg-surface-container-lowest">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Suporte ao Cidadão VaciPet</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Atendimento a tutores em dias úteis das 08h às 19h</p>
                      </div>
                      <a className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary transition-colors" href="#suporte">
                        <span className="material-symbols-outlined text-[20px]">support_agent</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Rodapé Global */}
            <div className="mt-space-xl text-center">
              <div className="flex flex-wrap items-center justify-center gap-space-md text-outline font-label-sm text-label-sm">
                <span>© 2026 VaciPet Nacional • Sistema Integrado de Saúde Animal</span>
                <span>•</span>
                <a className="hover:text-primary transition-colors" href="#termos">Termos de Uso</a>
                <span>•</span>
                <a className="hover:text-primary transition-colors" href="#privacidade">Política de Privacidade Sanitária</a>
                <span>•</span>
                <a className="hover:text-primary transition-colors" href="#ouvidoria">Ouvidoria Geral</a>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;