const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface DebateRegistrationData {
  fullName: string;
  branch: string;
  rollNo: string;
  contactNumber: string;
  email: string;
}

export const registerForDebate = async (data: DebateRegistrationData) => {
  try {
    const response = await fetch(`${API_URL}/debate/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Registration failed');
    }

    return responseData;
  } catch (error: any) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

export const getAllDebateRegistrations = async () => {
  try {
    const response = await fetch(`${API_URL}/debate/all`);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch registrations');
    }

    return responseData;
  } catch (error) {
    console.error('Error fetching debate registrations:', error);
    throw error;
  }
};
