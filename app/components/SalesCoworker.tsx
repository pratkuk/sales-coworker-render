'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Deal } from '../types';
import { SalesWidget } from './SalesWidget';  // Changed this line to use named import

const deals: Deal[] = [
  {
    id: 1,
    companyName: "Acme Corp",
    stage: "Proposal",
    value: 50000,
    nextStep: "Schedule technical review",
    lastContact: "2024-12-05",
    probability: 60,
    status: 'active',
    daysInStage: 5
  },
  {
    id: 2,
    companyName: "TechStart Inc",
    stage: "Negotiation",
    value: 75000,
    nextStep: "Follow up on pricing discussion",
    lastContact: "2024-12-08",
    probability: 80,
    status: 'stalled',
    daysInStage: 15
  },
  {
    id: 3,
    companyName: "Global Solutions Ltd",
    stage: "Discovery",
    value: 120000,
    nextStep: "Initial requirements gathering",
    lastContact: "2024-12-09",
    probability: 30,
    status: 'risk',
    daysInStage: 2
  }
];

const getContextualPrompts = (deal: Deal): string[] => {
  return [
    `Draft a follow-up email to ${deal.companyName}`,
    `Create agenda for next meeting with ${deal.companyName}`,
    `Summarize ${deal.companyName} deal history`,
    `Generate call notes template for ${deal.companyName}`,
    `Draft proposal outline for ${deal.companyName}`
  ];
};

export function SalesCoworker() {
  const [selectedDeal, setSelectedDeal] = useState<Deal>(deals[0]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [activeApp, setActiveApp] = useState<'hubspot' | 'clari' | 'dealhub' | 'gmail'>('hubspot');

  useEffect(() => {
    setPrompts(getContextualPrompts(selectedDeal));
  }, [selectedDeal]);

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* App Switcher */}
        <div className="mb-8 flex space-x-4">
          {(['hubspot', 'clari', 'dealhub', 'gmail'] as const).map((app) => (
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Deals</h1>
          <p className="text-gray-600">({deals.length} records)</p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search deals..."
            className="pl-10 pr-4 py-2 w-full border rounded"
          />
        </div>

        {/* Table */}
        <div className="border rounded">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3 font-medium">Deal Name</th>
                <th className="text-left p-3 font-medium">Amount</th>
                <th className="text-left p-3 font-medium">Stage</th>
                <th className="text-left p-3 font-medium">Owner</th>
                <th className="text-left p-3 font-medium">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => (
                <tr 
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  className={`border-b cursor-pointer hover:bg-gray-50 ${
                    selectedDeal.id === deal.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{deal.companyName}</div>
                      <div className="text-sm text-gray-500">{deal.nextStep}</div>
                    </div>
                  </td>
                  <td className="p-3">${deal.value.toLocaleString()}</td>
                  <td className="p-3">
                    <span className="text-sm">{deal.stage}</span>
                  </td>
                  <td className="p-3">Unassigned</td>
                  <td className="p-3">{deal.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sales Widget */}
      <SalesWidget 
        activeApp={activeApp}
        contextualPrompts={prompts}
      />
    </div>
  );
}