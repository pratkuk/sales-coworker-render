'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, X, ChevronDown, Settings, Download, MousePointerClick } from 'lucide-react';
import type { Deal } from '../types';

interface Props {
  onDealClick?: (deal: Deal) => void;
}

interface DealCardProps extends Deal {
  onClick: () => void;
}

const DealCard: React.FC<DealCardProps> = ({ company, amount, closeDate, lastActivity, nextActivity, onClick }) => (
  <div 
    className="border rounded p-3 bg-gray-50 mb-2 cursor-pointer hover:bg-gray-100 transition-colors"
    onClick={onClick}
  >
    <div className="text-sm font-medium">{company}</div>
    <div className="text-xs text-gray-500 mt-1">Amount: ${amount.toLocaleString()}</div>
    <div className="text-xs text-gray-500">Close date: {closeDate}</div>
    <div className="text-xs text-gray-500 mt-2">{lastActivity}</div>
    <div className="text-xs text-gray-500">{nextActivity}</div>
  </div>
);

export const HubSpotDeals: React.FC<Props> = ({ onDealClick }) => {
  // Rest of the component code remains the same
  // ...
