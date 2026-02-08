
import React, { useState } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

const BOOK_CONTENT = {
  pages: [
    { title: "BOAS-VINDAS!", content: "Olá, aluno(a)! As nossas regras ajudam todos a aprender melhor. Com elas, convivemos com respeito e mantemos nossa sala organizada." },
    { title: "RESPEITO", content: "Respeite professores e colegas. Use palavras gentis e ouça quando os outros estiverem falando." },
    { title: "FOCO E ESTUDO", content: "Traga sempre seu material e participe das atividades com dedicação. O conhecimento é o seu maior tesouro!" }
  ]
};

export default function App() {
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

  const next = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    if (currentPage < BOOK_CONTENT.pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6">
        <div className="flex justify-end">
          <button onClick={speakText} className={`p-4 rounded-full ${isPlaying ? 'bg-red-500' : 'bg-blue-600'} text-white shadow-lg`}>
            {isPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-blue-900">{BOOK_CONTENT.pages[currentPage].title}</h1>
        <p className="text-xl text-gray-700 leading-relaxed">{BOOK_CONTENT.pages[currentPage].content}</p>

        <div className="flex justify-between items-center pt-6">
          <button onClick={prev} disabled={currentPage === 0} className="p-2 disabled:opacity-20"><ChevronLeft size={40} /></button>
          <span className="font-bold text-gray-400">PÁGINA {currentPage + 1} DE {BOOK_CONTENT.pages.length}</span>
          <button onClick={next} disabled={currentPage === BOOK_CONTENT.pages.length - 1} className="p-2 disabled:opacity-20"><ChevronRight size={40} /></button>
        </div>
      </div>
    </div>
  );
}
