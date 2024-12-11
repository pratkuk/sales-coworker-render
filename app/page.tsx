'use client';

import { useState } from 'react';
import { EmailList } from './components/EmailList';
import { SalesWidget } from './components/SalesWidget';

const mockEmails = [
  {
    id: '1',
    subject: 'RE: Technical Review Meeting',
    from: 'john@acme.com',
    time: '10:30 AM'
  },
  {
    id: '2',
    subject: 'Updated Proposal Draft',
    from: 'sarah@techstart.com',
    time: 'Yesterday'
  },
  {
    id: '3',
    subject: 'Security Requirements Doc',
    from: 'tech@global.com',
    time: '2 days ago'
  }
];

const getContextualSuggestions = (selectedEmail: any) => {
  if (!selectedEmail) return [];
  
  if (selectedEmail.subject.includes('Technical Review')) {
    return [
      `Draft follow-up email for "${selectedEmail.subject}"`,
      "Generate meeting minutes",
      "Create action items list",
      "Schedule next meeting",
      "Share Security requirements added with team"
    ];
  }
  
  return [
    "Draft response email",
    "Summarize email thread",
    "Create action items",
    "Schedule follow-up",
    "Start custom chat"
  ];
};

export default function Home() {
  const [activeApp, setActiveApp] = useState('gmail');
  const [selectedEmail, setSelectedEmail] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Switcher */}
      <div className="p-4">
        {['Hubspot', 'Clari', 'Dealhub', 'Gmail'].map((app) => (
          <button
            key={app}
            onClick={() => setActiveApp(app.toLowerCase())}
            className={`mr-2 px-3 py-1 border rounded ${
              activeApp === app.toLowerCase() ? 'border-blue-500 bg-blue-50' : ''
            }`}
          >
            {app}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-8">
        <EmailList 
          emails={mockEmails}
          onSelect={setSelectedEmail}
          selectedId={selectedEmail?.id}
        />
      </div>

      {/* Widget */}
      <SalesWidget 
        activeApp={activeApp}
        selectedItem={selectedEmail}
        suggestions={getContextualSuggestions(selectedEmail)}
      />
    </div>
  );
}