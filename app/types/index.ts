export type AppType = 'hubspot' | 'clari' | 'dealhub' | 'gmail';

export interface Deal {
  company: string;
  amount: number;
  closeDate: string;
  lastActivity: string;
  nextActivity: string;
}

export interface WidgetMessage {
  text: string;
  isUser: boolean;
  suggestions?: string[];
}

export interface WidgetProps {
  activeApp: AppType;
  suggestions: string[];
  isOpen?: boolean;
  selectedDeal?: Deal | null;
}

export interface HubspotDealsProps {
  onDealClick?: (deal: Deal) => void;
}