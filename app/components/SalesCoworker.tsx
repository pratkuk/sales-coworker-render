'use client';

import { useState, useEffect } from 'react';
import { HubspotView, ClariView, DealhubView, GmailView } from './MockUIs';
import { SalesWidget } from './SalesWidget';
import { getContextualPrompts } from './getContextualPrompts';
import { Walkthrough } from './Walkthrough';

type AppType = 'hubspot' | 'clari' | 'dealhub' | 'gmail';

export function SalesCoworker() {
  const [activeApp, setActiveApp] = useState<AppType>('hubspot');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showWalkthrough, setShowWalkthrough] = useState(true);

  // Handle first-time visit
  useEffect(() => {
    const hasSeenWalkthrough = localStorage.getItem('hasSeenWalkthrough');
    if (hasSeenWalkthrough) {
      setShowWalkthrough(false);
    }
  }, []);

  const handleWalkthroughComplete = () => {
    setShowWalkthrough(false);
    localStorage.setItem('hasSeenWalkthrough', 'true');
  };

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
  };

  const handleAppChange = (app: AppType) => {
    setActiveApp(app);
    setSelectedItem(null); // Clear selection when changing apps
  };

  const renderActiveView = () => {
    const props = {
      onSelect: handleItemSelect,
      selectedId: selectedItem?.id
    };

    switch (activeApp) {
      case 'hubspot':
        return <HubspotView {...props} />;
      case 'clari':
        return <ClariView {...props} />;
      case 'dealhub':
        return <DealhubView {...props} />;
      case 'gmail':
        return <GmailView {...props} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* App Switcher */}
        <div className="p-4 bg-white border-b">
          {(['hubspot', 'clari', 'dealhub', 'gmail'] as AppType[]).map((app) => (
            <button
              key={app}
              onClick={() => handleAppChange(app)}
              className={`mr-2 px-3 py-1 rounded-lg transition-colors ${
                activeApp === app 
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-500 font-medium' 
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
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

      {/* Walkthrough Overlay */}
      {showWalkthrough && (
        <Walkthrough onComplete={handleWalkthroughComplete} />
      )}
    </>
  );
}