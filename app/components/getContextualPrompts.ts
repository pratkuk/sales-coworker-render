interface SelectedItem {
  id: string;
  title: string;
  type?: string;
  context?: {
    stage?: string;
    lastAction?: string;
    priority?: string;
    nextSteps?: string[];
    recentUpdates?: string[];
  };
}

export function getContextualPrompts(app: string, selectedItem: SelectedItem | null) {
  if (!selectedItem) return [];

  switch (app) {
    case 'gmail':
      switch (selectedItem.type) {
        case 'meeting':
          return [
            `Draft follow-up email for "${selectedItem.title}"`,
            "Generate meeting minutes",
            "Create action items list",
            "Schedule next meeting",
            `Share ${selectedItem.context?.recentUpdates?.[0] || 'updates'} with team`
          ];
        case 'proposal':
          return [
            "Draft proposal review response",
            "Generate summary of changes",
            "Create revision checklist",
            "Schedule review meeting",
            "Draft pricing discussion points"
          ];
        default:
          return [
            `Draft response to "${selectedItem.title}"`,
            "Summarize email thread",
            "Extract action items",
            "Schedule follow-up",
            "Create task list"
          ];
      }

    case 'hubspot':
      // Add deal-specific prompts based on stage
      if (selectedItem.context?.stage === 'Proposal') {
        return [
          "Generate proposal outline",
          "Calculate ROI metrics",
          "Draft executive summary",
          "Create pricing options",
          "Generate implementation timeline"
        ];
      }
      // Add more deal stage-specific prompts...

    // Add cases for other apps...
    
    default:
      return [
        "Draft a follow-up email",
        "Create summary",
        "Generate next steps",
        "Schedule follow-up",
        "Start custom chat"
      ];
  }
}