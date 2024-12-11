'use client';

import { useState } from 'react';

interface WalkthroughProps {
  onComplete: () => void;
}

export function Walkthrough({ onComplete }: WalkthroughProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="relative h-full">
        {/* Top Section - Apps */}
        <div className="absolute top-0 left-0 p-8 text-white">
          <div className="border-2 border-white rounded p-4">
            <h2 className="text-lg font-bold mb-2">Typical apps that an AE uses</h2>
            <p>Switch between different sales applications you use throughout the day</p>
          </div>
        </div>

        {/* Middle Section - Content */}
        <div className="absolute top-40 left-0 p-8 text-white">
          <div className="border-2 border-white rounded p-4">
            <h2 className="text-lg font-bold mb-2">Different entities under each app</h2>
            <p>Select deals, emails, or other items to get contextual AI assistance</p>
          </div>
        </div>

        {/* Bottom Section - AI Assistant */}
        <div className="absolute bottom-40 right-20 text-white">
          <div className="border-2 border-white rounded p-4 max-w-md">
            <h2 className="text-lg font-bold mb-2">AI Assistant</h2>
            <ul className="space-y-2 list-disc pl-4 mb-4">
              <li>Hovering widget to invoke the AI agent</li>
              <li>Provides contextual suggestive prompts based on the app and selected item</li>
              <li>Builds context across all your tools</li>
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onComplete}
          className="absolute bottom-20 right-20 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {"Let's go!"}
        </button>
      </div>
    </div>
  );
}