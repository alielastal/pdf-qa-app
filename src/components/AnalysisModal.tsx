import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, text }) => {
  if (!isOpen) return null;

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTxt = () => {
    downloadFile(text, 'analysis.txt', 'text/plain;charset=utf-8');
  };

  const handleDownloadJson = () => {
    const jsonContent = JSON.stringify({ content: text }, null, 2);
    downloadFile(jsonContent, 'analysis.json', 'application/json');
  };

  const handleDownloadMd = () => {
    const mdContent = `# Document Analysis\n\n${text}`;
    downloadFile(mdContent, 'analysis.md', 'text/markdown;charset=utf-8');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <header className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">Document Content</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Close modal">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-slate-700 bg-slate-50 p-4 rounded-md">{text}</pre>
        </main>
        <footer className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end items-center gap-3 rounded-b-lg">
          <span className="text-sm font-medium text-slate-600 mr-auto">Download as:</span>
          <button onClick={handleDownloadTxt} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors">TXT</button>
          <button onClick={handleDownloadJson} className="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600 transition-colors">JSON</button>
          <button onClick={handleDownloadMd} className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors">Markdown</button>
        </footer>
      </div>
    </div>
  );
};

export default AnalysisModal;