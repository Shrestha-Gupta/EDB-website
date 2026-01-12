// API Base URL
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://edb-website-7oxz.vercel.app' 
  : 'http://localhost:5000';

export type EventType = 'pralekh' | 'plotlines' | 'openmic';

// Team member interface for Pralekh
export interface TeamMember {
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
}

export interface EventRegistration {
  _id: string;
  userId: string;
  eventType: EventType;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  // Team fields (for Pralekh)
  isTeamRegistration?: boolean;
  teamName?: string;
  teamMembers?: TeamMember[];
  title?: string;
  description?: string;
  submissionUrl?: string;
  submissionFileName?: string;
  submissionDate?: string;
  registrationStatus: 'registered' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  adminRemarks?: string;
  createdAt: string;
  updatedAt: string;
}

// Get auth token
const getToken = (): string | null => localStorage.getItem('token');

// Helper for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const headers: HeadersInit = {
    ...(options.headers || {}),
  };

  // Only add Content-Type for non-FormData requests
  if (!(options.body instanceof FormData)) {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
  }

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API call failed');
  }

  return data;
};

// Register for an event
export const registerForEvent = async (
  eventType: EventType, 
  title?: string, 
  description?: string,
  teamName?: string,
  teamMembers?: TeamMember[]
): Promise<{ message: string; registration: EventRegistration }> => {
  return apiCall('/api/events/register', {
    method: 'POST',
    body: JSON.stringify({ eventType, title, description, teamName, teamMembers }),
  });
};

// Submit PDF for an event
export const submitEventPdf = async (
  registrationId: string,
  file: File,
  title?: string,
  description?: string
): Promise<{ message: string; registration: EventRegistration }> => {
  const formData = new FormData();
  formData.append('file', file);
  if (title) formData.append('title', title);
  if (description) formData.append('description', description);

  return apiCall(`/api/events/submit/${registrationId}`, {
    method: 'POST',
    body: formData,
  });
};

// Get user's event registrations
export const getMyEventRegistrations = async (): Promise<{ registrations: EventRegistration[] }> => {
  return apiCall('/api/events/my-registrations');
};

// Get user's registration for a specific event
export const getEventRegistration = async (eventType: EventType): Promise<{ registration: EventRegistration | null }> => {
  return apiCall(`/api/events/registration/${eventType}`);
};

// Admin: Get all registrations
export const getAllEventRegistrations = async (
  eventType?: EventType,
  status?: string
): Promise<{ registrations: EventRegistration[] }> => {
  const params = new URLSearchParams();
  if (eventType) params.append('eventType', eventType);
  if (status) params.append('status', status);
  
  const queryString = params.toString();
  return apiCall(`/api/events/all${queryString ? `?${queryString}` : ''}`);
};

// Admin: Update registration status
export const updateEventRegistration = async (
  registrationId: string,
  registrationStatus: string,
  adminRemarks?: string
): Promise<{ message: string; registration: EventRegistration }> => {
  return apiCall(`/api/events/admin/${registrationId}`, {
    method: 'PUT',
    body: JSON.stringify({ registrationStatus, adminRemarks }),
  });
};

// Event info for display
export const eventInfo: Record<EventType, { 
  name: string; 
  fullName: string;
  description: string; 
  icon: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}> = {
  pralekh: {
    name: 'Pralekh',
    fullName: 'प्रलेख - Hindi Essay Writing',
    description: 'Express your thoughts in Hindi through creative essay writing',
    icon: '📜',
    color: 'amber',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-500',
  },
  plotlines: {
    name: 'Plotlines',
    fullName: 'Plotlines - Creative Writing',
    description: 'Craft compelling stories and narratives',
    icon: '✍️',
    color: 'blue',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-indigo-500',
  },
  openmic: {
    name: 'Open Mic',
    fullName: 'Open Mic - Poetry & Performance',
    description: 'Share your poetry and spoken word performances',
    icon: '🎤',
    color: 'purple',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-500',
  },
};
