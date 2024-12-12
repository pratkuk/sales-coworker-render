import React, { useState } from 'react';
import { Search, Filter, Plus, X, ChevronDown, ArrowLeft, ArrowRight, RefreshCw, Settings, Download, MousePointerClick, MoreHorizontal } from 'lucide-react';

interface DealCardProps {
  company: string;
  amount: number;
  closeDate: string;
  lastActivity: string;
  nextActivity: string;
}

const DealCard: React.FC<DealCardProps> = ({ company, amount, closeDate, lastActivity, nextActivity }) => (
  <div className="border rounded p-3 bg-gray-50 mb-2">
    <div className="text-sm font-medium">{company}</div>
    <div className="text-xs text-gray-500 mt-1">Amount: ${amount.toLocaleString()}</div>
    <div className="text-xs text-gray-500">Close date: {closeDate}</div>
    <div className="text-xs text-gray-500 mt-2">{lastActivity}</div>
    <div className="text-xs text-gray-500">{nextActivity}</div>
  </div>
);

export const HubSpotDeals: React.FC = () => {
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  
  const tabs = ['CW NAEU', 'QTD New ARR Closed', 'Pratyush C2 Funnel', 'Partnership NA-EU', 'Partnership APAC', 'APAC MM', 'All deals', 'Forecast'];
  
  const metrics = [
    { label: 'TOTAL DEAL AMOUNT', value: '$1.92M', average: 'Average per deal: $5.7K' },
    { label: 'WEIGHTED DEAL AMOUNT', value: '$772.34K', average: 'Average per deal: $2.29K' },
    { label: 'OPEN DEAL AMOUNT', value: '$663K', average: 'Average per deal: $6.56K' },
    { label: 'CLOSED DEAL AMOUNT', value: '$650.89K', average: 'Average per deal: $4.72K' },
    { label: 'NEW DEAL AMOUNT', value: '$0', average: 'Average per deal: $0' },
    { label: 'AVERAGE DEAL AGE', value: '366 days', average: '' }
  ];

  const stages = [
    {
      name: 'SALES QUALIFIED OPPORTUNITY',
      count: 1,
      deals: [{
        company: 'Emergent.Sh',
        amount: 4550,
        closeDate: '12/13/2024',
        lastActivity: 'Meeting 8 days ago',
        nextActivity: 'No activity scheduled'
      }]
    },
    { 
      name: 'DEMO',
      count: 0,
      deals: []
    },
    {
      name: 'POC',
      count: 1,
      deals: [{
        company: 'TechCorp Solutions',
        amount: 12800,
        closeDate: '01/15/2025',
        lastActivity: 'POC Started 3 days ago',
        nextActivity: 'Technical review scheduled in 2 days'
      }]
    },
    {
      name: 'PROPOSAL',
      count: 1,
      deals: [{
        company: 'Global Systems Inc',
        amount: 25000,
        closeDate: '12/30/2024',
        lastActivity: 'Proposal sent yesterday',
        nextActivity: 'Follow-up call tomorrow'
      }]
    },
    {
      name: 'NEGOTIATION',
      count: 0,
      deals: []
    },
    {
      name: 'MSA/LEGAL',
      count: 1,
      deals: [{
        company: 'Enterprise Co Ltd',
        amount: 75000,
        closeDate: '12/20/2024',
        lastActivity: 'Contract in legal review',
        nextActivity: 'Legal team meeting on Thursday'
      }]
    },
    {
      name: 'CLOSED WON',
      count: 0,
      deals: []
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Top Navigation */}
      <div className="bg-white rounded-t-lg border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold">Deals</h1>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded">Actions</button>
            <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded">Import</button>
            <button className="px-3 py-1.5 bg-orange-500 text-white rounded hover:bg-orange-600">
              Create deal
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-4 px-4 pb-2 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`px-3 py-2 text-sm whitespace-nowrap ${
                i === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button className={`p-2 border rounded ${viewType === 'list' ? 'bg-gray-100' : ''}`}>
              <MousePointerClick className="w-4 h-4" />
            </button>
            <button className={`p-2 border rounded ${viewType === 'grid' ? 'bg-gray-100' : ''}`}>
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Filter deals"
              className="pl-10 pr-4 py-2 border rounded w-64"
            />
          </div>
          <button className="flex items-center space-x-2 px-3 py-2 border rounded">
            <span>Deal owner</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 border rounded">
            <span>Close date</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-6 gap-4 p-4 bg-white">
        {metrics.map((metric, i) => (
          <div key={i} className="text-center">
            <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
            <div className="text-xl font-semibold text-blue-600">{metric.value}</div>
            {metric.average && (
              <div className="text-xs text-gray-500 mt-1">{metric.average}</div>
            )}
          </div>
        ))}
      </div>

      {/* Pipeline Stages */}
      <div className="bg-white mt-4 p-4">
        <div className="grid grid-cols-7 gap-4">
          {stages.map((stage, i) => (
            <div key={i} className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{stage.name}</span>
                <span className="text-sm text-gray-500">{stage.count}</span>
              </div>
              {stage.deals.map((deal, j) => (
                <DealCard key={j} {...deal} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};