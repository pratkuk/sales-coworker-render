// types.ts
export type AppType = 'hubspot' | 'clari' | 'dealhub' | 'gmail';

export interface EmailItem {
  id: string;
  subject: string;
  from: string;
  date: string;
  preview: string;
  status: 'unread' | 'read';
}

export interface DealItem {
  id: string;
  company: string;
  amount: number;
  stage: string;
  owner: string;
  lastActivity: string;
}

export interface WidgetProps {
  activeApp: AppType;
  suggestions: string[];
  isOpen?: boolean;
  onClose?: () => void;
  position?: { x: number; y: number };
}

export interface SuggestionProps {
  text: string;
  tooltip: string;
  onClick: () => void;
}