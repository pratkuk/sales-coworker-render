'use client';

import { useState } from 'react';
import { SalesWidget } from './components/SalesWidget';

type AppType = 'hubspot' | 'clari' | 'dealhub' | 'gmail';

// Contextual prompts based on active app
const getContextualPrompts = (app: AppType) => {
  switch (app) {
    case 'hubspot':
      return [
        "Draft a follow-up email for this deal",
        "Analyze win probability",
        "Generate meeting summary",
        "Create task list for next steps",
        "Summarize deal history"
      ];
    case 'clari':
      return [
        "Generate forecast analysis",
        "Compare to last quarter",
        "Identify risk factors",
        "Create revenue projection",
        "Analyze pipeline changes"
      ];
    case 'dealhub':
      return [
        "Generate quote",
        "Create proposal draft",
        "Compare pricing options",
        "Review deal terms",
        "Calculate discounts"
      ];
    case 'gmail':
      return [
        "Draft response email",
        "Summarize email thread",
        "Create meeting agenda",
        "Extract action items",
        "Schedule follow-up"
      ];
  }
};

export default function Home() {
  const [activeApp, setActiveApp] = useState<AppType>('hubspot');

  return (
    <main className="min-h-screen bg-gray-100">
      {/* App Switcher */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 py-3">
            {(['hubspot', 'clari', 'dealhub', 'gmail'] as AppType[]).map((app) => (
              <button
                key={app}
                onClick={() => setActiveApp(app)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeApp === app
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {app.charAt(0).toUpperCase() + app.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* App Content (Simulated) */}
      <div className="pt-16 p-4">
        {/* Example content for each app */}
        {activeApp === 'hubspot' && (
          <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Deals</h1>
            {/* Add simulated Hubspot UI here */}
          </div>
        )}
        {/* Add similar blocks for other apps */}
      </div>

      {/* Sales Widget - Floats above everything */}
      <SalesWidget 
        activeApp={activeApp}
        contextualPrompts={getContextualPrompts(activeApp)}
      />
    </main>
  );
}