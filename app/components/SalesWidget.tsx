'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Minimize2, Maximize2 } from 'lucide-react';

interface WidgetProps {
  activeApp: 'hubspot' | 'clari' | 'dealhub' | 'gmail';
  contextualPrompts: string[];
}

export function SalesWidget({ activeApp, contextualPrompts }: WidgetProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // Set initial position after mount
    setPosition({ 
      x: typeof window !== 'undefined' ? window.innerWidth - 420 : 0, 
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
        
        // Keep widget within window bounds
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
      {/* Header - Always visible */}
      <div
        className="drag-handle h-12 flex items-center justify-between px-4 bg-blue-600 text-white rounded-t-lg cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          {isExpanded && <span>Sales Assistant ({activeApp})</span>}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-blue-700 p-1 rounded"
        >
          {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-b-lg">
          {/* Contextual Prompts */}
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-500 mb-2">Suggested actions:</div>
            {contextualPrompts.map((prompt, index) => (
              <button
                key={index}
                className="w-full text-left p-2 text-sm hover:bg-gray-50 rounded text-blue-600 hover:text-blue-700"
                onClick={() => setInputValue(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="mt-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything..."
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && console.log('Send:', inputValue)}
            />
          </div>
        </div>
      )}
    </div>
  );
}