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
    submissionOpen: false, // Submissions closed for now
  },
  plotlines: {
    registrationOpen: true,
    submissionOpen: false, // Submissions closed for now
  },
  openmic: {
    registrationOpen: true,
    submissionOpen: false, // Submissions closed for now
  },
};

// Helper functions
export const canRegisterForEvent = (eventType: 'pralekh' | 'plotlines' | 'openmic'): boolean => {
  return eventConfigurations[eventType].registrationOpen;
};

export const canSubmitForEvent = (eventType: 'pralekh' | 'plotlines' | 'openmic'): boolean => {
  return eventConfigurations[eventType].submissionOpen;
};
