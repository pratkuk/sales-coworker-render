'use client';

import { useState, useEffect } from 'react';
import { AppType, EmailItem, DealItem } from '../types';
import { SalesWidget } from './SalesWidget';
import { Walkthrough } from './Walkthrough';

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

const mockData = {
  hubspot: [
    { id: '1', name: 'Enterprise Deal', company: 'TechCorp', amount: 50000, stage: 'Negotiation' },
    { id: '2', name: 'Product Expansion', company: 'InnovateInc', amount: 75000, stage: 'Discovery' },
  ] as DealItem[],
  gmail: [
    { id: '1', subject: 'Contract Review', from: 'legal@company.com', type: 'contract', preview: 'Please review...', date: 'Today' },
    { id: '2', subject: 'Meeting Notes', from: 'team@company.com', type: 'meeting', preview: 'Following up...', date: 'Yesterday' },
  ] as EmailItem[],
  clari: [
    { id: '1', name: 'Q1 Planning', company: 'BigCorp', amount: 100000, stage: 'Planning' },
    { id: '2', name: 'Market Expansion', company: 'GrowthInc', amount: 150000, stage: 'Analysis' },
  ] as DealItem[],
  dealhub: [
    { id: '1', name: 'Service Contract', company: 'ServiceCo', amount: 80000, stage: 'Draft' },
    { id: '2', name: 'Platform License', company: 'TechFirm', amount: 120000, stage: 'Review' },
  ] as DealItem[]
};

export function SalesCoworker() {
  const [activeApp, setActiveApp] = useState<AppType>('hubspot');
  const [selectedItem, setSelectedItem] = useState<EmailItem | DealItem | null>(null);
  const [showWalkthrough, setShowWalkthrough] = useState(true);

  useEffect(() => {
    // Check if user has seen walkthrough before
    const hasSeenWalkthrough = localStorage.getItem('hasSeenWalkthrough');
    if (hasSeenWalkthrough) {
      setShowWalkthrough(false);
    }
  }, []);

  const handleWalkthroughComplete = () => {
    setShowWalkthrough(false);
    localStorage.setItem('hasSeenWalkthrough', 'true');
  };

  const getSuggestions = (app: AppType, item: EmailItem | DealItem | null) => {
    if (!item) return DEFAULT_SUGGESTIONS[app];

    if ('subject' in item) {
      return [
        `Draft response to "${item.subject}"`,
        'Summarize email thread',
        'Extract key action items',
        'Schedule follow-up'
      ];
    }

    return [
      `Analyze ${item.company} deal opportunity`,
      `Generate meeting agenda for ${item.name}`,
      `Create follow-up tasks for ${item.stage} stage`,
      'Prepare deal summary'
    ];
  };

  const renderItemContent = (item: EmailItem | DealItem) => {
    if ('subject' in item) {
      return (
        <div>
          <div className="font-medium">{item.subject}</div>
          <div className="text-sm text-gray-600">{item.from}</div>
        </div>
      );
    }
    
    return (
      <div>
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-600">{item.company} - ${item.amount.toLocaleString()}</div>
      </div>
    );
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
                setSelectedItem(null);
              }}
              className={`px-4 py-2 rounded-lg ${activeApp === app ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {app.charAt(0).toUpperCase() + app.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {mockData[activeApp]?.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedItem?.id === item.id ? 'bg-blue-50' : ''}`}
            >
              {renderItemContent(item)}
            </div>
          ))}
        </div>
      </div>

      <SalesWidget 
        activeApp={activeApp}
        suggestions={getSuggestions(activeApp, selectedItem)}
        isOpen={true}
      />

      {showWalkthrough && <Walkthrough onComplete={handleWalkthroughComplete} />}
    </div>
  );
}