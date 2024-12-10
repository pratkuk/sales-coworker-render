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

// ... (keep all the interfaces and deal data the same)

export default function SalesCoworker() {
  const [selectedDeal, setSelectedDeal] = useState<Deal>(deals[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'assistant', message: string}>>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [isAIWidgetExpanded, setIsAIWidgetExpanded] = useState(true);

  // ... (keep all the useEffect and handler functions the same)

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

          {/* CRM Main Content - Same as before */}
          <div className="col-span-3 space-y-4">
            {/* ... (keep all the CRM content the same) ... */}
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