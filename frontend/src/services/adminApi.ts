// Admin API Service
// Unified API service for admin operations

// API Base URL
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://edb-website-7oxz.vercel.app' 
  : 'http://localhost:5000';

// Re-export from existing services
export { 
  getAllEventRegistrations, 
  updateEventRegistration,
  type EventRegistration,
  type EventType,
  eventInfo 
} from './eventsApi';

export { 
  getAllApplications, 
  getAllUsers,
  updateApplicationStatus,
  allotApplication,
  lockAllotment,
  updatePaymentStatus,
  updatePositionPaperStatus,
  createEvent,
  getEvents,
  type MunApplication,
  type MunUser,
  type MunEvent
} from './munApi';

// Arunoday Types
export interface ArunodayTeamMember {
  name: string;
  rollNumber: string;
  branch: string;
}

export interface ArunodayRegistration {
  _id: string;
  teamName: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  teamLeaderRollNumber: string;
  teamLeaderBranch: string;
  teamLeaderPhone?: string;
  teamMembers: ArunodayTeamMember[];
  preferredLanguage: string;
  eventCategory?: string;
  status: 'pending' | 'approved' | 'rejected';
  remarks?: string;
  createdAt: string;
  updatedAt: string;
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

// Arunoday Admin APIs
export const getArunodayRegistrations = async (): Promise<ArunodayRegistration[]> => {
  const data = await apiCall('/api/arunoday/registrations');
  return data.data;
};

export const updateArunodayStatus = async (
  id: string,
  status: 'pending' | 'approved' | 'rejected',
  remarks?: string
): Promise<ArunodayRegistration> => {
  const data = await apiCall(`/api/arunoday/registration/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, remarks }),
  });
  return data.data;
};

export const deleteArunodayRegistration = async (id: string): Promise<void> => {
  await apiCall(`/api/arunoday/registration/${id}`, {
    method: 'DELETE',
  });
};
