'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Minimize2, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface SalesWidgetProps {
  selectedDeal: any;
  prompts: string[];
  onSendMessage: (message: string) => void;
}

const SalesWidget = ({ selectedDeal, prompts, onSendMessage }: SalesWidgetProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [input, setInput] = useState('');
  
  const widgetRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      const maxX = window.innerWidth - (widgetRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (widgetRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <Card
      ref={widgetRef}
      className={`fixed shadow-lg transition-all duration-200 ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isExpanded ? '320px' : '48px',
        height: isExpanded ? '400px' : '48px',
        transform: 'translate(0, 0)',
        zIndex: 1000
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header/Drag Handle */}
      <div className="drag-handle h-12 flex items-center justify-between px-3 bg-primary text-primary-foreground cursor-grab rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} />
          {isExpanded && <span>Sales Assistant</span>}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/20"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </Button>
          {isExpanded && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/20"
              onClick={() => setIsExpanded(false)}
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 flex flex-col h-[calc(400px-3rem)]">
          {/* Suggestions */}
          <div className="mb-4 space-y-2">
            <p className="text-sm text-muted-foreground">Suggestions:</p>
            {prompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => {
                  onSendMessage(prompt);
                  setInput('');
                }}
              >
                {prompt}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="mt-auto">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="w-full"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default SalesWidget;