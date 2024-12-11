export type AppType = 'hubspot' | 'clari' | 'dealhub' | 'gmail';

export interface EmailItem {
  id: string;
  subject: string;
  from: string;
  preview?: string;
  date?: string;
  unread?: boolean;
  type?: string;
}

export interface DealItem {
  id: string;
  name: string;
  company: string;
  amount: number;
  stage: string;
}

export interface WidgetProps {
  activeApp: AppType;
  suggestions: string[];
  isOpen?: boolean;
}