'use client';

interface MockItem {
  id: string;
  title: string;
  subtitle: string;
  value?: string;
  status?: string;
  date?: string;
  type?: string;
}

interface ViewProps {
  onSelect: (item: MockItem) => void;
  selectedId?: string;
}

// Mock data for different views
const mockDeals = [
  { id: 'h1', title: 'Acme Corp', subtitle: 'Enterprise Deal', value: '$50,000', status: 'Proposal', date: '2024-12-05' },
  { id: 'h2', title: 'TechStart Inc', subtitle: 'Platform License', value: '$75,000', status: 'Negotiation', date: '2024-12-08' },
  { id: 'h3', title: 'Global Solutions', subtitle: 'Custom Package', value: '$120,000', status: 'Discovery', date: '2024-12-10' },
  { id: 'h4', title: 'InnovateAI', subtitle: 'Annual License', value: '$95,000', status: 'Proposal', date: '2024-12-11' }
];

export function HubspotView({ onSelect, selectedId }: ViewProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Deals</h1>
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-4 font-medium text-gray-600">Deal Name</th>
              <th className="text-left p-4 font-medium text-gray-600">Value</th>
              <th className="text-left p-4 font-medium text-gray-600">Stage</th>
              <th className="text-left p-4 font-medium text-gray-600">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {mockDeals.map((deal, index) => (
              <tr 
                key={deal.id}
                onClick={() => onSelect(deal)}
                className={`cursor-pointer transition-colors
                  ${selectedId === deal.id ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  ${selectedId === deal.id ? 'hover:bg-blue-100' : 'hover:bg-gray-100'}`}
              >
                <td className="p-4">
                  <div className="font-medium">{deal.title}</div>
                  <div className="text-sm text-gray-500">{deal.subtitle}</div>
                </td>
                <td className="p-4">{deal.value}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {deal.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{deal.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mockForecasts = [
  { id: 'c1', title: 'Q4 Pipeline', subtitle: 'Current Quarter', value: '$1.2M', status: 'On Track', date: 'Dec 2024' },
  { id: 'c2', title: 'Q1 2024', subtitle: 'Next Quarter', value: '$890K', status: 'At Risk', date: 'Mar 2024' },
  { id: 'c3', title: 'Enterprise', subtitle: 'Strategic', value: '$3.2M', status: 'Above Plan', date: 'Dec 2024' },
];

export function ClariView({ onSelect, selectedId }: ViewProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pipeline Forecast</h1>
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-4 font-medium text-gray-600">Pipeline</th>
              <th className="text-left p-4 font-medium text-gray-600">Value</th>
              <th className="text-left p-4 font-medium text-gray-600">Status</th>
              <th className="text-left p-4 font-medium text-gray-600">Period</th>
            </tr>
          </thead>
          <tbody>
            {mockForecasts.map((forecast, index) => (
              <tr
                key={forecast.id}
                onClick={() => onSelect(forecast)}
                className={`cursor-pointer transition-colors
                  ${selectedId === forecast.id ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  ${selectedId === forecast.id ? 'hover:bg-blue-100' : 'hover:bg-gray-100'}`}
              >
                <td className="p-4">
                  <div className="font-medium">{forecast.title}</div>
                  <div className="text-sm text-gray-500">{forecast.subtitle}</div>
                </td>
                <td className="p-4">{forecast.value}</td>
                <td className="p-4">{forecast.status}</td>
                <td className="p-4">{forecast.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mockProposals = [
  { id: 'd1', title: 'Acme Corp', subtitle: 'Enterprise Package', value: '$50,000', status: 'Draft', date: '2024-12-05' },
  { id: 'd2', title: 'TechStart', subtitle: 'Pro Plus', value: '$75,000', status: 'Review', date: '2024-12-08' },
  { id: 'd3', title: 'Global Solutions', subtitle: 'Custom', value: '$120,000', status: 'Sent', date: '2024-12-09' }
];

export function DealhubView({ onSelect, selectedId }: ViewProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quotes & Proposals</h1>
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-4 font-medium text-gray-600">Proposal</th>
              <th className="text-left p-4 font-medium text-gray-600">Value</th>
              <th className="text-left p-4 font-medium text-gray-600">Status</th>
              <th className="text-left p-4 font-medium text-gray-600">Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {mockProposals.map((proposal, index) => (
              <tr
                key={proposal.id}
                onClick={() => onSelect(proposal)}
                className={`cursor-pointer transition-colors
                  ${selectedId === proposal.id ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  ${selectedId === proposal.id ? 'hover:bg-blue-100' : 'hover:bg-gray-100'}`}
              >
                <td className="p-4">
                  <div className="font-medium">{proposal.title}</div>
                  <div className="text-sm text-gray-500">{proposal.subtitle}</div>
                </td>
                <td className="p-4">{proposal.value}</td>
                <td className="p-4">{proposal.status}</td>
                <td className="p-4">{proposal.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mockEmails = [
  { id: 'g1', title: 'RE: Technical Review Meeting', subtitle: 'From: john@acme.com', date: '10:30 AM', status: 'Unread' },
  { id: 'g2', title: 'Updated Proposal Draft', subtitle: 'From: sarah@techstart.com', date: 'Yesterday', status: 'Read' },
  { id: 'g3', title: 'Security Requirements Doc', subtitle: 'From: tech@global.com', date: '2 days ago', status: 'Unread' },
  { id: 'g4', title: 'Meeting Notes', subtitle: 'From: team@innovate.ai', date: 'Dec 11', status: 'Read' }
];

export function GmailView({ onSelect, selectedId }: ViewProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sales Inbox</h1>
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-4 font-medium text-gray-600">Subject</th>
              <th className="text-left p-4 font-medium text-gray-600">From</th>
              <th className="text-left p-4 font-medium text-gray-600">Time</th>
            </tr>
          </thead>
          <tbody>
            {mockEmails.map((email, index) => (
              <tr
                key={email.id}
                onClick={() => onSelect(email)}
                className={`cursor-pointer transition-colors
                  ${selectedId === email.id ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  ${selectedId === email.id ? 'hover:bg-blue-100' : 'hover:bg-gray-100'}`}
              >
                <td className="p-4">
                  <div className={`font-medium ${email.status === 'Unread' ? 'font-semibold' : ''}`}>
                    {email.title}
                  </div>
                </td>
                <td className="p-4 text-gray-500">{email.subtitle}</td>
                <td className="p-4 text-gray-500">{email.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}