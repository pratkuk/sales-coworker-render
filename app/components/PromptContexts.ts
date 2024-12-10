export const getPromptContext = (prompt: string, activeApp: string) => {
  const contextMap: { [key: string]: { description: string; reason: string; example?: string } } = {
    // Hubspot Prompts
    "Draft a follow-up email for this deal": {
      description: "Create a personalized email based on the current deal stage and recent interactions",
      reason: "Deal is in Proposal stage with recent technical review - perfect time for a detailed follow-up",
      example: "Will include: Key points from technical review, Next steps, Timeline for proposal submission"
    },
    "Analyze win probability": {
      description: "Deep analysis of deal success likelihood using historical data and current engagement metrics",
      reason: "Similar deals at this stage and value have shown specific patterns we can learn from",
      example: "Compares: Deal size, Sales cycle length, Engagement level, Similar won/lost deals"
    },
    "Generate meeting summary": {
      description: "Create a comprehensive summary of the most recent meeting with action items and key decisions",
      reason: "Recent technical review meeting needs documentation for the deal record",
      example: "Includes: Attendees, Discussion points, Decisions made, Next steps, Timeline"
    },

    // Clari Prompts
    "Generate forecast analysis": {
      description: "Detailed analysis of current pipeline and forecast accuracy",
      reason: "Quarter-end approaching with significant gap between pipeline ($1.2M) and forecast ($890K)",
      example: "Will analyze: Historical conversion rates, Deal slippage patterns, Risk factors"
    },
    "Compare to last quarter": {
      description: "Quarter-over-quarter analysis of pipeline health and forecast accuracy",
      reason: "Current pipeline shows unusual pattern compared to previous quarters",
      example: "Analyzes: Deal size distribution, Win rates, Sales cycle changes"
    },

    // Dealhub Prompts
    "Generate quote": {
      description: "Create a customized quote based on selected products and customer requirements",
      reason: "Enterprise package requires specific customizations and volume discounts",
      example: "Includes: Product mix, Custom pricing, Terms and conditions, Optional add-ons"
    },
    "Create proposal outline": {
      description: "Build a structured proposal template tailored to the customer's needs and stage",
      reason: "Technical review completed - ready for formal proposal with detailed specifications",
      example: "Covers: Executive summary, Technical specs, Implementation plan, Pricing"
    },

    // Gmail Prompts
    "Draft response email": {
      description: "Compose a contextual response to the latest email thread",
      reason: "Technical review email needs follow-up with specific details and next steps",
      example: "Will include: Confirmation of discussed points, Action items, Timeline for next steps"
    },
    "Summarize email thread": {
      description: "Create a concise summary of the entire email conversation",
      reason: "Long email thread with multiple participants needs clear summary for deal notes",
      example: "Highlights: Key decisions, Action items, Timeline, Open questions"
    },
    "Extract action items": {
      description: "Identify and list all action items from the email thread",
      reason: "Technical review generated multiple action items that need tracking",
      example: "Lists: Owner, Task, Deadline, Dependencies"
    }
  };

  return contextMap[prompt] || {
    description: prompt,
    reason: "Suggested based on current context",
  };
};