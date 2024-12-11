'use client';

import { useState } from 'react';
import { AppType } from '../types';
import { SalesWidget } from './SalesWidget';
import { getContextualPrompts } from './getContextualPrompts';

export const SalesCoworker = () => {
  const [activeApp, setActiveApp] = useState<AppType>('hubspot');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showWalkthrough, setShowWalkthrough] = useState(true);

  // Mock items data
  const mockItems = {
    hubspot: [
      { id: '1', name: 'Enterprise Deal', company: 'TechCorp', amount: 50000, stage: 'Negotiation' },
      { id: '2', name: 'Product Expansion', company: 'InnovateInc', amount: 75000, stage: 'Discovery' },
    ],
    gmail: [
      { id: '1', subject: 'Contract Review', from: 'legal@company.com', type: 'contract' },
      { id: '2', subject: 'Meeting Notes', from: 'team@company.com', type: 'meeting' },
    ],
  };

  const handleAppSwitch = (app: AppType) => {
    setActiveApp(app);
    setSelectedItem(null);
  };

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Switcher */}
      <div className="bg-white border-b p-4">
        <div className="flex gap-4">
          {(['hubspot', 'clari', 'dealhub', 'gmail'] as AppType[]).map(app => (
            <button
              key={app}
              onClick={() => handleAppSwitch(app)}
              className={`px-4 py-2 rounded-lg ${activeApp === app ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {app.charAt(0).toUpperCase() + app.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Render items based on active app */}
          {mockItems[activeApp as keyof typeof mockItems]?.map(item => (
            <div
              key={item.id}
              onClick={() => handleItemSelect(item)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedItem?.id === item.id ? 'bg-blue-50' : ''}`}
            >
              {/* Render item content based on app type */}
              {activeApp === 'gmail' ? (
                <div>
                  <div className="font-medium">{item.subject}</div>
                  <div className="text-sm text-gray-600">{item.from}</div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.company} - ${item.amount.toLocaleString()}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sales Widget */}
      <SalesWidget 
        activeApp={activeApp}
        suggestions={getContextualPrompts(activeApp, selectedItem)}
        isOpen={true}
      />
    </div>
  );
};