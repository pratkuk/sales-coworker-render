'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Minimize2, Maximize2, Send, Info } from 'lucide-react';
import { getPromptContext } from './PromptContexts';

interface WidgetProps {
  activeApp: 'hubspot' | 'clari' | 'dealhub' | 'gmail';
  contextualPrompts: string[];
}

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

export function SalesWidget({ activeApp, contextualPrompts }: WidgetProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isInChat, setIsInChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hoverPrompt, setHoverPrompt] = useState<string | null>(null);
  
  const widgetRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setIsMounted(true);
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    setPosition({ 
      x: width - 420, 
      y: 100 
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof Element && e.target.closest('.drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && widgetRef.current) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        const maxX = window.innerWidth - widgetRef.current.offsetWidth;
        const maxY = window.innerHeight - widgetRef.current.offsetHeight;
        
        setPosition({
          x: Math.min(Math.max(0, newX), maxX),
          y: Math.min(Math.max(0, newY), maxY)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, isMounted]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: `I'll help you with: ${inputValue}. [AI response placeholder]` 
      }]);
    }, 1000);

    setInputValue('');
  };

  const startNewChat = (prompt: string = '') => {
    setIsInChat(true);
    if (prompt) {
      setInputValue(prompt);
    }
  };

  if (!isMounted) return null;

  return (
    <div
      ref={widgetRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: isExpanded ? '400px' : '48px',
        zIndex: 9999,
      }}
      className={`bg-white rounded-lg shadow-lg transition-all duration-200 ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
    >
      {/* Header */}
      <div
        className="drag-handle h-12 flex items-center justify-between px-4 bg-blue-600 text-white rounded-t-lg cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          {isExpanded && (
            <div className="flex items-center gap-2">
              <span>Sales Assistant ({activeApp})</span>
              {isInChat && (
                <button 
                  onClick={() => setIsInChat(false)}
                  className="text-xs bg-blue-700 px-2 py-1 rounded"
                >
                  Back
                </button>
              )}
            </div>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-blue-700 p-1 rounded"
        >
          {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-b-lg">
          {!isInChat ? (
            <>
              {/* Suggested Actions */}
              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-500 mb-2">Suggested actions:</div>
                {contextualPrompts.map((prompt, index) => {
                  const context = getPromptContext(prompt, activeApp);
                  return (
                    <div key={index} className="relative group">
                      <button
                        className="w-full text-left p-2 text-sm hover:bg-blue-50 rounded text-blue-600 hover:text-blue-700"
                        onClick={() => startNewChat(prompt)}
                        onMouseEnter={() => setHoverPrompt(prompt)}
                        onMouseLeave={() => setHoverPrompt(null)}
                      >
                        {prompt}
                      </button>
                      {hoverPrompt === prompt && (
                        <div className="absolute z-10 p-3 bg-gray-800 text-white text-xs rounded shadow-lg max-w-xs -right-2 translate-x-full">
                          <p className="font-medium mb-2">{context.description}</p>
                          <div className="mt-2 pt-2 border-t border-gray-700">
                            <p className="flex items-center gap-1 text-blue-300">
                              <Info size={12} />
                              <span>Why this suggestion?</span>
                            </p>
                            <p className="text-gray-300 mt-1">{context.reason}</p>
                          </div>
                          {context.example && (
                            <div className="mt-2 pt-2 border-t border-gray-700">
                              <p className="text-gray-300">{context.example}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                <button
                  onClick={() => startNewChat()}
                  className="w-full mt-4 text-center p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded text-gray-600"
                >
                  Start custom chat
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Chat Interface */}
              <div className="h-80 overflow-y-auto mb-4 space-y-3">
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-2 rounded-lg ${
                      msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={!inputValue.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}