'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Minimize2, Maximize2, Send } from 'lucide-react';

interface WidgetProps {
  activeApp: 'hubspot' | 'clari' | 'dealhub' | 'gmail';
  contextualPrompts: string[];
}

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

interface PromptInfo {
  prompt: string;
  description: string;
  example?: string;
}

const getPromptInfo = (prompt: string): PromptInfo => {
  const promptsInfo: { [key: string]: PromptInfo } = {
    "Draft a follow-up email for this deal": {
      prompt: "Draft a follow-up email for this deal",
      description: "Generate a personalized follow-up email based on the latest interaction and deal stage",
      example: "Example: Professional email with key points from last meeting and clear next steps"
    },
    "Analyze win probability": {
      prompt: "Analyze win probability",
      description: "Calculate deal success likelihood based on historical data and current engagement",
      example: "Considers factors like deal size, stage duration, and customer engagement"
    },
    // Add more prompt descriptions as needed
  };
  return promptsInfo[prompt] || { prompt, description: prompt };
};

export function SalesWidget({ activeApp, contextualPrompts }: WidgetProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isInChat, setIsInChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hoverPrompt, setHoverPrompt] = useState<PromptInfo | null>(null);
  
  const widgetRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    
    // Simulate AI response
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
      // You might want to auto-send the prompt or let user modify it first
    }
  };

  // ... (keep the drag handling code)

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
                  const promptInfo = getPromptInfo(prompt);
                  return (
                    <div key={index} className="relative">
                      <button
                        className="w-full text-left p-2 text-sm hover:bg-blue-50 rounded text-blue-600 hover:text-blue-700"
                        onClick={() => startNewChat(prompt)}
                        onMouseEnter={() => setHoverPrompt(promptInfo)}
                        onMouseLeave={() => setHoverPrompt(null)}
                      >
                        {prompt}
                      </button>
                      {hoverPrompt?.prompt === prompt && (
                        <div className="absolute z-10 p-2 bg-gray-800 text-white text-xs rounded shadow-lg max-w-xs -right-2 translate-x-full">
                          <p>{hoverPrompt.description}</p>
                          {hoverPrompt.example && (
                            <p className="mt-1 text-gray-300">{hoverPrompt.example}</p>
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