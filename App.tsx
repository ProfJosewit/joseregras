
import React, { useState } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';

const BOOK_CONTENT = {
  pages: [
    { title: "BOAS-VINDAS!", content: "Olá, aluno(a)! As nossas regras ajudam todos a aprender melhor. Com elas, convivemos com respeito e mantemos nossa sala organizada." },
    { title: "SEGURANÇA E ORGANIZAÇÃO", content: "Mantenha seu espaço limpo e respeite o limite de cada colega. A segurança de todos é nossa prioridade." },
    { title: "PARTICIPAÇÃO ATIVA", content: "Sua voz é importante! Participe das aulas, tire suas dúvidas e ajude seus colegas sempre que puder." }
  ]
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const speakText = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    const page = BOOK_CONTENT.pages[currentPage];
    const utterance = new SpeechSynthesisUtterance(`${page.title}. ${page.content}`);
    utterance.lang = 'pt-BR';
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const changePage = (dir: 'next' | 'prev') => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    if (dir === 'next' && currentPage < BOOK_CONTENT.pages.length - 1) setCurrentPage(currentPage + 1);
    if (dir === 'prev' && currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Lado Esquerdo - Estilo Capa */}
        <div className="bg-[#1e293b] md:w-1/3 p-8 flex flex-col justify-between text-white">
          <div className="flex items-center gap-3">
            <GraduationCap size={32} className="text-blue-400" />
            <span className="font-bold tracking-widest text-sm">REGRAS 2026</span>
          </div>
          <div>
            <h2 className="text-2xl font-light opacity-70">EDUCADOR</h2>
            <h3 className="text-xl font-bold">José Marcelo</h3>
          </div>
        </div>

        {/* Lado Direito - Conteúdo do Livro */}
        <div className="flex-1 p-10 flex flex-col relative bg-[#ffffff]">
          <button 
            onClick={speakText}
            className={`absolute top-8 right-8 p-4 rounded-full transition-all ${isPlaying ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
          >
            {isPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          <div className="flex-1 flex flex-col justify-center text-center space-y-6">
            <h1 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter italic">
              {BOOK_CONTENT.pages[currentPage].title}
            </h1>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-2xl text-[#334155] leading-relaxed font-medium">
              {BOOK_CONTENT.pages[currentPage].content}
            </p>
          </div>

          {/* Navegação */}
          <div className="flex justify-between items-center mt-12">
            <button onClick={() => changePage('prev')} disabled={currentPage === 0} className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-10">
              <ChevronLeft size={48} className="text-[#1e293b]" />
            </button>
            <div className="text-sm font-bold text-gray-400 tracking-widest uppercase">
              Página {currentPage + 1} de {BOOK_CONTENT.pages.length}
            </div>
            <button onClick={() => changePage('next')} disabled={currentPage === BOOK_CONTENT.pages.length - 1} className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-10">
              <ChevronRight size={48} className="text-[#1e293b]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
