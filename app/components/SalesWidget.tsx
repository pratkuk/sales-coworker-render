'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Minimize2, Maximize2, Send, Info } from 'lucide-react';
import { getPromptContext } from './PromptContexts';

// ... (keep all the interfaces and other imports)

export function SalesWidget({ activeApp, contextualPrompts }: WidgetProps) {
  // ... (keep all the existing state and handlers)

  const getTooltipContent = (prompt: string) => {
    const context = getPromptContext(prompt, activeApp);
    return (
      <div className="space-y-2">
        <p>{context.description}</p>
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
    );
  };

  // ... (keep all the rendering logic, but update the tooltip to use getTooltipContent)