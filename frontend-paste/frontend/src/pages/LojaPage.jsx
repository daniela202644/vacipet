
const LojaPage = () => {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(29,78,216,0.06)]">
        <div className="h-20 w-full px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-lg">
            <a className="flex items-center gap-space-sm" data-path="inicio" href="#">
              <img alt="Logo VaciPet" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Wy0vPmCuFzUm-uHUQMy-dbZIjZGf7O8hTZbKqobrVCeuSA2c_DTwYR_Lf3dZfDrDHbVKSghbD8eauvvZEZELUh1YldGTQRx8X150hzj_vBqrbMdh_IezdbF9t2md-xq8ZlbiwqdvAgn0e05ATL9YzLZnZRgBPaJbjb33saSCdaeL-kle3L6rJeWuOxwdI30Jdqx7I3wMO74k8xjq_bNnRYsr0-Ov11sw0C5CdBx4CtHNeprGKPVx1Oe_o" />
              <div className="flex flex-col">
                <span className="font-title-lg text-title-lg text-primary leading-none">VaciPet</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">Saúde &amp; Imunização</span>
              </div>
            </a>
            <div className="hidden xl:flex items-center bg-surface-container-lowest px-space-md py-space-xs rounded-lg shadow-[0_2px_8px_-2px_rgba(29,78,216,0.04)] w-64 focus-within:ring-2 focus-within:ring-primary-container">
              <span className="material-symbols-outlined text-outline text-lg mr-space-xs">search</span>
              <input className="w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none" placeholder="Buscar vacina, clínica..." type="text" />
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary font-title-md rounded-lg">
            <a className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" href="#">Início</a>
            <a className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" href="#">Carteira do Pet</a>
            <a className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" href="#">Informações do Pet</a>
            <a className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" href="#">Agendar Consulta / Vacina</a>
            <a className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" href="#">Receitas &amp; Cuidados</a>
            <a className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg bg-primary-container text-on-primary transition-all" href="#">Loja &amp; Promoções</a>
            <a className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" href="#">Perguntas Frequentes</a>
            <a className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" href="#">Sobre Nós</a>
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
              <img alt="Profile" className="w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_-2px_rgba(29,78,216,0.08)]" src="https://lh3.googleusercontent.com/aida/AEtjO1U7Nco9dYHkE3NGSoHTQndQzBZC8ZgFd6kJ8hywEGdvaeYYvSfj-oBWwg7f9LTomvoahSA-nsnDyzd8XKiv4Et01Ti8zzXck-YgBQJft-QDy8zjfyx5GgcF1g0TVySD7kvDiBpEkzce7XV1ixBCgVkPbfSZU6cdtidCXFWWVGbjLJQ_jnzq9ruJbbAhnJ2sqCobvdOLPvbbmtkqyhhw3Pru49bJYNgCX75iW0bQt9OKzocn0agDrtJTQhA" />
              <span className="material-symbols-outlined text-outline text-base hidden sm:inline-block">expand_more</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
        <div className="flex flex-col w-full">
          {/* Dynamic Notification / Sync Ticker */}
          <div className="w-full bg-surface-container-high px-margin py-space-xs flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-xs">sync</span>
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Sincronizado com o prontuário de <strong className="text-on-surface font-title-sm">Pipoca</strong>: 
                <span className="text-tertiary font-label-md">Prevenção contra ectoparasitas vence em 12 dias.</span>
              </p>
            </div>
            <div className="hidden md:flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm">
              <span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-sm text-primary">local_shipping</span> Entrega Expressa Veterinária</span>
              <span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-sm text-tertiary">verified_user</span> 100% Autêntico com Selo MAPA</span>
            </div>
          </div>

          <div className="w-full px-margin py-space-lg flex flex-col gap-space-xl">
            {/* Mega Promo Spotlight Banner */}
            <section className="relative w-full rounded-xl p-1 shadow-md overflow-hidden text-white" style={{ backgroundColor: '#071f3f' }}>
              <div className="w-full h-full rounded-lg border-2 border-dashed border-error/50 bg-surface-container-lowest/80 backdrop-blur-md p-space-lg lg:p-space-xl flex flex-col lg:flex-row items-center justify-between gap-space-xl relative">
                <div className="flex flex-col gap-space-md max-w-2xl z-10">
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-error text-on-error font-label-sm text-label-sm shadow-sm animate-pulse">
                      <span className="material-symbols-outlined text-sm">local_fire_department</span> MELHOR PREÇO DO ANO!!!
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-sm">local_shipping</span> Frete Grátis para Limoeiro
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                      Garantia Nutricional CFMV
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight leading-none">
                      RAÇÃO PEDIGREE <span className="text-primary">CARNE &amp; FRANGO</span>
                    </h1>
                    <p className="font-headline-sm text-headline-sm text-on-surface-variant font-medium">
                      Saco Econômico Familiar de 10,1 KG • Cães Adultos Nutrição Completa
                    </p>
                  </div>
                  <div className="flex items-baseline gap-space-md pt-space-xs">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-outline line-through">De R$ 112,49</span>
                      <div className="flex items-center gap-space-xs">
                        <span className="font-label-md text-label-md text-error font-bold">R$</span>
                        <span className="font-display-lg text-display-lg text-error font-extrabold tracking-tight">89,99</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-error-container text-on-error-container font-headline-sm text-headline-sm font-black">
                      -20% OFF
                    </span>
                    <div className="hidden sm:flex flex-col pl-space-sm text-on-surface-variant font-body-sm text-body-sm">
                      <span>Em até 3x de R$ 30,00 sem juros</span>
                      <span className="text-tertiary font-label-sm">Economia líquida de R$ 22,50</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                    <button className="px-space-xl py-3 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-lg hover:shadow-primary-container/40 hover:bg-primary transition-all flex items-center gap-space-sm" type="button">
                      <span className="material-symbols-outlined text-lg">shopping_cart_checkout</span> Comprar Agora
                    </button>
                    <button className="px-space-lg py-3 rounded-lg bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-variant transition-all flex items-center gap-space-xs" type="button">
                      <span className="material-symbols-outlined text-base">bookmark_add</span> Salvar na Dieta do Pet
                    </button>
                  </div>
                </div>
                <div className="relative w-full lg:w-96 flex-shrink-0 flex items-center justify-center">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-primary-fixed-dim/40 via-secondary-fixed/30 to-error-container/30 rounded-full blur-2xl"></div>
                  <div className="relative w-72 h-80 rounded-xl bg-surface-container-lowest p-space-md shadow-xl flex flex-col items-center justify-center text-center">
                    <img className="w-full h-56 object-contain rounded-lg" data-alt="Commercial studio product photography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJXwOsJxYVvzwz0SqubCzaAsbg7ea_wqGwTREBravOaUqvy4cdu27nc__NeU1sI7ztCK5ijgpRw67U0RcLINUvmybHh9Is_5gyoE_8bqTPKURADN3VfJIUIP9dNk63iAcfQD_dxrNWgRDg-7POXg11beLZ2rpD4ETKQEWMZ-PJl1YoRxk0aQ-Iygkg0oR1AfnjgdxrEb8b1bOdjH3LLJikBgNBXl6gqEQkyghbWbviTD73tFGcGvvL" />
                    <div className="mt-space-xs flex items-center gap-space-xs bg-surface-container-low px-space-md py-1 rounded-full text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-tertiary text-sm">schedule</span> Estoque limitado: restam 14 sacos
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Categories Navigation Bar */}
            <section className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Farmácia &amp; Cuidados</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Categorias Veterinárias</h2>
                </div>
                <span className="text-on-surface-variant font-body-sm text-body-sm hidden sm:inline-block">Produtos prescritos com validação de receita VaciPet</span>
              </div>
              <div className="flex items-center gap-space-sm overflow-x-auto pb-space-xs scrollbar-none">
                <button className="flex-shrink-0 px-space-lg py-space-sm rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm flex items-center gap-space-xs" type="button">
                  <span className="material-symbols-outlined text-base">apps</span> Todos os Produtos
                </button>
                <button className="flex-shrink-0 px-space-lg py-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg shadow-sm transition-all flex items-center gap-space-xs" type="button">
                  <span className="material-symbols-outlined text-base text-primary">set_meal</span> Rações Secas e Úmidas
                </button>
                <button className="flex-shrink-0 px-space-lg py-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg shadow-sm transition-all flex items-center gap-space-xs" type="button">
                  <span className="material-symbols-outlined text-base text-tertiary">pest_control</span> Antipulgas &amp; Carrapatos
                </button>
                <button className="flex-shrink-0 px-space-lg py-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg shadow-sm transition-all flex items-center gap-space-xs" type="button">
                  <span className="material-symbols-outlined text-base text-secondary">medication_liquid</span> Vermífugos
                </button>
                <button className="flex-shrink-0 px-space-lg py-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg shadow-sm transition-all flex items-center gap-space-xs" type="button">
                  <span className="material-symbols-outlined text-base text-outline">soap</span> Higiene &amp; Acessórios
                </button>
              </div>
            </section>

            {/* Main Highlighted Products Grid */}
            <section className="flex flex-col gap-space-lg">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
                <div>
                  <div className="inline-flex items-center gap-space-xs bg-primary-fixed text-on-primary-fixed px-space-sm py-0.5 rounded-full font-label-sm text-label-sm mb-1">
                    <span className="material-symbols-outlined text-xs">stars</span> Exclusivo Tutores VaciPet
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Produtos em Destaque</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">Descontos automáticos integrados à ficha clínica e histórico de vacinação do seu cão.</p>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Filtrando para porte: <strong className="text-on-surface">Médio (Pipoca)</strong></span>
                  <button className="p-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors" title="Modificar Filtro">
                    <span className="material-symbols-outlined text-base">tune</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-gutter">
                {/* Card 1 */}
                <div className="group relative rounded-xl bg-surface-container-lowest p-space-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div className="absolute -top-3 left-4 bg-tertiary-container text-on-tertiary-container px-space-sm py-1 rounded-full font-label-sm text-label-sm shadow flex items-center gap-1 z-10">
                    <span className="material-symbols-outlined text-xs">pets</span> Recomendado para Pipoca
                  </div>
                  <div>
                    <div className="relative w-full h-44 rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center mt-2">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbkogvUnITg1_e74bcwDKfcb8J4bCD19A0ShUwSBXKh26ec5ksupfNFv9Sg4EWlMXLtSXdOMZLn9au3JLBarPVcLjCSZaSRygYTcdIheXz20DxZBRJz5xIHniJ6YQWECDTnUXUA6LxWKON94XHKrkrYfLcbo_1QAGz_tRt7Yo6FWWGSLLlAuShgsfHXVGj_hWLA1r1qknp-tCfrsQ79wMhiXWCpZ10BGcaa0IHb8sOJh0CfYM8sUEh" />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold shadow">-15% OFF</span>
                    </div>
                    <div className="mt-space-md flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">Boehringer Ingelheim</span>
                      <h3 className="font-title-md text-title-md text-on-surface line-clamp-2 group-hover:text-primary transition-colors">NexGard Spectra 7,5 a 15kg (Mastigável)</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Tratamento mensal contra pulgas, carrapatos, sarna e vermes intestinais.</p>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm bg-surface-container-lowest">
                    <div className="flex items-baseline gap-space-xs">
                      <span className="font-body-sm text-body-sm text-outline line-through">R$ 138,90</span>
                      <span className="font-title-lg text-title-lg text-error font-bold">R$ 118,06</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-tertiary">Preço especial para pet vacinado</span>
                    <button className="w-full mt-space-sm py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary shadow hover:shadow-primary-container/30 transition-all flex items-center justify-center gap-1" type="button">
                      <span className="material-symbols-outlined text-base">add_shopping_cart</span> Adicionar
                    </button>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative rounded-xl bg-surface-container-lowest p-space-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="relative w-full h-44 rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByGJiZ3i-HpioyqpjD_witk71v2ts6rH60K4K5PqBiNI_lZNaYoqgAr-71dE9dPSdGN5DYY5hTmjUt8YIk3vgu7s9uIYUu_GY1rkyxOyqHuWiYFhjI1UBwhG_N8-nUzJtgG-Der_UXc_nwVQMRpHZmz6CBCizEH_0yz_YgliKf7OR4SoDhSG3FCDZLl6bxc1wJd8_T23xgVXVoGYAELWkjk6Gv3BAV31343Lg2TaWh7MjrB9OC7vQb" />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold shadow">-10% OFF</span>
                    </div>
                    <div className="mt-space-md flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">MSD Saúde Animal</span>
                      <h3 className="font-title-md text-title-md text-on-surface line-clamp-2 group-hover:text-primary transition-colors">Bravecto Mastigável 3 Meses Cães</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Proteção contínua e rápida por até 12 semanas inteiras com dose única.</p>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm">
                    <div className="flex items-baseline gap-space-xs">
                      <span className="font-body-sm text-body-sm text-outline line-through">R$ 249,00</span>
                      <span className="font-title-lg text-title-lg text-error font-bold">R$ 224,10</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Até 4x sem juros no cartão</span>
                    <button className="w-full mt-space-sm py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary shadow hover:shadow-primary-container/30 transition-all flex items-center justify-center gap-1" type="button">
                      <span className="material-symbols-outlined text-base">add_shopping_cart</span> Adicionar
                    </button>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group relative rounded-xl bg-surface-container-lowest p-space-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="relative w-full h-44 rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByPm_rYJDw7GKJhsnNFIOxRH6hZkapuOAe0HxSMzDeUzDjG0ZtbhPndsLqBcTng-0SwwnoBkQ0mwSSr4sH27zXJaoAXOFRkSLNX1qj-IeyoxWOps08BUxkuPO2mrMZLnkC980tfMKGhtVxRDms9acz0ScbBYZkh15UZMsJKxWSs9ZwZcEmYFEtc_pwPB1ln-HrmqtSOxlrp4YoPx7IT2RGEyPP3-5JlAZTT4P5cc3gi-wHt0uAOR_a" />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Essencial</span>
                    </div>
                    <div className="mt-space-md flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">Vetoquinol</span>
                      <h3 className="font-title-md text-title-md text-on-surface line-clamp-2 group-hover:text-primary transition-colors">Drontal Plus Cães até 10kg Sabor Carne</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Vermífugo amplo espectro contra giárdia, nematódeos e cestódeos.</p>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm">
                    <div className="flex items-baseline gap-space-xs">
                      <span className="font-title-lg text-title-lg text-on-surface font-bold">R$ 42,90</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">(4 comprimidos)</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-tertiary">Dose semestral indicada</span>
                    <button className="w-full mt-space-sm py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary shadow hover:shadow-primary-container/30 transition-all flex items-center justify-center gap-1" type="button">
                      <span className="material-symbols-outlined text-base">add_shopping_cart</span> Adicionar
                    </button>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="group relative rounded-xl bg-surface-container-lowest p-space-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="relative w-full h-44 rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9kNxJZDoaqBwNlYBUKmtPu61nhTWP0TN7rcX89jiVEQ7WfcN7mPmjsCj0NKHN_Ka8AjoJ6MbQL36Os4nnGN4PXb2oPI3T-3vusOrZd2QAgfZeZGLjJz_SQwE2dJikqmSVIFbj1SzH8-MRq6L_ed2xpoDVCiu_hyvHjxDWXf5EH4CtxZkd49fll2QXEExk-WEA_jzUY1WYPb9cMVdQCktWKaPAuKkDTiWkeBKangCiYAqOVQWm7gHm" />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold shadow">-18% OFF</span>
                    </div>
                    <div className="mt-space-md flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">Premier Pet</span>
                      <h3 className="font-title-md text-title-md text-on-surface line-clamp-2 group-hover:text-primary transition-colors">PremieR Raças Específicas Golden 12kg</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Fórmula para suporte articular, pelagem brilhante e controle de calorias.</p>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm">
                    <div className="flex items-baseline gap-space-xs">
                      <span className="font-body-sm text-body-sm text-outline line-through">R$ 299,90</span>
                      <span className="font-title-lg text-title-lg text-error font-bold">R$ 245,90</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-tertiary">Frete Grátis com Clube VaciPet</span>
                    <button className="w-full mt-space-sm py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary shadow hover:shadow-primary-container/30 transition-all flex items-center justify-center gap-1" type="button">
                      <span className="material-symbols-outlined text-base">add_shopping_cart</span> Adicionar
                    </button>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="group relative rounded-xl bg-surface-container-lowest p-space-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="relative w-full h-44 rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBig2Meu-vxGR-e7tCVY3Nvw9WP9w8abjD-JYpZz0CWDwEnN4UnMkp3B3VgOysLunBFOlyakHpiNfWQcSzMstUNFah2dR-o4TAEfoBwNQ35_XfOgyTxVZbVTnJoz3LwWh8c_C3F-dHsQ21MM5dBcs_1Qkv4j9lk7dedEDY_aUu6KOPsmWojgF9ZML-4K5XUkQTWlmQ2kazOygOOsAjiSO1PszSytS-eH91JoL1XMFUK88OyEw7QtE_j" />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">Dermatológico</span>
                    </div>
                    <div className="mt-space-md flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">Vetnil Dermacare</span>
                      <h3 className="font-title-md text-title-md text-on-surface line-clamp-2 group-hover:text-primary transition-colors">Shampoo Clorexidina Hipoalergênico 500ml</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Ação antisséptica tópica para peles sensíveis ou controle de dermatites.</p>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm">
                    <div className="flex items-baseline gap-space-xs">
                      <span className="font-title-lg text-title-lg text-on-surface font-bold">R$ 38,50</span>
                      <span className="font-body-sm text-body-sm text-outline">/ frasco</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Pronta entrega em Limoeiro</span>
                    <button className="w-full mt-space-sm py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary shadow hover:shadow-primary-container/30 transition-all flex items-center justify-center gap-1" type="button">
                      <span className="material-symbols-outlined text-base">add_shopping_cart</span> Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Subscription Program Banner */}
            <section className="w-full rounded-2xl bg-gradient-to-br from-primary to-secondary p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-xl shadow-lg mt-space-md">
              <div className="flex flex-col gap-space-md text-on-primary max-w-2xl">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-4xl">local_mall</span>
                  <h2 className="font-display-sm text-[28px] leading-tight md:text-headline-lg font-bold">Clube de Assinatura VaciPet</h2>
                </div>
                <p className="font-body-lg text-body-lg text-primary-fixed">Receba os produtos essenciais do <strong className="text-on-primary">Pipoca</strong> todos os meses no conforto da sua casa. Garanta 15% de desconto fixo e frete grátis permanente em todas as entregas recorrentes.</p>
                <div className="flex flex-col sm:flex-row gap-space-md font-label-md text-label-md mt-2">
                   <div className="flex items-center gap-2 bg-primary-fixed/20 px-3 py-1.5 rounded-lg">
                     <span className="material-symbols-outlined text-tertiary-fixed">check_circle</span> Ração nunca mais vai faltar
                   </div>
                   <div className="flex items-center gap-2 bg-primary-fixed/20 px-3 py-1.5 rounded-lg">
                     <span className="material-symbols-outlined text-tertiary-fixed">check_circle</span> Antipulgas 100% sincronizado
                   </div>
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                 <button className="w-full md:w-auto px-space-xl py-4 rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-md hover:bg-surface hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                    Quero Assinar Agora
                    <span className="material-symbols-outlined">arrow_forward</span>
                 </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full bg-surface-container-lowest py-space-xl px-margin mt-12 border-t border-outline-variant/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-space-md">
          <div className="flex flex-col md:flex-row items-center gap-space-sm md:gap-space-lg">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">pets</span>
              <span className="font-title-lg text-title-lg text-on-surface leading-none">VaciPet</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">© 2026. Todos os direitos reservados.</span>
          </div>
          <div className="flex gap-space-md font-label-md text-label-md text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LojaPage;