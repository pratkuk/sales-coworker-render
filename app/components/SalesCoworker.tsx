'use client';

import { useState, useEffect } from 'react';
import { 
  Building2, 
  Calendar,
  MessageSquare,
  Send,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CircleDot
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
  const [isAIWidgetExpanded, setIsAIWidgetExpanded] = useState(true);

  useEffect(() => {
    // Update prompts whenever selected deal changes
    setPrompts(getContextualPrompts(selectedDeal));
  }, [selectedDeal]);

  const handleSendPrompt = (prompt: string) => {
    setChatHistory(prev => [...prev, { type: 'user', message: prompt }]);
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'assistant', 
        message: `Processing request for ${selectedDeal.companyName}: ${prompt}` 
      }]);
    }, 500);
    setCustomPrompt('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Main CRM Content */}
        <div className="grid grid-cols-4 gap-4">
          {/* Deals List */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-lg mb-4">Active Deals</h2>
            <div className="space-y-4">
              {deals.map((deal, index) => (
                <div key={deal.id}>
                  <div 
                    onClick={() => setSelectedDeal(deal)}
                    className={`cursor-pointer p-4 rounded-lg transition-all relative ${
                      selectedDeal.id === deal.id 
                        ? 'bg-blue-50 border-blue-500 border-2'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start">
                      <CircleDot className={`w-4 h-4 mt-1 mr-3 ${
                        deal.status === 'active' ? 'text-green-500' :
                        deal.status === 'stalled' ? 'text-yellow-500' :
                        'text-red-500'
                      }`} />
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{deal.companyName}</h3>
                            <p className="text-sm text-gray-500">${deal.value.toLocaleString()}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            deal.status === 'active' ? 'bg-green-100 text-green-700' :
                            deal.status === 'stalled' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">{deal.stage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < deals.length - 1 && (
                    <div className="border-b border-gray-200 my-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CRM Main Content */}
          <div className="col-span-3 space-y-4">
            {/* Deal Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Building2 className="w-8 h-8 text-blue-500" />
                  <div>
                    <h1 className="text-2xl font-bold">{selectedDeal.companyName}</h1>
                    <p className="text-gray-500">Deal Value: ${selectedDeal.value.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">{selectedDeal.stage}</p>
                  <p className="text-sm text-gray-500">{selectedDeal.probability}% Probability</p>
                </div>
              </div>
            </div>

            {/* Deal Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="font-semibold mb-2">Next Steps</h2>
                  <p className="text-gray-600">{selectedDeal.nextStep}</p>
                </div>
                <div>
                  <h2 className="font-semibold mb-2">Last Contact</h2>
                  <p className="text-gray-600">{selectedDeal.lastContact}</p>
                </div>
              </div>
            </div>

            {/* Timeline/Activities */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-semibold mb-4">Recent Activities</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">Discovery Call Completed</p>
                    <p className="text-sm text-gray-500">Dec 5, 2024</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">Email Follow-up Sent</p>
                    <p className="text-sm text-gray-500">Dec 7, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating AI Assistant Widget */}
        <div className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg transition-all transform ${
          isAIWidgetExpanded ? 'h-[600px]' : 'h-12'
        }`}>
          {/* Widget Header */}
          <div 
            className="flex items-center justify-between p-3 bg-blue-500 text-white rounded-t-lg cursor-pointer"
            onClick={() => setIsAIWidgetExpanded(!isAIWidgetExpanded)}
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-semibold">AI Assistant</h2>
            </div>
            {isAIWidgetExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
          </div>

          {/* Widget Content - Only visible when expanded */}
          {isAIWidgetExpanded && (
            <div className="p-4 h-[calc(100%-48px)] flex flex-col">
              {/* Suggested Prompts */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Suggested Actions:</p>
                <div className="space-y-2">
                  {prompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendPrompt(prompt)}
                      className="w-full text-left p-2 text-sm rounded-lg hover:bg-blue-50 text-blue-600 transition-colors border border-transparent hover:border-blue-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat History */}
              <div className="flex-grow overflow-y-auto mb-4 space-y-3 border rounded-lg p-3">
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
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Ask anything about this deal..."
                  className="flex-1 p-2 border rounded-lg"
                  onKeyDown={(e) => e.key === 'Enter' && customPrompt && handleSendPrompt(customPrompt)}
                />
                <button
                  onClick={() => customPrompt && handleSendPrompt(customPrompt)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}