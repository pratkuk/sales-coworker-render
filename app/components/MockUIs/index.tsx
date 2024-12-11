'use client';

import { useState } from 'react';

interface ViewProps {
  onSelect: (item: any) => void;
  selectedId: string | null;
}

export const HubspotView = ({ onSelect, selectedId }: ViewProps) => {
  const deals = [
    { id: '1', name: 'Enterprise Deal', company: 'TechCorp', amount: 50000, stage: 'Negotiation' },
    { id: '2', name: 'Product Expansion', company: 'InnovateInc', amount: 75000, stage: 'Discovery' },
    { id: '3', name: 'Service Contract', company: 'DataFlow', amount: 30000, stage: 'Closing' },
    { id: '4', name: 'Platform License', company: 'CloudSys', amount: 60000, stage: 'Proposal' },
    { id: '5', name: 'Annual Renewal', company: 'NetWorks', amount: 45000, stage: 'Negotiation' }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deal Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr 
              key={deal.id}
              onClick={() => onSelect(deal)}
              className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${selectedId === deal.id ? 'bg-blue-50' : ''}`}
            >
              <td className="px-6 py-4">{deal.name}</td>
              <td className="px-6 py-4">{deal.company}</td>
              <td className="px-6 py-4">${deal.amount.toLocaleString()}</td>
              <td className="px-6 py-4">{deal.stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ClariView = ({ onSelect, selectedId }: ViewProps) => {
  const forecasts = [
    { id: '1', opportunity: 'Q1 Enterprise Expansion', forecast: 200000, confidence: 'High' },
    { id: '2', opportunity: 'Q2 New Market Entry', forecast: 150000, confidence: 'Medium' },
    { id: '3', opportunity: 'Q1 Product Launch', forecast: 300000, confidence: 'Low' },
    { id: '4', opportunity: 'Q2 Service Upgrades', forecast: 175000, confidence: 'High' },
    { id: '5', opportunity: 'Q1 Partnership Deal', forecast: 250000, confidence: 'Medium' }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opportunity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Forecast</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) => (
            <tr 
              key={forecast.id}
              onClick={() => onSelect(forecast)}
              className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${selectedId === forecast.id ? 'bg-blue-50' : ''}`}
            >
              <td className="px-6 py-4">{forecast.opportunity}</td>
              <td className="px-6 py-4">${forecast.forecast.toLocaleString()}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${{
                  'High': 'bg-green-100 text-green-800',
                  'Medium': 'bg-yellow-100 text-yellow-800',
                  'Low': 'bg-red-100 text-red-800'
                }[forecast.confidence]}`}>
                  {forecast.confidence}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const DealhubView = ({ onSelect, selectedId }: ViewProps) => {
  const proposals = [
    { id: '1', title: 'Enterprise Solution Package', client: 'MegaCorp', value: 100000, status: 'Draft' },
    { id: '2', title: 'Custom Integration Proposal', client: 'TechStart', value: 75000, status: 'Sent' },
    { id: '3', title: 'Platform Migration Plan', client: 'DataFlow', value: 150000, status: 'Viewed' },
    { id: '4', title: 'Annual Service Contract', client: 'CloudNet', value: 90000, status: 'Accepted' },
    { id: '5', title: 'Security Enhancement Pack', client: 'SecureInc', value: 60000, status: 'Draft' }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr 
              key={proposal.id}
              onClick={() => onSelect(proposal)}
              className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${selectedId === proposal.id ? 'bg-blue-50' : ''}`}
            >
              <td className="px-6 py-4">{proposal.title}</td>
              <td className="px-6 py-4">{proposal.client}</td>
              <td className="px-6 py-4">${proposal.value.toLocaleString()}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${{
                  'Draft': 'bg-gray-100 text-gray-800',
                  'Sent': 'bg-blue-100 text-blue-800',
                  'Viewed': 'bg-yellow-100 text-yellow-800',
                  'Accepted': 'bg-green-100 text-green-800'
                }[proposal.status]}`}>
                  {proposal.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const GmailView = ({ onSelect, selectedId }: ViewProps) => {
  const emails = [
    { id: '1', subject: 'Contract Review Request', from: 'legal@techcorp.com', preview: 'Please review the attached contract...', date: 'Today', unread: true },
    { id: '2', subject: 'Meeting Follow-up: Project Timeline', from: 'pm@client.com', preview: 'Thank you for today\'s discussion...', date: 'Yesterday', unread: false },
    { id: '3', subject: 'Q1 Sales Pipeline Review', from: 'sales.director@company.com', preview: 'Here\'s an overview of our Q1 performance...', date: '2 days ago', unread: true },
    { id: '4', subject: 'New Feature Announcement', from: 'product@company.com', preview: 'Exciting updates coming to our platform...', date: '3 days ago', unread: false },
    { id: '5', subject: 'Partnership Opportunity', from: 'bd@partner.com', preview: 'I\'d like to discuss a potential partnership...', date: '4 days ago', unread: true }
  ];

  return (
    <div className="bg-white rounded-lg shadow divide-y">
      {emails.map((email) => (
        <div 
          key={email.id}
          onClick={() => onSelect(email)}
          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedId === email.id ? 'bg-blue-50' : ''} ${email.unread ? 'font-semibold' : ''}`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm">{email.from}</span>
            <span className="text-xs text-gray-500">{email.date}</span>
          </div>
          <div className="text-sm font-medium mb-1">{email.subject}</div>
          <div className="text-sm text-gray-600 truncate">{email.preview}</div>
        </div>
      ))}
    </div>
  );
};