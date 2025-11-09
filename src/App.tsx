import React, { useState, useCallback } from 'react';
import { AppState, ChatMessage } from './types';
import { startChatWithDocument } from './services/geminiService';
import { parsePdf } from './utils/pdfParser';
import FileUpload from './components/FileUpload';
import ChatInterface from './components/ChatInterface';
import Loader from './components/Loader';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [chat, setChat] = useState<any>(null); // To hold the chat instance
  const [extractedText, setExtractedText] = useState<string>('');

  const handleFileSelect = useCallback(async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('حجم الملف يجب أن يكون أقل من 5 ميجابايت.');
      setAppState(AppState.ERROR);
      return;
    }

    setAppState(AppState.PROCESSING_PDF);
    setErrorMessage('');
    setChatHistory([]);
    setExtractedText('');

    try {
      const parsedText = await parsePdf(file);
      setExtractedText(parsedText);
      const newChat = await startChatWithDocument(parsedText);
      setChat(newChat.chat);
      setChatHistory(newChat.initialHistory);
      setAppState(AppState.READY_TO_CHAT);
    } catch (error) {
      console.error('Error processing file:', error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setErrorMessage(`Failed to process PDF. ${message}`);
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!chat) return;

    setAppState(AppState.CHATTING);
    const userMessage: ChatMessage = { role: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      let fullModelResponse = '';
      const stream = await chat.sendMessageStream({ message });
      
      // Create a placeholder for the model's response
      setChatHistory(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        fullModelResponse += chunk.text;
        setChatHistory(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = { role: 'model', text: fullModelResponse };
            return newHistory;
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setChatHistory(prev => [...prev, { role: 'model', text: `Sorry, I encountered an error: ${message}` }]);
    } finally {
      setAppState(AppState.READY_TO_CHAT);
    }
  }, [chat]);

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setChatHistory([]);
    setErrorMessage('');
    setChat(null);
    setExtractedText('');
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.PROCESSING_PDF:
        return <Loader message="Analyzing your document..." />;
      case AppState.READY_TO_CHAT:
      case AppState.CHATTING:
        return (
          <ChatInterface
            chatHistory={chatHistory}
            onSendMessage={handleSendMessage}
            isLoading={appState === AppState.CHATTING}
            onReset={handleReset}
            extractedText={extractedText}
          />
        );
      case AppState.IDLE:
      case AppState.ERROR:
      default:
        return (
          <FileUpload onFileSelect={handleFileSelect} errorMessage={errorMessage} />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-800 font-sans">
        <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">PDF Q&A</h1>
            <p className="text-slate-600 mt-2">Upload a PDF and ask questions about its content with Gemini.</p>
        </header>
        <main className="w-full max-w-4xl h-[70vh] bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col">
            {renderContent()}
        </main>
        <footer className="text-center mt-8 text-slate-500 text-sm">
            <p>Powered by Google Gemini</p>
        </footer>
    </div>
  );
}

export default App;