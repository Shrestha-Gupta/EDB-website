// API Base URL
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://edb-website-7oxz.vercel.app' 
  : 'http://localhost:5000';

export interface MunEvent {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  registrationDeadline: string;
  committees: {
    name: string;
    description: string;
    agenda: string;
    countries: string[];
    maxDelegates: number;
  }[];
  isActive: boolean;
}

export interface MunApplication {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    college: string;
    branch: string;
    year: string;
  };
  event: {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    venue: string;
  };
  // New preference fields
  preferredCommittee: 'UNHRC' | 'IP';
  countryPreferences: string[];
  agendaPreferences: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  hasAttendedMun: boolean;
  previousMunExperience: string;
  whyJoin: string;
  // Legacy field
  committeePreferences: string[];
  status: 'pending' | 'approved' | 'rejected' | 'allotted';
  allottedCommittee: string | null;
  allottedCountry: string | null;
  allottedAgenda: string | null;
  positionPaperUrl: string | null;
  positionPaperSubmittedAt: string | null;
  positionPaperRemarks: string;
  adminNotes: string;
  createdAt: string;
}

export interface MunUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  role: 'user' | 'admin';
  isProfileComplete: boolean;
  createdAt: string;
}

// Get auth token
const getToken = (): string | null => localStorage.getItem('token');

// Helper for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

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

// Public APIs
export const getEvents = async (): Promise<MunEvent[]> => {
  const data = await apiCall('/api/mun/events');
  return data.events;
};

export const getEvent = async (id: string): Promise<MunEvent> => {
  const data = await apiCall(`/api/mun/events/${id}`);
  return data.event;
};

// User APIs
export const applyForEvent = async (applicationData: {
  eventId: string;
  preferredCommittee: 'UNHRC' | 'IP';
  countryPreferences: string[];
  agendaPreferences: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  hasAttendedMun: boolean;
  previousMunExperience: string;
  whyJoin: string;
}): Promise<MunApplication> => {
  const data = await apiCall('/api/mun/apply', {
    method: 'POST',
    body: JSON.stringify(applicationData),
  });
  return data.application;
};

export const getMyApplications = async (): Promise<MunApplication[]> => {
  const data = await apiCall('/api/mun/my-applications');
  return data.applications;
};

export const uploadPositionPaper = async (applicationId: string, file: File, remarks?: string): Promise<void> => {
  const token = getToken();
  const formData = new FormData();
  formData.append('positionPaper', file);
  if (remarks) formData.append('remarks', remarks);

  const response = await fetch(`${API_BASE_URL}/api/mun/upload-position-paper/${applicationId}`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Upload failed');
  }
};

// Admin APIs
export const createEvent = async (eventData: Partial<MunEvent>): Promise<MunEvent> => {
  const data = await apiCall('/api/mun/admin/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
  return data.event;
};

export const updateEvent = async (id: string, eventData: Partial<MunEvent>): Promise<MunEvent> => {
  const data = await apiCall(`/api/mun/admin/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  });
  return data.event;
};

export const getAllApplications = async (filters?: {
  eventId?: string;
  status?: string;
}): Promise<MunApplication[]> => {
  let endpoint = '/api/mun/admin/applications';
  const params = new URLSearchParams();
  if (filters?.eventId) params.append('eventId', filters.eventId);
  if (filters?.status) params.append('status', filters.status);
  if (params.toString()) endpoint += `?${params.toString()}`;

  const data = await apiCall(endpoint);
  return data.applications;
};

export const allotApplication = async (
  applicationId: string,
  allotment: {
    committee: string;
    country: string;
    agenda: string;
    notes?: string;
  }
): Promise<MunApplication> => {
  const data = await apiCall(`/api/mun/admin/applications/${applicationId}/allot`, {
    method: 'PUT',
    body: JSON.stringify(allotment),
  });
  return data.application;
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: 'pending' | 'approved' | 'rejected',
  notes?: string
): Promise<MunApplication> => {
  const data = await apiCall(`/api/mun/admin/applications/${applicationId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, notes }),
  });
  return data.application;
};

// Get all registered users (Admin)
export const getAllUsers = async (): Promise<MunUser[]> => {
  const data = await apiCall('/api/mun/admin/users');
  return data.users;
};
