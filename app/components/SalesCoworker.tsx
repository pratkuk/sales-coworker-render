'use client';

import { useState, useEffect } from 'react';
import { AppType, EmailItem, DealItem } from '../types';
import { SalesWidget } from './SalesWidget';
import { Walkthrough } from './Walkthrough';
import { HubSpotDeals } from './HubspotDeals';

interface Deal {
  company: string;
  amount: number;
  closeDate: string;
  lastActivity: string;
  nextActivity: string;
}

const DEFAULT_SUGGESTIONS = {
  hubspot: [
    'Show deals closing this month',
    'Analyze pipeline health',
    'Identify at-risk opportunities'
  ],
  clari: [
    'Generate forecast summary',
    'Show confidence analysis',
    'Identify forecast gaps'
  ],
  dealhub: [
    'List pending proposals',
    'Show proposal templates',
    'Track document engagement'
  ],
  gmail: [
    'Show unread priority emails',
    'Draft follow-up email',
    'Schedule meeting with team'
  ]
};

export function SalesCoworker() {
  const [activeApp, setActiveApp] = useState<AppType>('hubspot');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showWalkthrough, setShowWalkthrough] = useState(true);

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

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
  };

  const getSuggestions = () => {
    if (selectedDeal) {
      return [
        `Analyze ${selectedDeal.company} deal opportunity`,
        `Generate meeting agenda for next steps`,
        `Create follow-up tasks based on ${selectedDeal.lastActivity}`,
        'Prepare deal summary'
      ];
    }
    return DEFAULT_SUGGESTIONS[activeApp];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4">
        <div className="flex gap-4">
          {(['hubspot', 'clari', 'dealhub', 'gmail'] as AppType[]).map(app => (
            <button
              key={app}
              onClick={() => {
                setActiveApp(app);
                setSelectedDeal(null);
              }}
              className={`px-4 py-2 rounded-lg ${activeApp === app ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {app.charAt(0).toUpperCase() + app.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        {activeApp === 'hubspot' ? (
          <HubSpotDeals onDealClick={handleDealClick} />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Other app content */}
          </div>
        )}
      </div>

      <SalesWidget 
        activeApp={activeApp}
        suggestions={getSuggestions()}
        isOpen={true}
        selectedDeal={selectedDeal}
      />

      {showWalkthrough && <Walkthrough onComplete={handleWalkthroughComplete} />}
    </div>
  );
}