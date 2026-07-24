// Backend API implementation with real server
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API_BASE = `${API_URL}/api/auth`;
const API_ROOT = `${API_URL}/api`;

const parseResponse = async (response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Failed to parse response:', text);
    throw new Error('Server returned invalid response. Please try again.');
  }
};

const handleResponse = async (response, defaultErrorMessage) => {
  const data = await parseResponse(response);
  if (!response.ok) {
    const message = data?.message || defaultErrorMessage;
    throw new Error(message);
  }
  return data;
};

const postJson = async (url, body, defaultErrorMessage) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(response, defaultErrorMessage);
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please ensure you are online and the backend server is running.');
    }
    throw error;
  }
};

const getJson = async (url, defaultErrorMessage) => {
  try {
    const response = await fetch(url);
    return handleResponse(response, defaultErrorMessage);
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please ensure you are online and the backend server is running.');
    }
    throw error;
  }
};

const putJson = async (url, body, defaultErrorMessage) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(response, defaultErrorMessage);
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please ensure you are online and the backend server is running.');
    }
    throw error;
  }
};

export const registerUser = async (userData) => {
  return postJson(`${API_BASE}/register`, userData, 'Registration failed');
};

export const loginUser = async (credentials) => {
  return postJson(`${API_BASE}/login`, credentials, 'Login failed');
};

export const loginAdmin = async (credentials) => {
  return postJson(`${API_BASE}/admin-login`, credentials, 'Admin login failed');
};

export const submitComplaint = async (complaintData) => {
  return postJson(`${API_ROOT}/complaints`, complaintData, 'Complaint submission failed');
};

export const getComplaints = async () => {
  return getJson(`${API_ROOT}/complaints`, 'Failed to fetch complaints');
};

export const getUserComplaints = async (userId) => {
  return getJson(`${API_ROOT}/complaints/my/${userId}`, 'Failed to fetch your complaints');
};

export const getComplaintById = async (complaintId) => {
  return getJson(`${API_ROOT}/complaints/${complaintId}`, 'Failed to fetch complaint details');
};

export const updateComplaintStatus = async (complaintId, status, adminResponse) => {
  return putJson(`${API_ROOT}/complaints/${complaintId}`, { status, adminResponse }, 'Failed to update complaint');
};

export const getAdminMetrics = async () => {
  return getJson(`${API_ROOT}/admin/metrics`, 'Failed to fetch metrics');
};

export const resetAppData = async () => {
  return postJson(`${API_BASE}/reset`, {}, 'Reset failed');
};
