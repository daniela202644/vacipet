import { useState } from 'react';

const RecipesPage = () => {
  // Estado para busca por texto e categoria selecionada
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Estado para controlo do Modal de Preparo
  const [activeRecipeModal, setActiveRecipeModal] = useState(null);

  // Lista de receitas dinâmicas integradas
  const recipesData = [
    {
      id: '1',
      title: 'Picadinho de Patinho com Purê de Abóbora Cabotiá e Chuchu',
      category: 'main',
      categoryLabel: 'Refeição Principal • Cães Adultos',
      badgeClass: 'bg-surface-container-lowest/90 text-primary',
      prepTime: '30 min preparo',
      difficulty: 'Fácil',
      servings: '4 porções',
      highlight: 'Digestão Leve',
      benefit: 'Rico em Fibras & Ferro',
      benefitIcon: 'verified',
      benefitColor: 'text-tertiary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe1tEprUo8u7wsvpwR9pq19epRbXN8CUoVkuw8pz1MA0Y3X8CIM6CW0uK4UjKA6SMkAgtIJOhWhLe8mMwX4umO0bk6etXWXa5PmTd1ngvHPulK7VHShJ0pw2I3LGmEOR4Nqx_sR5WFNUl51tDoxIByXaGezYM8LaplFFh1Mcl6u6u3HB69q67ruizBOu2-GRZbIl1PGIG-caut_FUMPOMlmKvhWN_cSrd3uL0wVKvh-1CSRHQNJw2J',
      ingredients: ['Patinho Moído', 'Abóbora Cabotiá', 'Chuchu em cubos', 'Fio de Azeite', 'Suplemento Mineral'],
      instructions: [
        '1. Doure levemente o patinho moído sem nenhum óleo ou apenas com um fio de água mineral.',
        '2. Cozinhe a abóbora cabotiá e o chuchu no vapor até ficarem extremamente macios.',
        '3. Amasse a abóbora como purê e misture ao chuchu picado e à carne.',
        '4. Finalize com fio de azeite extravirgem cru e espere esfriar 100% antes de ofertar.'
      ]
    },
    {
      id: '2',
      title: 'Biscoitinhos Crocantes de Aveia, Banana e Amendoim Caseiro',
      category: 'treats',
      categoryLabel: 'Petisco & Treino • 100% Vegano',
      badgeClass: 'bg-tertiary text-on-tertiary',
      prepTime: '20 min forno',
      difficulty: 'Muito Fácil',
      servings: 'Rende 25 un',
      highlight: 'Para Pipoca',
      benefit: 'Aprovado para Cães Sensíveis',
      benefitIcon: 'recommend',
      benefitColor: 'text-tertiary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf9qSxqX5FkDdswbGQPxuyJqVQGcXAbdtQ4j93gBAa2XgmlHXmX2zuPUkT619aouRNCjZaRemw6fz5D6kqEjvg-OGnzbKjZ0R1WMny3Rxe5da6TQb8F0TsEoc3yC5nbaAtbgjVXATKMsbRb1xoYx2-Jh9wMKbyy_s77hjj2Gb6IGT2vJb2asdOW16nr4tDM3nN6yIV21sQQc0KYvSk0Yi_ZBvQIa-L3sTdBFT_MXJqmmaNsOnodgTK',
      ingredients: ['Farinha de Aveia', '1 Banana bem madura', 'Pasta de amendoim sem xilitol'],
      instructions: [
        '1. Amasse a banana prata com um garfo até virar uma pasta uniforme.',
        '2. Misture a colher de pasta de amendoim 100% pura (certifique-se de que não tem xilitol nem açúcar).',
        '3. Adicione a aveia aos poucos até dar ponto de modelar.',
        '4. Corte no formato de ossinho ou bolinhas achatadas e asse a 180°C por 18 a 20 minutos até ficarem crocantes.'
      ]
    },
    {
      id: '3',
      title: 'Caldo de Ossos Dourado e Gelatinoso (Super Colágeno)',
      category: 'broths',
      categoryLabel: 'Articulações & Hidratação',
      badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
      prepTime: 'Cozimento Lento',
      difficulty: 'Fácil',
      servings: '1 Litro',
      highlight: 'Pós-Vacina',
      benefit: 'Glucosamina Natural',
      benefitIcon: 'water_drop',
      benefitColor: 'text-secondary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJG1aByo3t0Jp_DM6CRMhnBMAa26sztk9PK-yavlCDtm_17mgQHaLvl0E3CK2_fea_LOA-GbL6vICT-HXS6Ee6hmCYzrPDV4FzEzzocAexaRK2hEIkPLHJX8pDk6i_MLSDzNYkeS9jSoRm5Ri6MjIGImBQV6DrUrZhjQ3ggezflH-73DOG-KnrUB59vBsLS-r2UdN_2CYJB7Uz3k6DWmsji2RevwAk0cQTK693b7MPi7g5dJ5x8y6t',
      ingredients: ['Ossos bovinos / Carcaça', 'Vinagre de Maçã', 'Cenoura', 'Água filtrada'],
      instructions: [
        '1. Coloque os ossos na panela com água até cobrir totalmente.',
        '2. Adicione 2 colheres de vinagre de maçã (essencial para extrair minerais e colágeno) e cenouras em rodelas.',
        '3. Cozinhe em fogo brando tampado. Retire a espuma superficial que subir.',
        '4. Coe completamente com peneira fina descartando todos os ossos cozidos (NUNCA ofereça ossos cozidos).',
        '5. Deixe na geladeira. A gordura solidificada em cima deve ser retirada antes de servir.'
      ]
    },
    {
      id: '4',
      title: 'Muffins de Fígado e Cenoura Ralada para Treino',
      category: 'treats',
      categoryLabel: 'Treino de Alta Recompensa',
      badgeClass: 'bg-surface-container-lowest/90 text-primary',
      prepTime: '25 min',
      difficulty: 'Médio',
      servings: '12 mini muffins',
      highlight: 'Super Apetitoso',
      benefit: 'Rico em Vitamina A & B12',
      benefitIcon: 'star',
      benefitColor: 'text-tertiary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt1ijXKd9N7ZL6fP9xD0etuWf594hePBCv5o_JnDk8gLl2Cy6ZvlMtRbq_zRUFDOoiqHkIj19oPwcicL0z9scZ-XnNWdxpOp3Nus8MzItUwUJ9jtryJIZLRuKw53CMh5rqK5uJvcF3ZzJiI12xCfGpTe2A79Oq_c6yB-eV5_bLkTbc07bbOikud2STmrtQE_esrKF_kPYJWlBpJ2VbbS3HLMpwsjygLUgHfptXC8Ts_2s1_HNpwppn',
      ingredients: ['Fígado Bovino ou Frango', 'Cenoura Ralada', 'Ovo de Galinha', 'Farinha de Aveia'],
      instructions: [
        '1. Bata o fígado cru no liquidificador com 1 ovo até obter uma mistura homogênea.',
        '2. Misture a cenoura ralada fina e vá adicionando farinha de aveia até virar uma massa consistente.',
        '3. Distribua em forminhas de silicone para muffin.',
        '4. Asse em forno pré-aquecido a 180°C por 20 minutos até estarem firmes ao toque.'
      ]
    }
  ];

  // Filtro dinâmico por categoria e pesquisa
  const filteredRecipes = recipesData.filter((recipe) => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'Todas as Receitas',  },
    { id: 'main', label: 'Refeições Principais (AN)',  },
    { id: 'treats', label: 'Biscoitos & Petiscos',  },
    { id: 'broths', label: 'Sopas & Caldos Fortificantes',  },
    { id: 'summer', label: 'Picolés & Sobremesas de Verão',  },
    { id: 'cats', label: 'Receitas Especiais para Gatos',  },
  ];

  const downloadSafetyGuide = () => {
    alert("Iniciando download do Guia em PDF: Tabela de Alimentos Permitidos e Proibidos VaciPet...");
  };

  return (
    <div className="w-full bg-surface min-h-screen font-sans text-on-surface">
      
      {/* SEÇÃO HERO DE NAVEGAÇÃO E BUSCA */}
      <section className="w-full px-margin pt-space-lg pb-space-xl">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low shadow-sm">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-fixed opacity-40 blur-3xl pointer-events-none"></div>
          <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-secondary-fixed opacity-30 blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter p-space-xl items-center">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest text-primary shadow-sm w-fit">
                <span className="material-symbols-outlined text-sm text-tertiary">restaurant_menu</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">Culinária Animal & Nutrição Caseira</span>
              </div>

              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">
                Receitas Culinárias <span className="text-primary">Saudáveis</span> para o seu Pet
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Pratos caseiros balanceados, petiscos naturais e opções seguras preparadas com carinho para fortalecer a imunidade, a hidratação e o bem-estar do seu amigo de quatro patas.
              </p>

              {/* BARRA DE PESQUISA */}
              <div className="mt-space-xs flex flex-col sm:flex-row gap-space-xs max-w-xl">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar receita (ex: Biscoito de cenoura, Caldo de ossos...)"
                    className="w-full h-11 pl-10 pr-space-md bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>
                <button
                  type="button"
                  className="h-11 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg shadow-sm transition-all flex items-center justify-center gap-space-xs"
                >
                  <span>Buscar</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* FOTO DESTAQUE */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-4/3 rounded-xl overflow-hidden shadow-md">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0na2PznpXXGKVRe7DuaDiq0DKLrelb2ikGMbVPYjHnZJfJkWyWX5R0eJZHXRzQ2pRQzO-ug1ltgTBmYYdMLIzY8Wc75EDGgbxIzUfAe7c5au0E1LkUIqGg8WY2gCZtjfFpTYI0nY9MqTF8_zK2eZkbJE40rkbgGnpevFsvgRzM1CJ4oQI2_G_DldaHRsVNuZgNvDSyNZMA6QcqhUn0E-tt0r85ocqlNcVD1372y1XxNEpze2ANpsg"
                  alt="Mesa de preparação de alimentos naturais para pets"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-space-md left-space-md right-space-md text-on-primary flex items-center justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-tertiary-fixed block">100% IN NATURA</span>
                    <span className="font-title-md text-title-md font-bold">Pipoca adora abóbora!</span>
                  </div>
                  <span className="px-space-sm py-1 rounded-full bg-surface/90 text-primary font-label-sm text-label-sm font-bold">Protocolo Seguro</span>
                </div>
              </div>
            </div>
          </div>

          {/* ABAS / CATEGORIAS */}
          <div className="relative z-10 px-space-xl pb-space-lg pt-space-xs overflow-x-auto">
            <div className="flex items-center gap-space-xs min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 shadow-sm ${
                    selectedCategory === cat.id
                      ? 'bg-primary-container text-on-primary font-bold'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BANNER DE SEGURANÇA VETERINÁRIA */}
      <section className="w-full px-margin pb-space-lg">
        <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">shield_with_heart</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-on-surface">Regras de Ouro da Cozinha Pet</span>
                  <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">ALERTA VITAL</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
                  Cozinhar para animais requer rigor sanitário. Nunca utilize temperos humanos tradicionais ou ingredientes proibidos.
                </p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={downloadSafetyGuide}
              className="shrink-0 px-space-lg py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-label-lg transition-all flex items-center gap-space-xs shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              <span>Baixar Tabela de Alimentos Permitidos e Proibidos (PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-space-lg pt-space-md bg-surface-container-low rounded-lg p-space-md">
            <div className="flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-error shrink-0 mt-0.5">block</span>
              <div>
                <span className="font-title-md text-title-md text-on-surface block font-semibold">Zero Sal, Alho & Cebola</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Alho e cebola contêm dissulfeto de alila que causa anemia hemolítica severa tanto em cães quanto em felinos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-secondary shrink-0 mt-0.5">restaurant</span>
              <div>
                <span className="font-title-md text-title-md text-on-surface block font-semibold">Sem Ossos Cozidos & Gordura</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Ossos cozidos lascam e perfuram o esôfago/estômago. Gordura excessiva ativa crises agudas de pancreatite.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-error shrink-0 mt-0.5">dangerous</span>
              <div>
                <span className="font-title-md text-title-md text-on-surface block font-semibold">Proibidos & Tóxicos Mortais</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Chocolate, Adoçante Xilitol, Macadâmia, Uva fresca e Uva-passa, Caroços de frutas e Café. Mantenha longe do preparo!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID DE RECEITAS */}
      <section className="w-full px-margin pb-space-xl">
        <div className="flex items-center justify-between mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-2xl">local_dining</span>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Cardápio Caseiro Especializado</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Selecione uma receita testada sob parâmetros de biocompatibilidade animal</p>
            </div>
          </div>
          <span className="font-label-md text-label-md text-primary bg-primary-fixed px-space-md py-1 rounded-full">
            {filteredRecipes.length} receitas encontradas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredRecipes.map((recipe) => (
            <article key={recipe.id} className="flex flex-col rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-space-sm left-space-sm flex flex-wrap gap-1">
                  <span className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-bold shadow-sm ${recipe.badgeClass}`}>
                    {recipe.categoryLabel}
                  </span>
                </div>
                <span className="absolute bottom-space-sm right-space-sm px-space-xs py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm">
                  {recipe.prepTime}
                </span>
              </div>

              <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-title-lg text-title-lg text-on-surface line-clamp-2">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center gap-space-md font-body-sm text-body-sm text-on-surface-variant">
                    <span className="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-secondary">speed</span> {recipe.difficulty}</span>
                    <span className="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-secondary">restaurant</span> {recipe.servings}</span>
                    <span className="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-tertiary">favorite</span> {recipe.highlight}</span>
                  </div>

                  <div className="mt-space-xs">
                    <span className="font-label-sm text-label-sm text-outline uppercase block mb-1">Ingredientes Principais</span>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.map((ing, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-space-xs flex items-center justify-between border-t border-outline/10 mt-2">
                  <div className={`flex items-center gap-1 font-label-sm text-label-sm font-semibold ${recipe.benefitColor}`}>
                    <span className="material-symbols-outlined text-base">{recipe.benefitIcon}</span> {recipe.benefit}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setActiveRecipeModal(recipe)}
                    className="px-space-md py-space-xs rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md transition-colors"
                  >
                    Ver Preparo
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MODAL DE PREPARO DA RECEITA */}
      {activeRecipeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto relative">
            
            <button
              onClick={() => setActiveRecipeModal(null)}
              className="absolute top-4 right-4 text-outline hover:text-on-surface p-1 rounded-full bg-surface-container-low"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <span className="text-xs font-bold text-primary uppercase">{activeRecipeModal.categoryLabel}</span>
            <h3 className="text-xl font-bold text-on-surface">{activeRecipeModal.title}</h3>

            <div className="flex gap-4 text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-xl">
              <div><strong>Tempo:</strong> {activeRecipeModal.prepTime}</div>
              <div><strong>Rendimento:</strong> {activeRecipeModal.servings}</div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-outline uppercase mb-2">Modo de Preparo Passo a Passo:</h4>
              <div className="space-y-2 text-sm text-on-surface-variant leading-relaxed">
                {activeRecipeModal.instructions.map((step, i) => (
                  <p key={i} className="bg-surface-container-lowest border border-outline/10 p-2.5 rounded-lg">{step}</p>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveRecipeModal(null)}
                className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container"
              >
                Concluir & Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RecipesPage;