'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Minimize2, X } from 'lucide-react';
import { WidgetProps } from '../types';

export function SalesWidget({ activeApp, suggestions, isOpen = true }: WidgetProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{text: string; isUser: boolean}[]>([]);

  useEffect(() => {
    // Reset messages when app changes
    setMessages([]);
  }, [activeApp]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: `Here's a response based on your ${activeApp} context...`,
          isUser: false
        }]);
      }, 1000);
    }
  };

  if (!isExpanded) {
    return (
      <div
        className="fixed bottom-4 right-4 cursor-pointer bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsExpanded(true)}
      >
        <MessageCircle size={24} />
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl w-80 flex flex-col"
      style={{ height: '500px' }}
    >
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} />
          <span>AI Assistant</span>
        </div>
        <div className="flex gap-2">
          <Minimize2
            size={18}
            className="cursor-pointer"
            onClick={() => setIsExpanded(false)}
          />
          <X 
            size={18} 
            className="cursor-pointer" 
            onClick={() => setIsExpanded(false)} 
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => {
                setMessages(prev => [...prev, 
                  { text: suggestion, isUser: true },
                  { text: `Here's a response for: ${suggestion}`, isUser: false }
                ]);
              }}
            >
              {suggestion}
            </div>
          ))}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${message.isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-100'} max-w-[80%]`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}