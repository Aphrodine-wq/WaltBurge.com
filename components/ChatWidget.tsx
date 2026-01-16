import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: "Hello. I'm Walt's AI Assistant. Ask me anything about his coding language, IDE, or game dev projects." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg.text);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[380px] h-[500px] bg-brand-dark/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 border-t-brand-accent/50">
          {/* Header */}
          <div className="bg-white/5 p-4 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple via-brand-accent to-brand-purple animate-scan opacity-50"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center border border-brand-purple/50 shadow-[0_0_10px_rgba(192,132,252,0.3)]">
                <Bot size={16} className="text-brand-purple" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">AI_SYSTEM_LINK</h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-[10px] text-gray-400 font-mono uppercase">Online</p>
                </div>
              </div>
            </div>
            <button onClick={onToggle} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full z-10">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-gray-700' : 'bg-brand-purple/10 border border-brand-purple/20'
                }`}>
                  {msg.role === 'user' ? <User size={14} className="text-gray-300" /> : <Bot size={14} className="text-brand-purple" />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white text-black rounded-tr-sm font-medium' 
                    : 'bg-white/5 border border-white/5 text-gray-300 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-brand-purple" />
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-sm">
                  <Loader2 size={16} className="animate-spin text-brand-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-brand-black/50 border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about G-Rump..."
                className="w-full bg-brand-dark border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:border-brand-accent/50 text-white placeholder-gray-600 transition-colors"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-brand-accent text-black hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send size={14} fill="currentColor" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Redesigned Toggle Button - High-End Orb Style */}
      <button 
        onClick={onToggle}
        className="group relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_50px_rgba(34,211,238,0.4)]"
      >
        {/* Animated Background Ring */}
        <div className="absolute inset-0 rounded-full bg-brand-black/80 backdrop-blur-md border border-white/10 overflow-hidden">
             {/* Rotating Gradient */}
             <div className="absolute inset-[-50%] bg-[conic-gradient(transparent,rgba(34,211,238,0.5),transparent)] animate-spin-slow opacity-30 group-hover:opacity-100 transition-opacity"></div>
        </div>

        {/* Inner Content */}
        <div className="absolute inset-1 rounded-full bg-brand-black flex items-center justify-center border border-white/5 z-10 group-hover:border-brand-accent/50 transition-colors">
            {isOpen ? (
                <X size={24} className="text-white group-hover:text-brand-accent transition-colors" />
            ) : (
                <>
                 <Sparkles size={24} className="text-brand-accent absolute group-hover:scale-110 transition-transform duration-300" />
                 <div className="absolute inset-0 rounded-full border border-brand-accent/20 animate-pulse-slow"></div>
                </>
            )}
        </div>
      </button>
    </div>
  );
};