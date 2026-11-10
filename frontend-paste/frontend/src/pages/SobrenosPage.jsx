
import { Link } from 'react-router-dom';

const SobrenosPage = () => {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
      {/* Header / Navegação */}
      <header className="hidden">
        <div className="h-20 w-full px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-lg">
            <Link className="flex items-center gap-space-sm" to="/">
              <img 
                alt="Logo VaciPet" 
                className="h-8 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida/AEtjO1Wy0vPmCuFzUm-uHUQMy-dbZIjZGf7O8hTZbKqobrVCeuSA2c_DTwYR_Lf3dZfDrDHbVKSghbD8eauvvZEZELUh1YldGTQRx8X150hzj_vBqrbMdh_IezdbF9t2md-xq8ZlbiwqdvAgn0e05ATL9YzLZnZRgBPaJbjb33saSCdaeL-kle3L6rJeWuOxwdI30Jdqx7I3wMO74k8xjq_bNnRYsr0-Ov11sw0C5CdBx4CtHNeprGKPVx1Oe_o" 
              />
              <div className="flex flex-col">
                <span className="font-title-lg text-title-lg text-primary leading-none">VaciPet</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">Saúde &amp; Imunização</span>
              </div>
            </Link>
            <div className="hidden xl:flex items-center bg-surface-container-lowest px-space-md py-space-xs rounded-lg shadow-[0_2px_8px_-2px_rgba(29,78,216,0.04)] w-64 focus-within:ring-2 focus-within:ring-primary-container">
              <span className="material-symbols-outlined text-outline text-lg mr-space-xs">search</span>
              <input 
                className="w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none" 
                placeholder="Buscar vacina, clínica..." 
                type="text" 
              />
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-space-xs">
            <Link className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" to="/">Início</Link>
            <Link className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" to="/carteira">Carteira do Pet</Link>
            <Link className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" to="/pet">Informações do Pet</Link>
            <Link className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" to="/agendamento">Agendar Consulta / Vacina</Link>
            <Link className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" to="/receitas">Receitas &amp; Cuidados</Link>
            <Link className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" to="/loja">Loja &amp; Promoções</Link>
            <Link className="bg-primary-container text-on-primary font-title-md px-space-md py-space-sm rounded-lg font-label-lg text-label-lg transition-all" to="/sobre-nos">Sobre Nós</Link>
          </nav>
          <div className="flex items-center gap-space-md">
            <div className="hidden md:flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-xs rounded-full shadow-[0_2px_8px_-2px_rgba(29,78,216,0.04)] cursor-pointer hover:bg-surface-container-low transition-colors">
              <div className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-label-md text-label-md">P</div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-md text-label-md text-on-surface">Pipoca</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary">100% Imunizado</span>
              </div>
              <span className="material-symbols-outlined text-outline text-base">expand_more</span>
            </div>
            <button aria-label="Notificações" className="relative p-space-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-full transition-all" type="button">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface"></span>
            </button>
            <div className="flex items-center gap-space-xs pl-space-xs">
              <img 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_-2px_rgba(29,78,216,0.08)]" 
                src="https://lh3.googleusercontent.com/aida/AEtjO1U7Nco9dYHkE3NGSoHTQndQzBZC8ZgFd6kJ8hywEGdvaeYYvSfj-oBWwg7f9LTomvoahSA-nsnDyzd8XKiv4Et01Ti8zzXck-YgBQJft-QDy8zjfyx5GgcF1g0TVySD7kvDiBpEkzce7XV1ixBCgVkPbfSZU6cdtidCXFWWVGbjLJQ_jnzq9ruJbbAhnJ2sqCobvdOLPvbbmtkqyhhw3Pru49bJYNgCX75iW0bQt9OKzocn0agDrtJTQhA" 
              />
              <span className="material-symbols-outlined text-outline text-base hidden sm:inline-block">expand_more</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-space-lg bg-surface min-h-[calc(100vh-20rem)]">
        <div className="flex flex-col w-full">
          
          {/* Section 1: Hero */}
          <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-high/60 via-surface to-surface pb-space-xl">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>
            <div className="px-margin pt-space-lg w-full max-w-7xl mx-auto relative z-10">
              <div className="flex items-center gap-space-xs text-on-surface-variant mb-space-md">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Institucional</span>
                <span className="text-xs text-outline">/</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Manifesto &amp; História</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                <div className="lg:col-span-7 flex flex-col gap-space-md">
                  <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest shadow-sm w-fit text-tertiary">
                    <span className="material-symbols-outlined text-base">verified</span>
                    <span className="font-label-md text-label-md tracking-wide">Plataforma Certificada de Imunização Veterinária</span>
                  </div>
                  <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight text-balance">
                    Cuidando da saúde do seu melhor amigo com <span className="text-primary-container">tecnologia</span> e <span className="text-secondary">compromisso sanitário</span>.
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                    O que nasceu como um projeto de puro amor aos animais transformou-se na plataforma de vigilância vacinal mais prática, rastreável e confiável do país. Unimos tutores cuidadosos, médicos veterinários e secretarias municipais de saúde em torno de um único propósito: erradicar zoonoses preveníveis através da imunização pontual.
                  </p>
                  <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                    <Link className="px-space-lg py-space-sm bg-error text-on-error font-label-lg text-label-lg rounded-lg shadow-md hover:shadow-lg hover:bg-error/95 transition-all flex items-center gap-space-xs" to="/pet">
                      <span className="material-symbols-outlined text-xl">app_registration</span>
                      Cadastrar Meu Pet Gratuitamente
                    </Link>
                    <a className="px-space-md py-space-sm bg-surface-container-lowest text-primary font-label-lg text-label-lg rounded-lg shadow-sm hover:bg-surface-container-high transition-all flex items-center gap-space-xs" href="#valores">
                      <span className="material-symbols-outlined text-xl">account_tree</span>
                      Nossos Pilares de Atuação
                    </a>
                  </div>
                  <div className="flex items-center gap-space-lg pt-space-md text-on-surface-variant font-label-sm text-label-sm">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                      Em conformidade com Diretrizes WSAVA
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-lg">gavel</span>
                      Homologação Técnica CRMV/SP
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-5 relative">
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xl bg-surface-container-lowest">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="Veterinária examinando um cão" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKlh2iAOSJCrxUnN_jxgp4U_MVwHr8WhiTTryHXWwNvBgUFzjc0uu1OaebiitwLMKtCBPtg90E10a6KlRhQPNsJZhSx_GahYOsffHTqTVL3xnm1gP3hDhOobe31BAti300FPCx85kV7FTs_o-ZS2Ytxws7wnyY7IGldZSIj9801O4tO-lBg0PsURLfHiCMq3yIW8fktlI_cP7AF22-aa2_6kPnPhgQmf1yxGyZlQxV_sgS497nesOj" 
                    />
                    <div className="absolute bottom-6 left-6 right-6 p-space-md bg-surface-container-lowest/95 backdrop-blur-md rounded-lg shadow-lg flex items-center justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 rounded-full bg-tertiary-fixed-dim/30 flex items-center justify-center text-tertiary">
                          <span className="material-symbols-outlined text-2xl">shield</span>
                        </div>
                        <div>
                          <h4 className="font-title-md text-title-md text-on-surface leading-tight">100% Auditável</h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Lotes rastreados via Anvisa &amp; MAPA</p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-tertiary text-xl">qr_code_2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Statistics Strip */}
          <section className="w-full bg-primary-container text-on-primary py-space-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-container to-secondary opacity-95"></div>
            <div className="px-margin w-full max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
                <div className="flex flex-col items-center gap-space-xs p-space-md">
                  <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center mb-space-xs">
                    <span className="material-symbols-outlined text-2xl text-tertiary-fixed">pets</span>
                  </div>
                  <span className="font-display-lg text-display-lg font-extrabold tracking-tight text-on-primary">+15.000</span>
                  <span className="font-label-lg text-label-lg text-on-primary-container font-medium">Pets Imunizados</span>
                  <span className="font-body-sm text-body-sm text-on-primary-container/80">Cães e gatos com proteção ativa</span>
                </div>
                <div className="flex flex-col items-center gap-space-xs p-space-md">
                  <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center mb-space-xs">
                    <span className="material-symbols-outlined text-2xl text-secondary-fixed">event_available</span>
                  </div>
                  <span className="font-display-lg text-display-lg font-extrabold tracking-tight text-on-primary">99.4%</span>
                  <span className="font-label-lg text-label-lg text-on-primary-container font-medium">Pontualidade Vacinal</span>
                  <span className="font-body-sm text-body-sm text-on-primary-container/80">Avisos automáticos inteligentes</span>
                </div>
                <div className="flex flex-col items-center gap-space-xs p-space-md">
                  <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center mb-space-xs">
                    <span className="material-symbols-outlined text-2xl text-tertiary-fixed-dim">domain</span>
                  </div>
                  <span className="font-display-lg text-display-lg font-extrabold tracking-tight text-on-primary">18</span>
                  <span className="font-label-lg text-label-lg text-on-primary-container font-medium">Postos Municipais</span>
                  <span className="font-body-sm text-body-sm text-on-primary-container/80">Rede integrada em tempo real</span>
                </div>
                <div className="flex flex-col items-center gap-space-xs p-space-md">
                  <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center mb-space-xs">
                    <span className="material-symbols-outlined text-2xl text-secondary-fixed-dim">verified_user</span>
                  </div>
                  <span className="font-display-lg text-display-lg font-extrabold tracking-tight text-on-primary">0</span>
                  <span className="font-label-lg text-label-lg text-on-primary-container font-medium">Casos de Raiva</span>
                  <span className="font-body-sm text-body-sm text-on-primary-container/80">Entre animais cadastrados na base</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Pillars & Values */}
          <section className="w-full py-space-xl bg-surface" id="valores">
            <div className="px-margin w-full max-w-7xl mx-auto">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-space-xl">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold mb-space-xs">Compromisso Ético &amp; Sanitário</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Pilares e Valores Fundamentais</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
                  A vacinação preventiva não é apenas uma responsabilidade individual com o animal doméstico: é um escudo de saúde pública que protege famílias e cidades inteiras.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                      <span className="material-symbols-outlined text-3xl">public</span>
                    </div>
                    <div className="flex items-center gap-space-xs text-xs font-label-sm text-tertiary mb-space-xs">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                      SAÚDE COLETIVA
                    </div>
                    <h3 className="font-title-lg text-title-lg text-on-surface mb-space-xs">Vigilância em Saúde Única</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Integramos saúde animal, humana e ambiental. Atuamos em estreita consonância com centros de controle de zoonoses e vigilância epidemiológica, transformando dados clínicos em barreiras contra surtos de leptospirose, leishmaniose e raiva urbana.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-md border-t-0 bg-surface-container-low/50 p-space-sm rounded-lg flex items-center gap-space-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-base text-primary">diversity_3</span>
                    <span className="font-label-sm text-label-sm">Conceito One Health (OMS/OPAS)</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-lg bg-surface-container flex items-center justify-center text-secondary mb-space-md">
                      <span className="material-symbols-outlined text-3xl">enhanced_encryption</span>
                    </div>
                    <div className="flex items-center gap-space-xs text-xs font-label-sm text-secondary mb-space-xs">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      IMUTABILIDADE &amp; RIGOR
                    </div>
                    <h3 className="font-title-lg text-title-lg text-on-surface mb-space-xs">Transparência e Prontuário Seguro</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Diga adeus a cadernetas de papel extraviadas ou carimbos ilegíveis. Nossa carteira digital é infalsificável, vinculada a registros CRMV ativos de médicos veterinários e equipada com QR Code criptografado para conferência policial, viagens aéreas e hospedagem.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-md border-t-0 bg-surface-container-low/50 p-space-sm rounded-lg flex items-center gap-space-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-base text-secondary">verified</span>
                    <span className="font-label-sm text-label-sm">Certificado Digital Veterinário</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-lg bg-surface-container flex items-center justify-center text-error mb-space-md">
                      <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                    </div>
                    <div className="flex items-center gap-space-xs text-xs font-label-sm text-error mb-space-xs">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      INCLUSÃO SOCIAL
                    </div>
                    <h3 className="font-title-lg text-title-lg text-on-surface mb-space-xs">Acesso Democrático à Imunização</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Saúde veterinária de ponta não deve ser um privilégio de poucos. Oferecemos suporte irrestrito a campanhas públicas gratuitas de vacinação antirrábica, emitindo notificações geolocalizadas para comunidades periféricas e tutores de baixa renda.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-md border-t-0 bg-surface-container-low/50 p-space-sm rounded-lg flex items-center gap-space-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-base text-error">campaign</span>
                    <span className="font-label-sm text-label-sm">Mapeamento de Campanhas Gratuitas</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Timeline */}
          <section className="w-full py-space-xl bg-surface-container-low">
            <div className="px-margin w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                <div className="lg:col-span-5 relative">
                  <div className="w-full rounded-xl overflow-hidden shadow-lg aspect-square bg-surface-container-lowest">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="Laboratório" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4seCONBVYEechne2i0MV_KQpPuw8WMaly_EIhVxkrbPb1m7E3uaNixcMKYRSjTsDyP4clX5O9x-bjZAR4EnPDmGXxvNKcHOCdn7ar5PxJ7kKNtonaU73gM6MTinEfDFdWiH9KLJqU7R6OXnOPhjnZLb5BjBsBPnSKQfG_KUdW19AWjCvV-AiKZ6pBuk8jG-kvfMgOCTwpxqxLeMC8qV4cdk4JnVj0pI7Tp21iREUAHf4da4kLAjPU" 
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 p-space-md bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl max-w-xs hidden sm:block">
                    <p className="font-label-md text-label-md text-tertiary-fixed mb-space-xs uppercase tracking-wider">Missão Institucional</p>
                    <p className="font-body-sm text-body-sm">
                      "Garantir que nenhum animal sofra por enfermidades evitáveis, conectando tecnologia e afeto na salvaguarda da vida."
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-7 flex flex-col gap-space-lg pl-0 lg:pl-gutter">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Nossa Trajetória</span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">De um desafio em abrigo para a referência nacional em vacinas</h2>
                  </div>
                  <div className="flex flex-col gap-space-md relative">
                    <div className="flex gap-space-md">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">01</div>
                        <div className="w-0.5 h-full bg-outline-variant my-1"></div>
                      </div>
                      <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm w-full">
                        <span className="font-label-sm text-label-sm text-primary font-semibold">2021 • O Resgate e a Inquietação</span>
                        <h4 className="font-title-md text-title-md text-on-surface mt-1">A perda evitável de registros em papel</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Durante uma campanha de resgate emergencial, mais de 200 cães perderam seus históricos vacinais em enchentes. Ficou evidente a urgência de uma solução em nuvem perene.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-space-md">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">02</div>
                        <div className="w-0.5 h-full bg-outline-variant my-1"></div>
                      </div>
                      <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm w-full">
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">2023 • Integração Sanitária com Municípios</span>
                        <h4 className="font-title-md text-title-md text-on-surface mt-1">Adoção pela primeira rede pública de zoonoses</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Piloto com o município de Limoeiro demonstrou que a digitalização elevou em 42% a taxa de retorno para a 2ª e 3ª doses de vacinas polivalentes (V8/V10).
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-space-md">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-xs">03</div>
                      </div>
                      <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm w-full">
                        <span className="font-label-sm text-label-sm text-tertiary font-semibold">Hoje • Rede Nacional VaciPet</span>
                        <h4 className="font-title-md text-title-md text-on-surface mt-1">Mais de 15.000 pets blindados contra epidemias</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          Plataforma completa com aplicativo de tutor, prontuário veterinário autenticado e mapa de campanhas públicas em tempo real.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Equipe */}
          <section className="w-full py-space-xl bg-surface mb-20">
            <div className="px-margin w-full max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Corpo Técnico</span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Nossa Equipe &amp; Conselho Consultivo</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-xs">
                    Liderados por médicos veterinários com sólida experiência em epidemiologia, infectologia e medicina veterinária preventiva.
                  </p>
                </div>
                <div className="flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full">
                  <span className="material-symbols-outlined text-primary text-base">verified</span>
                  <span className="font-label-md text-label-md text-on-surface">Rigor Clínico e Ético CFMV</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="h-64 overflow-hidden relative bg-surface-container">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      alt="Dr Leandro Jose Medeiros" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaKgl-Z3kjxTiriHlRECiauItfDC2s8eO-8iX6YxYsPKPuOrF_OcJKq4AY-9KcuftCBldOl5kcPEVKFolANuvAQPLYyz7nUsP_zhM9O0GrMoU6j3_4YoXVpgrHyLPZmi_DDyZRv7irkscq7GSElNNUzpFwqjFjR96vApXft5us3jr557_yxt7paUxyCCvlaDWxVza6ow97Yzj9RHUgKFDWvgCwqurkXHycVL2PT3ipdyMeJRdA2TJ3" 
                    />
                    <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-space-sm py-0.5 rounded-full text-xs font-label-sm text-primary">
                      Diretor Clínico
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col gap-space-xs">
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface">Dr. Leandro J. Medeiros</h3>
                      <p className="font-label-sm text-label-sm text-primary">CRMV/SP 48.912 • Imunologista</p>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                      Doutor em Medicina Veterinária Preventiva (FMVZ-USP). Mais de 18 anos de experiência em gestão de programas de vacinação e controle epidemiológico de zoonoses.
                    </p>
                    <div className="flex items-center gap-space-xs pt-space-xs text-outline text-sm">
                      <span className="material-symbols-outlined text-base">mail</span>
                      <span className="font-label-sm text-label-sm">leandro.medeiros@vacipet.med.br</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="h-64 overflow-hidden relative bg-surface-container">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      alt="Dra. Marina Duarte" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKlh2iAOSJCrxUnN_jxgp4U_MVwHr8WhiTTryHXWwNvBgUFzjc0uu1OaebiitwLMKtCBPtg90E10a6KlRhQPNsJZhSx_GahYOsffHTqTVL3xnm1gP3hDhOobe31BAti300FPCx85kV7FTs_o-ZS2Ytxws7wnyY7IGldZSIj9801O4tO-lBg0PsURLfHiCMq3yIW8fktlI_cP7AF22-aa2_6kPnPhgQmf1yxGyZlQxV_sgS497nesOj" 
                    />
                    <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-space-sm py-0.5 rounded-full text-xs font-label-sm text-secondary">
                      Infectologista
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col gap-space-xs">
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface">Dra. Marina Duarte</h3>
                      <p className="font-label-sm text-label-sm text-secondary">CRMV/SP 52.104 • Epidemiologia</p>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                      Especialista em saúde pública animal e mapeamento de focos de contágio em áreas urbanas de alta densidade populacional.
                    </p>
                    <div className="flex items-center gap-space-xs pt-space-xs text-outline text-sm">
                      <span className="material-symbols-outlined text-base">mail</span>
                      <span className="font-label-sm text-label-sm">marina.duarte@vacipet.med.br</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="h-64 overflow-hidden relative bg-surface-container">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      alt="Eng. Roberto Silveira" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4seCONBVYEechne2i0MV_KQpPuw8WMaly_EIhVxkrbPb1m7E3uaNixcMKYRSjTsDyP4clX5O9x-bjZAR4EnPDmGXxvNKcHOCdn7ar5PxJ7kKNtonaU73gM6MTinEfDFdWiH9KLJqU7R6OXnOPhjnZLb5BjBsBPnSKQfG_KUdW19AWjCvV-AiKZ6pBuk8jG-kvfMgOCTwpxqxLeMC8qV4cdk4JnVj0pI7Tp21iREUAHf4da4kLAjPU" 
                    />
                    <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-space-sm py-0.5 rounded-full text-xs font-label-sm text-tertiary">
                      Líder de Tecnologia
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col gap-space-xs">
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface">Eng. Roberto Silveira</h3>
                      <p className="font-label-sm text-label-sm text-tertiary">Arquiteto de Software &amp; Segurança</p>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                      Engenheiro de dados com foco na integridade e rastreabilidade de dados de vacinação e integração segura com redes municipais.
                    </p>
                    <div className="flex items-center gap-space-xs pt-space-xs text-outline text-sm">
                      <span className="material-symbols-outlined text-base">mail</span>
                      <span className="font-label-sm text-label-sm">roberto.silveira@vacipet.med.br</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default SobrenosPage;