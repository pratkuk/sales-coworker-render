'use client';

import { useState } from 'react';
import { SalesWidget } from './SalesWidget';
import { HubspotView, ClariView, DealhubView, GmailView } from './MockUIs';

type AppType = 'hubspot' | 'clari' | 'dealhub' | 'gmail';

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

export function SalesCoworker() {
  const [activeApp, setActiveApp] = useState<AppType>('hubspot');

  const renderActiveView = () => {
    switch (activeApp) {
      case 'hubspot':
        return <HubspotView />;
      case 'clari':
        return <ClariView />;
      case 'dealhub':
        return <DealhubView />;
      case 'gmail':
        return <GmailView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Switcher */}
      <div className="p-4 bg-white border-b">
        {(['hubspot', 'clari', 'dealhub', 'gmail'] as AppType[]).map((app) => (
          <button
            key={app}
            onClick={() => setActiveApp(app)}
            className={`mr-2 px-3 py-1 rounded ${
              activeApp === app 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {app.charAt(0).toUpperCase() + app.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {renderActiveView()}
        </div>
      </div>

      {/* Sales Widget - This will float over the UI */}
      <SalesWidget 
        activeApp={activeApp}
        contextualPrompts={getContextualPrompts(activeApp)}
      />
    </div>
  );
}