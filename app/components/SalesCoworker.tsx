'use client';

import { useState, useEffect } from 'react';
import { 
  Building2, 
  Search,
  MessageCircle,
  Sparkles,
  Filter,
  Plus,
  Download,
  Settings,
  ChevronDown,
  UserCircle
} from 'lucide-react';
import { Deal } from '../types';

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

  // Status-specific prompts
  if (deal.status === 'stalled') {
    contextualPrompts.push(
      `Create re-engagement plan for ${deal.companyName}`,
      "Draft escalation email to decision maker"
    );
  } else if (deal.status === 'risk') {
    contextualPrompts.push(
      "Generate risk mitigation plan",
      "Create competitive analysis"
    );
  }

  // Time-based prompts
  if (deal.daysInStage > 10) {
    contextualPrompts.push(
      `Create stage progression plan for ${deal.companyName}`,
      "Generate deal acceleration strategies"
    );
  }

  return contextualPrompts.slice(0, 5);
};

export default function SalesCoworker() {
  const [selectedDeal, setSelectedDeal] = useState<Deal>(deals[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'assistant', message: string}>>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'suggestions'>('chat');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPrompts(getContextualPrompts(selectedDeal));
  }, [selectedDeal]);

  const handleSendPrompt = (prompt: string) => {
    setChatHistory(prev => [...prev, { type: 'user', message: prompt }]);
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'assistant', 
        message: `Processing request for ${selectedDeal.companyName}: ${prompt}` 
      }]);
    }, 500);
    setCustomPrompt('');
  };

  return (
    <div className="h-screen flex">
      {/* Main CRM Content */}
      <div className="flex-1 overflow-auto bg-gray-50 p-4">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b mb-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold">Deals</h1>
              <span className="text-gray-500 text-sm">({deals.length} records)</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-3 py-1.5 bg-gray-100 rounded-md text-sm">Data Quality</button>
              <button className="px-3 py-1.5 bg-gray-100 rounded-md text-sm">Actions</button>
              <button className="px-3 py-1.5 bg-orange-500 text-white rounded-md text-sm">Create Deal</button>
            </div>
          </div>

          {/* Filters Row */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search deals..."
                  className="pl-9 pr-4 py-2 border rounded-md w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center space-x-1 px-3 py-2 border rounded-md">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 px-3 py-2 border rounded-md">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-2 border rounded-md">
                <Settings className="h-4 w-4" />
                <span>Customize</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deals Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.map((deal) => (
                <tr 
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  className={`cursor-pointer hover:bg-gray-50 ${selectedDeal.id === deal.id ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <UserCircle className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium">{deal.companyName}</div>
                        <div className="text-sm text-gray-500">{deal.nextStep}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">${deal.value.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      deal.status === 'active' ? 'bg-green-100 text-green-800' :
                      deal.status === 'stalled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">Unassigned</td>
                  <td className="px-6 py-4">{deal.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side Panel */}
      <div className="w-96 border-l bg-white">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'chat' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            <div className="flex items-center justify-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </div>
          </button>
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'suggestions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('suggestions')}
          >
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>AI Suggestions</span>
            </div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="h-[calc(100vh-49px)] flex flex-col">
          {activeTab === 'chat' ? (
            <>
              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-2 ${
                      chat.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}>
                      {chat.message}
                    </div>
                  </div>
                ))}
              </div>
              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-lg"
                    onKeyDown={(e) => e.key === 'Enter' && customPrompt && handleSendPrompt(customPrompt)}
                  />
                  <button
                    onClick={() => customPrompt && handleSendPrompt(customPrompt)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 space-y-2">
              <h3 className="font-medium text-gray-700 mb-4">Suggested Actions</h3>
              {prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleSendPrompt(prompt);
                    setActiveTab('chat');
                  }}
                  className="w-full text-left p-3 text-sm rounded-lg hover:bg-blue-50 text-blue-600 transition-colors border border-transparent hover:border-blue-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}