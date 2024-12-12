export type AppType = 'hubspot' | 'clari' | 'dealhub' | 'gmail';

export interface EmailItem {
  id: string;
  subject: string;
  from: string;
  type: string;
  preview: string;
  date: string;
}

export interface DealItem {
  id: string;
  name: string;
  company: string;
  amount: number;
  stage: string;
}

export interface Deal {
  company: string;
  amount: number;
  closeDate: string;
  lastActivity: string;
  nextActivity: string;
}

export interface WidgetProps {
  activeApp: AppType;
  suggestions: string[];
  isOpen?: boolean;
  selectedDeal?: Deal | null;
}

export interface Props {
  onDealClick?: (deal: Deal) => void;
}