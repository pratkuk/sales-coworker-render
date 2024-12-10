'use client';

interface MockItem {
  id: string;
  title: string;
  subtitle: string;
  value?: string;
  status?: string;
  date?: string;
  type?: string;
  context?: {
    stage?: string;
    lastAction?: string;
    priority?: string;
    nextSteps?: string[];
    recentUpdates?: string[];
  };
}

const mockEmails = [
  {
    id: 'g1',
    title: 'RE: Technical Review Meeting',
    subtitle: 'From: john@acme.com',
    date: '10:30 AM',
    type: 'meeting',
    context: {
      priority: 'high',
      nextSteps: ['Schedule follow-up', 'Share technical specs'],
      recentUpdates: ['Security requirements added', 'Budget approved']
    }
  },
  {
    id: 'g2',
    title: 'Updated Proposal Draft',
    subtitle: 'From: sarah@techstart.com',
    date: 'Yesterday',
    type: 'proposal',
    context: {
      stage: 'review',
      nextSteps: ['Review pricing', 'Update terms'],
      recentUpdates: ['New pricing structure', 'Legal review completed']
    }
  },
  // ... (keep other email items with added context)
];

export function GmailView({ onSelect, selectedId }: { onSelect: (item: MockItem) => void, selectedId?: string }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Sales Inbox</h1>
      <div className="space-y-px">
        {mockEmails.map((email) => (
          <div 
            key={email.id} 
            onClick={() => onSelect(email)}
            className={`border-l-4 p-4 transition-all cursor-pointer
              ${selectedId === email.id 
                ? 'bg-blue-50 border-l-blue-500' 
                : 'border-l-transparent hover:bg-gray-50 hover:border-l-gray-300'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className={`font-medium ${selectedId === email.id ? 'text-blue-700' : ''}`}>
                  {email.title}
                </div>
                <div className="text-sm text-gray-500">{email.subtitle}</div>
              </div>
              <div className="text-sm text-gray-500">
                {email.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Similar pattern for other views...