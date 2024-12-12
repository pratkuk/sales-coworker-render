'use client';

import { useState, useEffect, useRef } from 'react';
import { Lightbulb, X } from 'lucide-react';
import type { WidgetProps } from '../types';

type Message = {
  text: string;
  isUser: boolean;
  suggestions?: string[];
};

interface Position {
  x: number;
  y: number;
}

export function SalesWidget({ activeApp, suggestions, isOpen = true, selectedDeal }: WidgetProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [position, setPosition] = useState<Position>({ 
    x: typeof window !== 'undefined' ? window.innerWidth - 100 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight - 100 : 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [shouldExpand, setShouldExpand] = useState(false);
  
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDeal) {
      setIsExpanded(true);
      setMessages([{
        text: `Let me help you with the ${selectedDeal.company} deal`,
        isUser: false,
        suggestions: [
          `Analyze risk factors for ${selectedDeal.company} ($${selectedDeal.amount.toLocaleString()})`,
          `Generate follow-up tasks for ${selectedDeal.lastActivity}`,
          `Prepare meeting agenda for ${selectedDeal.nextActivity}`,
          `Create deal summary for ${selectedDeal.company}`
        ]
      }]);
    }
  }, [selectedDeal]);

  useEffect(() => {
    if (!selectedDeal) {
      setMessages([]);
    }
  }, [activeApp]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      setIsDragging(true);
      setShouldExpand(false);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && widgetRef.current) {
      setShouldExpand(false);
      const newX = Math.min(Math.max(0, e.clientX - dragOffset.x), window.innerWidth - widgetRef.current.offsetWidth);
      const newY = Math.min(Math.max(0, e.clientY - dragOffset.y), window.innerHeight - widgetRef.current.offsetHeight);
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    setIsDragging(false);
    if (shouldExpand) {
      setIsExpanded(true);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, isUser: true }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: `Here's a response for your question about ${selectedDeal?.company || 'this deal'}...`,
          isUser: false
        }]);
      }, 1000);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      setIsExpanded(true);
    }
  };

  return (
    <div
      ref={widgetRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
      }}
      className="select-none"
    >
      {isExpanded ? (
        <div className="w-80 backdrop-blur-sm bg-white/30 rounded-lg shadow-xl flex flex-col" style={{ height: '500px' }}>
          <div 
            className="p-4 backdrop-blur-sm bg-white/40 rounded-t-lg flex justify-between items-center cursor-move"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              <span className="font-medium">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-black/5 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index}>
                <div className={`p-3 rounded-2xl max-w-[80%] ${
                  message.isUser 
                    ? 'ml-auto backdrop-blur-sm bg-blue-500/80 text-white rounded-br-none'
                    : 'backdrop-blur-sm bg-white/50 text-gray-800 rounded-bl-none'
                }`}>
                  {message.text}
                </div>
                {message.suggestions && (
                  <div className="mt-4 space-y-2">
                    {message.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        className="w-full p-3 backdrop-blur-sm bg-white/50 rounded-lg text-left hover:bg-white/60 transition-colors"
                        onClick={() => {
                          setMessages(prev => [...prev, 
                            { text: suggestion, isUser: true },
                            { text: `I'll help you ${suggestion.toLowerCase()}...`, isUser: false }
                          ]);
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {messages.length === 0 && suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full p-3 backdrop-blur-sm bg-white/50 rounded-lg text-left hover:bg-white/60 transition-colors"
                onClick={() => {
                  setMessages(prev => [...prev, 
                    { text: suggestion, isUser: true },
                    { text: `Here's a response for: ${suggestion}`, isUser: false }
                  ]);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="p-4 backdrop-blur-sm bg-white/40">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded-full backdrop-blur-sm bg-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 rounded-full backdrop-blur-sm bg-blue-500/80 text-white hover:bg-blue-600/80 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={handleClick}
          onMouseDown={(e) => {
            handleMouseDown(e);
            setShouldExpand(true);
          }}
          className="w-12 h-12 rounded-full backdrop-blur-sm bg-blue-500/80 hover:bg-blue-600/80 text-white flex items-center justify-center shadow-lg"
        >
          <Lightbulb className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}