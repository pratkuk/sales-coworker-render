'use client';

interface MockItem {
  id: string;
  title: string;
  subtitle: string;
  value?: string;
  status?: string;
  date?: string;
}

interface MockViewProps {
  items: MockItem[];
  onSelect: (item: MockItem) => void;
  selectedId?: string;
}

const mockDeals = [
  { id: 'h1', title: 'Acme Corp', subtitle: 'Technical Review', value: '$50,000', status: 'Proposal', date: '2024-12-05' },
  { id: 'h2', title: 'TechStart Inc', subtitle: 'Price Negotiation', value: '$75,000', status: 'Negotiation', date: '2024-12-08' },
  { id: 'h3', title: 'Global Solutions Ltd', subtitle: 'Initial Requirements', value: '$120,000', status: 'Discovery', date: '2024-12-09' },
  { id: 'h4', title: 'Innovate AI', subtitle: 'Product Demo', value: '$150,000', status: 'Discovery', date: '2024-12-11' },
  { id: 'h5', title: 'DataCorp Systems', subtitle: 'Contract Review', value: '$95,000', status: 'Negotiation', date: '2024-12-10' },
  { id: 'h6', title: 'SmartTech Co', subtitle: 'Security Assessment', value: '$85,000', status: 'Technical Review', date: '2024-12-12' }
];

const mockForecasts = [
  { id: 'c1', title: 'Q4 Pipeline', subtitle: 'Current Quarter', value: '$1,245,000', status: 'On Track', date: 'Dec 2024' },
  { id: 'c2', title: 'Q1 2024 Forecast', subtitle: 'Next Quarter', value: '$890,000', status: 'At Risk', date: 'Mar 2024' },
  { id: 'c3', title: 'Enterprise Segment', subtitle: 'Strategic Accounts', value: '$3,200,000', status: 'Above Plan', date: 'Dec 2024' },
  { id: 'c4', title: 'Mid-Market Pipeline', subtitle: 'Regional Accounts', value: '$800,000', status: 'Below Plan', date: 'Dec 2024' },
  { id: 'c5', title: 'New Business', subtitle: 'First-time Customers', value: '$450,000', status: 'On Track', date: 'Dec 2024' }
];

const mockProposals = [
  { id: 'd1', title: 'Acme Corp - Enterprise', subtitle: 'Annual License', value: '$50,000', status: 'In Review', date: '2024-12-05' },
  { id: 'd2', title: 'TechStart - Pro Plus', subtitle: 'Multi-year Deal', value: '$75,000', status: 'Approved', date: '2024-12-08' },
  { id: 'd3', title: 'Global Solutions - Custom', subtitle: 'Services Bundle', value: '$120,000', status: 'Draft', date: '2024-12-09' },
  { id: 'd4', title: 'Innovate AI - Enterprise', subtitle: 'Platform License', value: '$150,000', status: 'Pending', date: '2024-12-11' },
  { id: 'd5', title: 'DataCorp - Standard', subtitle: 'Annual Subscription', value: '$45,000', status: 'In Review', date: '2024-12-10' }
];

const mockEmails = [
  { id: 'g1', title: 'RE: Technical Review Meeting', subtitle: 'From: john@acme.com', status: 'Unread', date: '10:30 AM' },
  { id: 'g2', title: 'Updated Proposal Draft', subtitle: 'From: sarah@techstart.com', status: 'Read', date: 'Yesterday' },
  { id: 'g3', title: 'Security Requirements Doc', subtitle: 'From: tech@global.com', status: 'Unread', date: '2 days ago' },
  { id: 'g4', title: 'Meeting Notes - Product Demo', subtitle: 'From: team@innovate.ai', status: 'Read', date: 'Dec 11' },
  { id: 'g5', title: 'Contract Review Comments', subtitle: 'From: legal@datacorp.com', status: 'Unread', date: 'Dec 10' },
  { id: 'g6', title: 'RE: Pricing Discussion', subtitle: 'From: finance@smarttech.co', status: 'Read', date: 'Dec 9' }
];

export const HubspotView = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">Deals</h1>
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4">Deal Name</th>
            <th className="text-left p-4">Amount</th>
            <th className="text-left p-4">Stage</th>
            <th className="text-left p-4">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {mockDeals.map((deal) => (
            <tr key={deal.id} className="border-t hover:bg-gray-50 cursor-pointer">
              <td className="p-4">
                <div className="font-medium">{deal.title}</div>
                <div className="text-sm text-gray-500">{deal.subtitle}</div>
              </td>
              <td className="p-4">{deal.value}</td>
              <td className="p-4">{deal.status}</td>
              <td className="p-4">{deal.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const ClariView = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">Pipeline Forecast</h1>
    <div className="grid gap-4">
      {mockForecasts.map((forecast) => (
        <div key={forecast.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{forecast.title}</div>
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

export const DealhubView = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">Quotes & Proposals</h1>
    <div className="space-y-2">
      {mockProposals.map((proposal) => (
        <div key={proposal.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex justify-between">
            <div>
              <div className="font-medium">{proposal.title}</div>
              <div className="text-sm text-gray-500">{proposal.subtitle}</div>
            </div>
            <div className="text-right">
              <div>{proposal.value}</div>
              <div className="text-sm text-gray-500">Last modified: {proposal.date}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const GmailView = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">Sales Inbox</h1>
    <div className="space-y-px">
      {mockEmails.map((email) => (
        <div key={email.id} className="border-b p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <div className={`font-medium ${email.status === 'Unread' ? 'font-semibold' : ''}`}>{email.title}</div>
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