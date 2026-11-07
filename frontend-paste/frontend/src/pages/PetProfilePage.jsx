
const PetProfilePage = () => {
  return (
    <div className="w-full bg-surface min-h-screen pb-12 font-sans text-on-surface">
      
      {/* BARRA SUPERIOR DE INFORMAÇÃO / SUB-HEADER */}
      <div className="bg-surface-container-low border-b border-outline/10 px-margin py-2 text-xs text-on-surface-variant flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-primary">verified_user</span>
          <span>Prontuário Oficial VaciPet • Sistema Homologado MAPA/CFMV sob Portaria Sanitária Vigente</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span> Nuvem Criptografada
          </span>
          <span>Limoeiro - PE e Rede Conectada</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* TÍTULO E SUBTÍTULO */}
        <div className="mb-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Gestão de Prontuário & Tutores / Informações do Pet & Tutor
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-1">
            Informações do Pet & Tutor
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Vincule o responsável legal ao prontuário médico e crie a carteira de vacinação digital oficial do seu animal com garantia de conformidade epidemiológica.
          </p>
        </div>

        {/* STEPPER DE ETAPAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest border-2 border-primary shadow-sm">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-sm shrink-0">1</div>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-primary uppercase">Etapa 1</span>
              <span className="text-sm font-bold text-on-surface">Tutor Legal</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low opacity-80">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center text-sm shrink-0">2</div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-outline uppercase">Etapa 2</span>
              <span className="text-sm font-bold text-on-surface">Identificação Pet</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low opacity-60">
            <div className="w-8 h-8 rounded-full bg-outline/20 text-outline font-bold flex items-center justify-center text-sm shrink-0">3</div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-outline uppercase">Etapa 3</span>
              <span className="text-sm font-bold text-on-surface">Saúde & Alergias</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low opacity-60">
            <div className="w-8 h-8 rounded-full bg-outline/20 text-outline font-bold flex items-center justify-center text-sm shrink-0">4</div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-outline uppercase">Etapa 4</span>
              <span className="text-sm font-bold text-on-surface">Emissão Digital</span>
            </div>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL (FORMULÁRIO + PREVIEW CARD) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA ESQUERDA: FORMULÁRIO (7 Colunas) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline/10 space-y-6">
            
            {/* CABEÇALHO DA SEÇÃO */}
            <div className="flex items-center justify-between pb-4 border-b border-outline/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-xl">badge</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-on-surface">1. Dados Pessoais do Tutor</h2>
                  <p className="text-xs text-on-surface-variant">Responsável civil e legal pelos protocolos sanitários e notificações zoonóticas.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-md">* Obrigatório p/ CVI</span>
            </div>

            {/* FORMULÁRIO */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Nome Completo do Tutor *</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">person</span>
                  <input 
                    type="text" 
                    defaultValue="Daniela Cavalcanti Rios" 
                    className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium focus:outline-none focus:border-primary" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">CPF (Cadastro de Pessoa Física) *</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">id_card</span>
                    <input 
                      type="text" 
                      defaultValue="094.882.174-50" 
                      className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium focus:outline-none focus:border-primary" 
                    />
                  </div>
                  <span className="text-[10px] text-outline mt-0.5 block">Necessário para Passaporte Sanitário e CVI</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Data de Nascimento *</label>
                  <input 
                    type="date" 
                    defaultValue="1989-11-22" 
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium focus:outline-none focus:border-primary" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">WhatsApp / Celular de Notificação *</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">call</span>
                    <input 
                      type="text" 
                      defaultValue="(81) 99712-1088" 
                      className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium focus:outline-none focus:border-primary" 
                    />
                  </div>
                  <span className="text-[10px] text-tertiary font-medium mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">check_circle</span> Receberá alertas automáticos de vencimento
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">E-mail Principal de Acesso *</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">mail</span>
                    <input 
                      type="email" 
                      defaultValue="daniela.rios@vaci-pet.com.br" 
                      className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium focus:outline-none focus:border-primary" 
                    />
                  </div>
                </div>
              </div>

              {/* SEÇÃO ENDEREÇO */}
              <div className="pt-2">
                <h3 className="text-xs font-bold text-on-surface flex items-center gap-1 mb-3">
                  <span className="material-symbols-outlined text-base text-primary">location_on</span> Endereço de Residência do Pet
                </h3>
                
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12 sm:col-span-5">
                    <label className="block text-[11px] font-bold text-on-surface mb-1">CEP (Limoeiro / Região)</label>
                    <div className="flex gap-2">
                      <input type="text" defaultValue="55700-000" className="w-full px-3 py-1.5 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium" />
                      <button type="button" className="px-3 py-1.5 bg-surface-container-high text-primary font-bold text-xs rounded-lg hover:bg-primary-fixed transition-colors">Buscar</button>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-5">
                    <label className="block text-[11px] font-bold text-on-surface mb-1">Rua / Logradouro</label>
                    <input type="text" defaultValue="Avenida Severino Pinheiro" className="w-full px-3 py-1.5 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium" />
                  </div>

                  <div className="col-span-12 sm:col-span-2">
                    <label className="block text-[11px] font-bold text-on-surface mb-1">Número</label>
                    <input type="text" defaultValue="340" className="w-full px-3 py-1.5 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mt-3">
                  <div className="col-span-12 sm:col-span-5">
                    <label className="block text-[11px] font-bold text-on-surface mb-1">Complemento / Ref.</label>
                    <input type="text" defaultValue="Apto 402 - Edif. Solar das Palmeiras" className="w-full px-3 py-1.5 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium" />
                  </div>

                  <div className="col-span-12 sm:col-span-4">
                    <label className="block text-[11px] font-bold text-on-surface mb-1">Bairro</label>
                    <input type="text" defaultValue="Centro" className="w-full px-3 py-1.5 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium" />
                  </div>

                  <div className="col-span-12 sm:col-span-3">
                    <label className="block text-[11px] font-bold text-on-surface mb-1">Cidade / UF</label>
                    <input type="text" defaultValue="Limoeiro - PE" className="w-full px-3 py-1.5 bg-surface-container-low border border-outline/20 rounded-lg text-sm text-on-surface font-medium opacity-75" disabled />
                  </div>
                </div>
              </div>

              {/* AUTORIZAÇÃO */}
              <div className="p-3 rounded-xl bg-surface-container-low/70 border border-outline/10 mt-4 flex items-start gap-2">
                <input type="checkbox" id="auth" defaultChecked className="mt-1 rounded text-primary focus:ring-primary cursor-pointer" />
                <label htmlFor="auth" className="text-xs text-on-surface-variant leading-tight cursor-pointer">
                  Autorizo a equipe veterinária VaciPet e o Centro de Vigilância e Zoonoses de Limoeiro-PE a emitir avisos de campanhas municipais públicas (Raiva Animal, Leishmaniose e castração pública) para meu contato.
                </label>
              </div>

            </form>
          </div>

          {/* COLUNA DIREITA: PREVIEW DA CARTEIRA DIGITAL (5 Colunas) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* CARD AZUL DA CARTEIRA */}
            <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-6 text-on-primary shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-on-primary/20 pb-3 mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary-fixed">Carteira Digital VaciPet</span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-on-primary/20 px-2 py-0.5 rounded">Emissão Oficial</span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black tracking-tight leading-none">Pipoca</h3>
                  <p className="text-xs text-primary-fixed mt-1 font-medium">Canis lupus familiaris • Cão</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-on-primary/20 border border-on-primary/30 flex items-center justify-center font-bold text-lg">
                  VP
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-on-primary/10">
                <div className="w-16 h-16 rounded-xl bg-on-primary/20 border-2 border-on-primary/30 flex items-center justify-center overflow-hidden shrink-0">
                  <span className="material-symbols-outlined text-3xl text-on-primary">pets</span>
                </div>
                <div className="text-xs space-y-1 text-primary-fixed">
                  <p><strong className="text-on-primary">Raça:</strong> Jack Russell</p>
                  <p><strong className="text-on-primary">Idade:</strong> 3 anos e 4m</p>
                  <p><strong className="text-on-primary">Peso:</strong> 26.4 kg (Médio)</p>
                  <p><strong className="text-on-primary">Microchip:</strong> #982.000.112.441</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-on-primary/10 flex items-center justify-between text-[11px] text-primary-fixed">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-tertiary-fixed">verified</span>
                  Homologação MAPA/CFMV
                </span>
                <span className="material-symbols-outlined text-xl">qr_code_2</span>
              </div>

              <div className="mt-3 p-2 rounded-lg bg-on-primary/10 text-[11px] flex justify-between items-center">
                <span>Protocolo V8/V10 & Reforços</span>
                <span className="font-bold text-tertiary-fixed">1 Dose Agendada</span>
              </div>
            </div>

            <p className="text-center text-xs text-outline font-medium">Visualização preliminar em tempo real</p>

            {/* BENEFÍCIOS ATIVOS */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline/10 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-base">verified</span> Benefícios Ativos do Cadastro
              </h4>
              
              <ul className="text-xs text-on-surface-variant space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base shrink-0">check_circle</span>
                  <span><strong>Alertas automáticos via WhatsApp</strong> com 15 dias de antecedência do vencimento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base shrink-0">check_circle</span>
                  <span><strong>Acesso prioritário</strong> em mutirões municipais de imunização pública de Limoeiro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base shrink-0">check_circle</span>
                  <span><strong>Certificado infalsificável</strong> aceito em voos Gol, Latam, Azul e hotéis pet friendly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base shrink-0">check_circle</span>
                  <span><strong>Segurança LGPD</strong> e sigilo veterinário garantido por criptografia clínica</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default PetProfilePage;