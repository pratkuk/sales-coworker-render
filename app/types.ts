export interface Deal {
  id: number;
  companyName: string;
  stage: string;
  value: number;
  nextStep: string;
  lastContact: string;
  probability: number;
  status: 'active' | 'stalled' | 'risk';
  daysInStage: number;
}