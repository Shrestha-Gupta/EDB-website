// User Info Admin API Service
// API service for admin user information endpoints

// API Base URL
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://edb-website-7oxz.vercel.app' 
  : 'http://localhost:5000';

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

// Types
export interface UserInfo {
  _id: string;
  email: string;
  name: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  role: string;
  isProfileComplete: boolean;
  preferredCommittee: string;
  countryPreferences: string[];
  experienceLevel: string;
  allottedCountry: string;
  allottedCommittee: string;
  allottedNewspaper: string; // For IP participants
  createdAt: string;
  updatedAt: string;
}

export interface MunRegistration {
  _id: string;
  delegateId: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    college: string;
    branch: string;
    year: string;
  };
  preferredCommittee: string;
  countryPreferences: string[];
  experienceLevel: string;
  status: string;
  allottedCommittee: string | null;
  allottedCountry: string | null;
  positionPaperStatus: string;
  positionPaperUrl: string | null;
  createdAt: string;
}

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
  teamLeaderPhone: string;
  teamMembers: ArunodayTeamMember[];
  preferredLanguage: string;
  eventCategory: string;
  status: string;
  remarks: string;
  createdAt: string;
}

export interface EventRegistrationInfo {
  _id: string;
  eventType: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  teamName?: string;
  teamMembers?: Array<{
    name: string;
    email: string;
    phone: string;
    college: string;
    branch: string;
    year: string;
  }>;
  title?: string;
  description?: string;
  submissionUrl?: string;
  submissionFileName?: string;
  submissionDate?: string;
  registrationStatus: string;
  createdAt: string;
}

export interface EventRegistrationsResponse {
  mun: {
    count: number;
    registrations: MunRegistration[];
  };
  arunoday: {
    count: number;
    registrations: ArunodayRegistration[];
  };
  pralekh: {
    count: number;
    registrations: EventRegistrationInfo[];
  };
  plotlines: {
    count: number;
    registrations: EventRegistrationInfo[];
  };
  openmic: {
    count: number;
    registrations: EventRegistrationInfo[];
  };
}

export interface UnregisteredUser {
  _id: string;
  email: string;
  name: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  isProfileComplete: boolean;
  createdAt: string;
}

// API Functions

// Get all users
export const getAllUsersInfo = async (): Promise<{ count: number; data: UserInfo[] }> => {
  const response = await apiCall('/api/admin/user-info/all-users');
  return { count: response.count, data: response.data };
};

// Get event registrations grouped by type
export const getEventRegistrations = async (): Promise<EventRegistrationsResponse> => {
  const response = await apiCall('/api/admin/user-info/event-registrations');
  return response.data;
};

// Get unregistered users
export const getUnregisteredUsers = async (): Promise<{ count: number; data: UnregisteredUser[] }> => {
  const response = await apiCall('/api/admin/user-info/unregistered-users');
  return { count: response.count, data: response.data };
};

// Helper to trigger file download
const downloadExcel = async (url: string, filename: string) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Export failed');
  }

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(downloadUrl);
};

// Export all users
export const exportAllUsers = async (): Promise<void> => {
  await downloadExcel('/api/admin/user-info/export/all-users', 'all_users.xlsx');
};

// Export event-specific registrations
export const exportEventRegistrations = async (eventType: string): Promise<void> => {
  await downloadExcel(`/api/admin/user-info/export/event/${eventType}`, `${eventType}_registrations.xlsx`);
};

// Export unregistered users
export const exportUnregisteredUsers = async (): Promise<void> => {
  await downloadExcel('/api/admin/user-info/export/unregistered', 'unregistered_users.xlsx');
};
