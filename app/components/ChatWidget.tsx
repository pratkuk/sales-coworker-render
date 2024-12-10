'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  Sparkles, 
  Send, 
  X,
  ChevronRight,
  Info
} from 'lucide-react';

interface ChatWidgetProps {
  selectedDeal: any;
  prompts: string[];
  onSendMessage: (message: string) => void;
}

export function ChatWidget({ selectedDeal, prompts, onSendMessage }: ChatWidgetProps) {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'chat'>('suggestions');
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedPlatform, setPlatform] = useState<'hubspot' | 'gmail' | 'dealhub'>('hubspot');

  const handleSend = () => {
    if (customPrompt.trim()) {
      onSendMessage(customPrompt);
      setCustomPrompt('');
    }
  };

  return (
    <div className="fixed bottom-0 right-4 w-96 bg-white shadow-lg border rounded-t-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <span className="font-medium">AI Assistant ({selectedPlatform})</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Platform Selection */}
      <div className="p-3 flex space-x-2">
        {['hubspot', 'gmail', 'dealhub'].map((platform) => (
          <button
            key={platform}
            onClick={() => setPlatform(platform as any)}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedPlatform === platform
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {platform}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="h-[400px] overflow-y-auto p-4">
        {activeTab === 'suggestions' ? (
          <div className="space-y-4">
            {/* Competitor Alert */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium">Competitor Alert</h3>
                  <p className="text-sm text-gray-600 mb-2">Recently switched from competitor X</p>
                  <p className="text-sm text-blue-600 mb-1">
                    3 similar migration success stories available - click to view
                  </p>
                  <button className="text-sm text-blue-600 flex items-center hover:underline">
                    View success stories
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Other Suggestions */}
            {prompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => onSendMessage(prompt)}
                className="w-full text-left p-3 text-sm hover:bg-gray-50 rounded"
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Chat content would go here */}
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-2 text-sm ${
              activeTab === 'suggestions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('suggestions')}
          >
            Suggestions
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm ${
              activeTab === 'chat' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            Chat
          </button>
        </div>

        {/* Input Area */}
        <div className="p-3 flex space-x-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-md"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}