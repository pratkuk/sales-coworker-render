'use client';

import { useState, useEffect } from 'react';
import { 
  Search,
  Filter,
  Download,
  Settings,
  ChevronDown,
  UserCircle
} from 'lucide-react';
import { Deal } from '../types';
import { ChatWidget } from './ChatWidget';

// Define the deals data
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
  // Base prompts for all deals
  let contextualPrompts = [
    `Draft a follow-up email to ${deal.companyName}`,
    `Summarize ${deal.companyName} deal history`,
  ];

  // Stage-specific prompts
  switch (deal.stage) {
    case "Discovery":
      contextualPrompts.push(
        "Generate discovery call agenda",
        "Create qualification questions list",
        "Draft needs assessment document"
      );
      break;
    case "Proposal":
      contextualPrompts.push(
        "Generate proposal outline",
        "Calculate ROI projections",
        "Create technical review agenda"
      );
      break;
    case "Negotiation":
      contextualPrompts.push(
        "Draft pricing comparison",
        "Create negotiation strategy",
        `Generate ${deal.companyName} contract terms`
      );
      break;
  }

  return contextualPrompts.slice(0, 5);
};

export function SalesCoworker() {
  const [selectedDeal, setSelectedDeal] = useState<Deal>(deals[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    setPrompts(getContextualPrompts(selectedDeal));
  }, [selectedDeal]);

  const handleSendMessage = (message: string) => {
    // Handle the message - will be implemented later
    console.log('Message sent:', message);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Top Navigation Bar */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Deals</h1>
          <p className="text-gray-600">({deals.length} records)</p>
          
          <div className="mt-4 flex space-x-2">
            <button className="px-4 py-2 border rounded-md bg-white">Data Quality</button>
            <button className="px-4 py-2 border rounded-md bg-white">Actions</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Create Deal</button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search deals..."
              className="pl-10 pr-4 py-2 w-full border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
              <Settings className="w-4 h-4" />
              <span>Customize</span>
            </button>
          </div>
        </div>

        {/* Deals Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Deal Name</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Stage</th>
                <th className="text-left p-4">Owner</th>
                <th className="text-left p-4">Last Activity</th>
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
                  <td className="p-4">
                    <div className="flex items-center">
                      <UserCircle className="w-10 h-10 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium">{deal.companyName}</div>
                        <div className="text-sm text-gray-500">{deal.nextStep}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">${deal.value.toLocaleString()}</td>
                  <td className="p-4">{deal.stage}</td>
                  <td className="p-4">Unassigned</td>
                  <td className="p-4">{deal.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget 
        selectedDeal={selectedDeal}
        prompts={prompts}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}