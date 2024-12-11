import { AppType, DealItem, EmailItem } from '../types';

export const getContextualPrompts = (app: AppType, selectedItem: DealItem | EmailItem | null) => {
  if (!selectedItem) {
    switch (app) {
      case 'hubspot':
        return [
          'Show deals closing this month',
          'Analyze pipeline health',
          'Identify at-risk opportunities'
        ];
      case 'clari':
        return [
          'Generate forecast summary',
          'Show confidence analysis',
          'Identify forecast gaps'
        ];
      case 'dealhub':
        return [
          'List pending proposals',
          'Show proposal templates',
          'Track document engagement'
        ];
      case 'gmail':
        return [
          'Show unread priority emails',
          'Draft follow-up email',
          'Schedule meeting with team'
        ];
    }
  }

  // Return contextual prompts based on selected item
  if ('subject' in selectedItem) {
    return [
      `Draft response to "${selectedItem.subject}"`,
      'Summarize email thread',
      'Extract key action items',
      'Schedule follow-up'
    ];
  } else {
    return [
      `Analyze ${selectedItem.company} deal opportunity`,
      `Generate meeting agenda for ${selectedItem.name}`,
      `Create follow-up tasks for ${selectedItem.stage} stage`,
      'Prepare deal summary'
    ];
  }
};
