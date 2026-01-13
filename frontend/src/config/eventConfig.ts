/**
 * Event Configuration
 * Control registration and submission status for all events
 */

export interface EventConfig {
  registrationOpen: boolean;
  submissionOpen: boolean;
}

export const eventConfigurations: Record<'pralekh' | 'plotlines' | 'openmic', EventConfig> = {
  pralekh: {
    registrationOpen: true,
    submissionOpen: true, // Submissions open
  },
  plotlines: {
    registrationOpen: true,
    submissionOpen: true, // Submissions open
  },
  openmic: {
    registrationOpen: true,
    submissionOpen: true, // Submissions open
  },
};

// Helper functions
export const canRegisterForEvent = (eventType: 'pralekh' | 'plotlines' | 'openmic'): boolean => {
  return eventConfigurations[eventType].registrationOpen;
};

export const canSubmitForEvent = (eventType: 'pralekh' | 'plotlines' | 'openmic'): boolean => {
  return eventConfigurations[eventType].submissionOpen;
};
