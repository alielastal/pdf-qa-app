import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { SendIcon } from './icons/SendIcon';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';
import AnalysisModal from './AnalysisModal';

interface ChatInterfaceProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onReset: () => void;
  extractedText: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatHistory, onSendMessage, isLoading, onReset, extractedText }) => {
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = `${scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const isRtl = (s: string) => /[\u0600-\u06FF]/.test(s);

  return (
    <>
      <AnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} text={extractedText} />
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-slate-800">Ask me anything about the document</h2>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="text-sm font-medium text-blue-600 hover:underline">عرض التحليل</button>
            <button onClick={onReset} className="text-sm font-medium text-blue-600 hover:underline">Start Over</button>
          </div>
        </div>
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatHistory.map((chat, index) => (
            <div key={index} dir={isRtl(chat.text) ? 'rtl' : 'ltr'} className={`flex items-start gap-4 ${chat.role === 'user' ? 'justify-end' : ''}`}>
              {chat.role === 'model' && <BotIcon className="w-8 h-8 flex-shrink-0 text-blue-500" />}
              <div className={`rounded-lg p-4 max-w-xl ${chat.role === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-800'}`}>
                <p className="whitespace-pre-wrap">{chat.text}</p>
              </div>
               {chat.role === 'user' && <UserIcon className="w-8 h-8 flex-shrink-0 text-slate-500" />}
            </div>
          ))}
          {isLoading && chatHistory[chatHistory.length - 1]?.role === 'user' && (
            <div className="flex items-start gap-4">
              <BotIcon className="w-8 h-8 flex-shrink-0 text-blue-500" />
              <div className="rounded-lg p-4 bg-slate-100">
                  <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-500 animate-pulse [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-500 animate-pulse [animation-delay:0.4s]"></div>
                  </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-start gap-4">
            <textarea
              ref={textareaRef}
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 p-3 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none overflow-y-auto"
              style={{maxHeight: '150px'}}
              dir={isRtl(message) ? 'rtl' : 'ltr'}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !message.trim()}
              className="p-3 bg-blue-500 text-white rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors self-end"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;