'use client';

import { useState } from 'react';
import { 
  UserCircle, 
  Building2, 
  DollarSign, 
  Calendar,
  MessageSquare,
  Send,
  Sparkles
} from 'lucide-react';

interface Deal {
  id: number;
  companyName: string;
  stage: string;
  value: number;
  nextStep: string;
  lastContact: string;
  probability: number;
}

const sampleDeal: Deal = {
  id: 1,
  companyName: "Acme Corp",
  stage: "Proposal",
  value: 50000,
  nextStep: "Schedule technical review",
  lastContact: "2024-12-05",
  probability: 60
};

const suggestedPrompts = [
  "Draft a follow-up email",
  "Generate meeting agenda",
  "Summarize deal history",
  "Create proposal outline"
];

export default function SalesCoworker() {
  const [selectedDeal, setSelectedDeal] = useState<Deal>(sampleDeal);
  const [customPrompt, setCustomPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'assistant', message: string}>>([]);

  const handleSendPrompt = (prompt: string) => {
    // Add user message to chat
    setChatHistory([...chatHistory, { type: 'user', message: prompt }]);
    // Here we'll later add actual AI response logic
    setChatHistory(prev => [...prev, { 
      type: 'assistant', 
      message: `This is a placeholder response for: ${prompt}` 
    }]);
    setCustomPrompt('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
        {/* CRM Side */}
        <div className="col-span-2 space-y-4">
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

        {/* AI Assistant Side */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">AI Assistant</h2>
            </div>
            
            {/* Suggested Prompts */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Suggested Actions:</p>
              <div className="space-y-2">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendPrompt(prompt)}
                    className="w-full text-left p-2 text-sm rounded-lg hover:bg-blue-50 text-blue-600"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat History */}
            <div className="h-64 overflow-y-auto mb-4 space-y-3 border rounded-lg p-3">
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
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}