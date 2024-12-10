'use client';

import { useState } from 'react';
import { HubspotView, ClariView, DealhubView, GmailView } from './MockUIs';
import { SalesWidget } from './SalesWidget';
import { getContextualPrompts } from './getContextualPrompts';

type AppType = 'hubspot' | 'clari' | 'dealhub' | 'gmail';

export function SalesCoworker() {
  const [activeApp, setActiveApp] = useState<AppType>('gmail');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
  };

  const renderActiveView = () => {
    switch (activeApp) {
      case 'hubspot':
        return <HubspotView onSelect={handleItemSelect} selectedId={selectedItem?.id} />;
      case 'clari':
        return <ClariView onSelect={handleItemSelect} selectedId={selectedItem?.id} />;
      case 'dealhub':
        return <DealhubView onSelect={handleItemSelect} selectedId={selectedItem?.id} />;
      case 'gmail':
        return <GmailView onSelect={handleItemSelect} selectedId={selectedItem?.id} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Switcher */}
      <div className="p-4 bg-white border-b">
        {(['hubspot', 'clari', 'dealhub', 'gmail'] as AppType[]).map((app) => (
          <button
            key={app}
            onClick={() => {
              setActiveApp(app);
              setSelectedItem(null);
            }}
            className={`mr-2 px-3 py-1 rounded transition-colors ${
              activeApp === app 
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' 
                : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300'
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

      {/* Sales Widget */}
      <SalesWidget 
        activeApp={activeApp}
        contextualPrompts={getContextualPrompts(activeApp, selectedItem)}
      />
    </div>
  );
}