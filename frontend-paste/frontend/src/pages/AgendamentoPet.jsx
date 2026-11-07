import { useState } from 'react';

export default function AgendamentoPet() {
  // Estados para gerenciar a seleção interativa no React
  const [selectedService, setSelectedService] = useState({
    title: 'Aplicação de Vacina + Triagem',
    price: 140.00
  });

  const [selectedVet, setSelectedVet] = useState('Dr. Leandro José Medeiros');
  const [selectedDate, setSelectedDate] = useState('27');
  const [selectedTime, setSelectedTime] = useState('09:00');

  const handleConfirm = () => {
    alert(
      `🎉 Agendamento confirmado com sucesso!\n\n` +
      `Pet: Pipoca\n` +
      `Serviço: ${selectedService.title}\n` +
      `Veterinário: ${selectedVet}\n` +
      `Data: Dia ${selectedDate}/09 às ${selectedTime}\n` +
      `Valor Total: R$ ${selectedService.price.toFixed(2).replace('.', ',')}`
    );
  };

  const handleQuickAddVax = () => {
    alert('Vacina Gripe Canina selecionada para a consulta!');
  };

  return (
    <main className="w-full pt-8 pb-16 bg-[#faf8ff] text-[#131b2e] min-h-screen font-sans">
      <div className="w-full px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Cabeçalho de contexto */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[#006398] font-semibold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">event_available</span>
              <span>Central de Imunização &amp; Atendimento Clínico</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#131b2e]">Agendamento Inteligente</h1>
            <p className="text-sm text-[#434655] max-w-2xl">
              Reserve consultas profiláticas, reforços vacinais e atendimentos públicos com validação imediata no prontuário do seu pet.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#f2f3ff] px-4 py-2 rounded-full shadow-sm border border-[#e2e7ff]">
            <span className="material-symbols-outlined text-[#004f35] text-lg">verified_user</span>
            <span className="text-xs text-[#434655] font-medium">Protocolos validados com CFMV &amp; MAPA</span>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Coluna Esquerda: Formulário (7/12) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Passo 01: Pet */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e7ff] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#dce1ff] text-[#0037b0] font-bold text-xs flex items-center justify-center">1</span>
                  <h2 className="text-lg font-bold text-[#131b2e]">Paciente Selecionado</h2>
                </div>
                <button type="button" className="text-[#0037b0] text-xs font-semibold hover:underline flex items-center gap-1">
                  <span>Trocar Pet</span>
                  <span className="material-symbols-outlined text-sm">swap_horiz</span>
                </button>
              </div>

              {/* Card do Pet */}
              <div className="p-4 bg-[#f2f3ff] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      className="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-white" 
                      alt="Pipoca Golden Retriever" 
                      src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80" 
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#4edea3] rounded-full ring-2 ring-white"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#131b2e]">Pipoca</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#434655] text-xs">Golden Retriever • 2a 4m</span>
                    </div>
                    <p className="text-xs text-[#434655] mt-0.5">Microchip #982.009.112.441 • Peso: 26.4 kg</p>
                  </div>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 shrink-0 self-start sm:self-center">
                  <span className="material-symbols-outlined text-[#006398] text-base">fact_check</span>
                  <span className="text-xs font-bold text-[#006398]">Carteira Ativa</span>
                </div>
              </div>

              {/* Alerta Preventivo */}
              <div className="p-4 bg-[#dae2fd]/40 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-l-4 border-[#0037b0]">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006398] text-xl mt-0.5">notification_important</span>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">Reforço Pendente Detectado: <span className="text-[#0037b0]">Gripe Canina (Bronchiguard)</span></p>
                    <p className="text-xs text-[#434655]">Atraso de 14 dias em relação à janela ideal WSAVA.</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={handleQuickAddVax}
                  className="whitespace-nowrap px-3 py-1.5 bg-[#0037b0] text-white text-xs font-semibold rounded-lg shadow hover:bg-[#1d4ed8] transition-colors shrink-0"
                >
                  + Selecionar Vacina
                </button>
              </div>
            </div>

            {/* Passo 02: Tipo de Atendimento */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e7ff] space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#dce1ff] text-[#0037b0] font-bold text-xs flex items-center justify-center">2</span>
                <h2 className="text-lg font-bold text-[#131b2e]">Tipo de Atendimento</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <label 
                  onClick={() => setSelectedService({ title: 'Aplicação de Vacina + Triagem', price: 140.00 })}
                  className={`relative flex flex-col p-4 rounded-xl cursor-pointer bg-[#f2f3ff] transition-all border-2 ${
                    selectedService.price === 140.00 ? 'border-[#0037b0] bg-blue-50/40' : 'border-transparent hover:bg-[#e2e7ff]'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="service_type" 
                    className="sr-only" 
                    checked={selectedService.price === 140.00} 
                    onChange={() => {}}
                  />
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-lg bg-white text-[#0037b0] shadow-sm">
                      <span className="material-symbols-outlined text-xl">vaccines</span>
                    </span>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                      selectedService.price === 140.00 ? 'bg-[#0037b0] border-[#0037b0]' : 'border-gray-400'
                    }`}>
                      {selectedService.price === 140.00 && <span className="w-2 h-2 rounded-full bg-white"></span>}
                    </span>
                  </div>
                  <span className="font-bold text-[#131b2e] text-sm">Aplicação de Vacina</span>
                  <span className="text-xs text-[#434655] mt-0.5">Dose preventiva ou reforço anual</span>
                  <span className="mt-2 text-xs font-extrabold text-[#0037b0]">R$ 140,00</span>
                </label>

                <label 
                  onClick={() => setSelectedService({ title: 'Consulta Geral Completa', price: 160.00 })}
                  className={`relative flex flex-col p-4 rounded-xl cursor-pointer bg-[#f2f3ff] transition-all border-2 ${
                    selectedService.price === 160.00 ? 'border-[#0037b0] bg-blue-50/40' : 'border-transparent hover:bg-[#e2e7ff]'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="service_type" 
                    className="sr-only" 
                    checked={selectedService.price === 160.00} 
                    onChange={() => {}}
                  />
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-lg bg-white text-[#006398] shadow-sm">
                      <span className="material-symbols-outlined text-xl">stethoscope</span>
                    </span>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                      selectedService.price === 160.00 ? 'bg-[#0037b0] border-[#0037b0]' : 'border-gray-400'
                    }`}>
                      {selectedService.price === 160.00 && <span className="w-2 h-2 rounded-full bg-white"></span>}
                    </span>
                  </div>
                  <span className="font-bold text-[#131b2e] text-sm">Consulta Geral</span>
                  <span className="text-xs text-[#434655] mt-0.5">Avaliação física detalhada e triagem</span>
                  <span className="mt-2 text-xs font-extrabold text-[#0037b0]">R$ 160,00</span>
                </label>

              </div>
            </div>

            {/* Passo 03: Veterinário ou Local */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e7ff] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#dce1ff] text-[#0037b0] font-bold text-xs flex items-center justify-center">3</span>
                  <h2 className="text-lg font-bold text-[#131b2e]">Veterinário ou Local</h2>
                </div>
                <span className="text-xs text-[#747686]">Limoeiro, PE</span>
              </div>
              
              <div className="space-y-3">
                <label 
                  onClick={() => setSelectedVet('Dr. Leandro José Medeiros')}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl cursor-pointer bg-[#f2f3ff] transition-all border-2 ${
                    selectedVet === 'Dr. Leandro José Medeiros' ? 'border-[#0037b0] bg-blue-50/40' : 'border-transparent hover:bg-[#e2e7ff]'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <input 
                      type="radio" 
                      name="provider" 
                      checked={selectedVet === 'Dr. Leandro José Medeiros'} 
                      onChange={() => {}} 
                      className="mt-1 sm:mt-0 accent-[#0037b0] h-4 w-4"
                    />
                    <img 
                      className="w-12 h-12 rounded-xl object-cover shadow-sm" 
                      alt="Dr. Leandro Medeiros" 
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80" 
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[#131b2e] text-sm">Dr. Leandro José Medeiros</span>
                        <span className="material-symbols-outlined text-[#004f35] text-sm" title="CRMV Verificado">verified</span>
                      </div>
                      <p className="text-xs text-[#434655]">Clínico Geral • CRMV-PE 4821</p>
                      <p className="text-xs text-[#006398] font-medium">Clínica Pet Veterinária • Centro</p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <span className="text-xs font-semibold text-[#004f35]">★ 4.9 (184 avaliações)</span>
                  </div>
                </label>

                <label 
                  onClick={() => setSelectedVet('Dra. Marina Albuquerque')}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl cursor-pointer bg-[#f2f3ff] transition-all border-2 ${
                    selectedVet === 'Dra. Marina Albuquerque' ? 'border-[#0037b0] bg-blue-50/40' : 'border-transparent hover:bg-[#e2e7ff]'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <input 
                      type="radio" 
                      name="provider" 
                      checked={selectedVet === 'Dra. Marina Albuquerque'} 
                      onChange={() => {}} 
                      className="mt-1 sm:mt-0 accent-[#0037b0] h-4 w-4"
                    />
                    <img 
                      className="w-12 h-12 rounded-xl object-cover shadow-sm" 
                      alt="Dra. Marina Albuquerque" 
                      src="https://images.unsplash.com/photo-1594824813566-78a933f23380?auto=format&fit=crop&w=150&q=80" 
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[#131b2e] text-sm">Dra. Marina Albuquerque</span>
                        <span className="material-symbols-outlined text-[#004f35] text-sm" title="CRMV Verificado">verified</span>
                      </div>
                      <p className="text-xs text-[#434655]">Especialista em Imunização • CRMV-PE 6109</p>
                      <p className="text-xs text-[#006398] font-medium">Centro de Diagnóstico VaciPet</p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <span className="text-xs font-semibold text-[#004f35]">★ 5.0 (98 avaliações)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Passo 04: Data & Horário */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e7ff] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#dce1ff] text-[#0037b0] font-bold text-xs flex items-center justify-center">4</span>
                  <h2 className="text-lg font-bold text-[#131b2e]">Data &amp; Horário</h2>
                </div>
                <span className="text-sm font-semibold text-[#131b2e]">Setembro / Outubro</span>
              </div>

              {/* Calendário de Dias */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                <span className="text-[#747686] font-medium py-1">Seg</span>
                <span className="text-[#747686] font-medium py-1">Ter</span>
                <span className="text-[#747686] font-medium py-1">Qua</span>
                <span className="text-[#747686] font-medium py-1">Qui</span>
                <span className="text-[#747686] font-medium py-1">Sex</span>
                <span className="text-[#747686] font-medium py-1">Sáb</span>
                <span className="text-[#747686] font-medium py-1">Dom</span>

                <button type="button" disabled className="py-2 rounded-lg opacity-30 cursor-not-allowed">23</button>
                <button type="button" disabled className="py-2 rounded-lg opacity-30 cursor-not-allowed">24</button>
                
                {['25', '26', '27', '28'].map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    className={`py-2 rounded-lg font-bold transition-all ${
                      selectedDate === day
                        ? 'bg-[#0037b0] text-white shadow-sm'
                        : 'hover:bg-[#e2e7ff] text-[#131b2e]'
                    }`}
                  >
                    <span>{day}</span>
                    {day === '27' && <span className="block text-[10px] font-normal opacity-90">Hoje</span>}
                  </button>
                ))}

                <button type="button" disabled className="py-2 rounded-lg opacity-30 cursor-not-allowed">29</button>
              </div>

              {/* Seleção de Horários */}
              <div className="pt-2">
                <span className="block text-xs font-semibold text-[#434655] mb-2">Horários Disponíveis</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['09:00', '10:00', '14:30', '16:00'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-center flex flex-col items-center transition-all ${
                        selectedTime === time
                          ? 'bg-[#0037b0] text-white shadow-sm'
                          : 'bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e]'
                      }`}
                    >
                      <span>{time}</span>
                      <span className={`text-[10px] ${selectedTime === time ? 'opacity-90' : 'text-[#434655]'}`}>
                        {parseInt(time) < 12 ? 'Manhã' : 'Tarde'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Coluna Direita: Resumo (5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-[#e2e7ff] space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0037b0] to-[#006398]"></div>
              
              <div className="flex items-center justify-between pt-1">
                <h3 className="text-lg font-bold text-[#131b2e]">Resumo da Reserva</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-xs font-bold">Confirmação Imediata</span>
              </div>

              {/* Itens de Cobrança */}
              <div className="space-y-2.5 bg-[#f2f3ff] p-4 rounded-xl border border-[#e2e7ff]/60">
                <div className="flex justify-between items-start text-[#131b2e]">
                  <div>
                    <span className="text-xs font-bold block">{selectedService.title}</span>
                    <span className="text-xs text-[#434655]">Gripe Canina (Bronchiguard)</span>
                  </div>
                  <span className="text-sm font-extrabold text-[#131b2e]">
                    R$ {selectedService.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#434655] pt-2 border-t border-[#747686]/10 text-xs">
                  <span>Emissão de Selo Digital VaciPet</span>
                  <span className="font-bold text-[#004f35]">INCLUSO</span>
                </div>
                <div className="flex justify-between items-center text-[#434655] text-xs">
                  <span>Atualização do Prontuário</span>
                  <span className="font-bold text-[#004f35]">GRÁTIS</span>
                </div>
                <div className="pt-2 border-t border-[#747686]/10 flex justify-between items-center">
                  <span className="text-sm font-bold text-[#131b2e]">Total a pagar</span>
                  <span className="text-xl font-black text-[#0037b0]">
                    R$ {selectedService.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Badge do Profissional */}
              <div className="flex items-center gap-3 p-3 bg-[#e2e7ff]/40 rounded-xl">
                <div className="p-2 rounded-lg bg-white text-[#0037b0] shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#131b2e]">
                    Dia {selectedDate}/09 • <span>{selectedTime}</span>
                  </p>
                  <p className="text-xs text-[#434655]">Com {selectedVet}</p>
                </div>
              </div>

              {/* Mapa / Localização da Clínica */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[#434655]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">pin_drop</span>
                    Localização da Clínica
                  </span>
                  <a 
                    className="text-xs text-[#0037b0] hover:underline flex items-center gap-0.5" 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span>Abrir GPS</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </div>
                
                <div 
                  className="w-full h-32 rounded-xl relative border border-[#747686]/10 shadow-inner overflow-hidden flex items-end p-2 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80')" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="relative z-10 bg-white/95 backdrop-blur-md p-2 rounded-lg border border-[#747686]/10 w-full flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-1 overflow-hidden">
                      <span className="material-symbols-outlined text-[#0037b0] text-base shrink-0">location_on</span>
                      <span className="text-xs text-[#131b2e] truncate">Rua Matriz, 142 • Centro, Limoeiro - PE</span>
                    </div>
                    <span className="text-xs text-[#006398] font-bold shrink-0 ml-1">1.2 km</span>
                  </div>
                </div>
              </div>

              {/* Botão de Ação */}
              <button 
                type="button" 
                onClick={handleConfirm}
                className="w-full py-3 bg-[#0037b0] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#1d4ed8] transition-all flex items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">check_circle</span>
                <span>Confirmar Agendamento</span>
              </button>

              {/* Garantias */}
              <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-[#747686]/10">
                <div className="flex items-center justify-center gap-1 text-xs text-[#434655]">
                  <span className="material-symbols-outlined text-[#004f35] text-sm">verified</span>
                  <span>Cancelamento Grátis</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-[#434655]">
                  <span className="material-symbols-outlined text-[#006398] text-sm">notifications_active</span>
                  <span>Lembrete WhatsApp</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}