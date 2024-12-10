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

interface ViewProps {
  onSelect: (item: MockItem) => void;
  selectedId?: string;
}

// Gmail Mock Data
const mockEmails: MockItem[] = [
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
  {
    id: 'g3',
    title: 'Security Requirements Doc',
    subtitle: 'From: tech@global.com',
    date: '2 days ago',
    type: 'document'
  }
];

// Hubspot Mock Data
const mockDeals: MockItem[] = [
  {
    id: 'h1',
    title: 'Acme Corp',
    subtitle: 'Enterprise Deal',
    value: '$50,000',
    status: 'Proposal',
    date: 'Dec 5, 2024',
    context: {
      stage: 'Proposal',
      nextSteps: ['Technical Review', 'Pricing Discussion']
    }
  },
  {
    id: 'h2',
    title: 'TechStart Inc',
    subtitle: 'Platform License',
    value: '$75,000',
    status: 'Negotiation',
    date: 'Dec 8, 2024'
  }
];

// Clari Mock Data
const mockForecasts: MockItem[] = [
  {
    id: 'c1',
    title: 'Q4 Pipeline',
    subtitle: 'Current Quarter',
    value: '$1,245,000',
    status: 'On Track',
    date: 'Dec 2024'
  },
  {
    id: 'c2',
    title: 'Q1 2024 Forecast',
    subtitle: 'Next Quarter',
    value: '$890,000',
    status: 'At Risk',
    date: 'Mar 2024'
  }
];

// Dealhub Mock Data
const mockProposals: MockItem[] = [
  {
    id: 'd1',
    title: 'Acme Corp - Enterprise Package',
    subtitle: 'Annual Contract',
    value: '$50,000',
    date: 'Dec 5, 2024',
    status: 'Draft'
  },
  {
    id: 'd2',
    title: 'TechStart - Pro Plus',
    subtitle: 'Multi-year Deal',
    value: '$75,000',
    date: 'Dec 8, 2024',
    status: 'Review'
  }
];

export function GmailView({ onSelect, selectedId }: ViewProps) {
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

export function HubspotView({ onSelect, selectedId }: ViewProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Deals</h1>
      <div className="space-y-px">
        {mockDeals.map((deal) => (
          <div 
            key={deal.id} 
            onClick={() => onSelect(deal)}
            className={`border-l-4 p-4 transition-all cursor-pointer
              ${selectedId === deal.id 
                ? 'bg-blue-50 border-l-blue-500' 
                : 'border-l-transparent hover:bg-gray-50 hover:border-l-gray-300'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className={`font-medium ${selectedId === deal.id ? 'text-blue-700' : ''}`}>
                  {deal.title}
                </div>
                <div className="text-sm text-gray-500">{deal.subtitle}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{deal.value}</div>
                <div className="text-sm text-gray-500">{deal.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClariView({ onSelect, selectedId }: ViewProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Pipeline Forecast</h1>
      <div className="space-y-px">
        {mockForecasts.map((forecast) => (
          <div 
            key={forecast.id} 
            onClick={() => onSelect(forecast)}
            className={`border-l-4 p-4 transition-all cursor-pointer
              ${selectedId === forecast.id 
                ? 'bg-blue-50 border-l-blue-500' 
                : 'border-l-transparent hover:bg-gray-50 hover:border-l-gray-300'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className={`font-medium ${selectedId === forecast.id ? 'text-blue-700' : ''}`}>
                  {forecast.title}
                </div>
                <div className="text-sm text-gray-500">{forecast.subtitle}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{forecast.value}</div>
                <div className="text-sm text-gray-500">{forecast.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DealhubView({ onSelect, selectedId }: ViewProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Quotes & Proposals</h1>
      <div className="space-y-px">
        {mockProposals.map((proposal) => (
          <div 
            key={proposal.id} 
            onClick={() => onSelect(proposal)}
            className={`border-l-4 p-4 transition-all cursor-pointer
              ${selectedId === proposal.id 
                ? 'bg-blue-50 border-l-blue-500' 
                : 'border-l-transparent hover:bg-gray-50 hover:border-l-gray-300'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className={`font-medium ${selectedId === proposal.id ? 'text-blue-700' : ''}`}>
                  {proposal.title}
                </div>
                <div className="text-sm text-gray-500">{proposal.subtitle}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{proposal.value}</div>
                <div className="text-sm text-gray-500">Last modified: {proposal.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}