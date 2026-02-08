import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Printer, PenTool, Loader2 } from 'lucide-react';
import SignaturePad from './components/SignaturePad';

const BOOK_CONTENT = {
  pages: [
    { title: "Bem-vindo", content: "Este é o nosso Livro de Regras Interativo para uma boa convivência escolar." },
    { title: "Respeito", content: "Respeite professores e colegas. O respeito é a base de tudo." },
    { title: "Organização", content: "Mantenha sua sala limpa e seus materiais organizados." },
    { title: "Participação", content: "Participe das atividades e tire suas dúvidas sempre que precisar." }
  ]
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [signatureData, setSignatureData] = useState({ studentName: '', studentSignature: '' });
  const [isSigned, setIsSigned] = useState(false);

  const totalPages = BOOK_CONTENT.pages.length + 1;

  const speakText = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const page = BOOK_CONTENT.pages[currentPage];
    if (!page) return;

    const utterance = new SpeechSynthesisUtterance(`${page.title}. ${page.content}`);
    utterance.lang = 'pt-BR';
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const changePage = (dir: 'next' | 'prev') => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    if (dir === 'next' && currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    if (dir === 'prev' && currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg max-w-4xl w-full p-8 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-800">Livro de Regras</h1>
          <button onClick={speakText} className={`p-3 rounded-full ${isPlaying ? 'bg-red-500' : 'bg-blue-600'} text-white`}>
            {isPlaying ? <VolumeX /> : <Volume2 />}
          </button>
        </div>

        {currentPage < BOOK_CONTENT.pages.length ? (
          <div className="text-center py-10">
            <h2 className="text-4xl font-bold mb-6">{BOOK_CONTENT.pages[currentPage].title}</h2>
            <p className="text-xl text-gray-700">{BOOK_CONTENT.pages[currentPage].content}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Assine seu compromisso</h2>
            <input 
              type="text" 
              placeholder="Seu nome" 
              className="w-full p-2 border rounded"
              onChange={(e) => setSignatureData({...signatureData, studentName: e.target.value})}
            />
            <SignaturePad onSave={(sig) => setSignatureData({...signatureData, studentSignature: sig})} />
            <button className="bg-green-600 text-white p-2 rounded w-full" onClick={() => alert("Salvo!")}>Confirmar</button>
          </div>
        )}

        <div className="flex justify-between mt-10">
          <button onClick={() => changePage('prev')} disabled={currentPage === 0} className="disabled:opacity-30"><ChevronLeft size={40}/></button>
          <span className="text-gray-500">Página {currentPage + 1} de {totalPages}</span>
          <button onClick={() => changePage('next')} disabled={currentPage === totalPages - 1} className="disabled:opacity-30"><ChevronRight size={40}/></button>
        </div>
      </div>
    </div>
  );
};

export default App;
