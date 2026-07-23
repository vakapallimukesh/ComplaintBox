const API_BASE = '/api/auth';
const API_ROOT = '/api';

const parseResponse = async (response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Failed to parse response:', text);
    throw new Error('Server returned invalid JSON response. Please ensure the backend server is running.');
  }
};

const getJson = async (url) => {
  try {
    const response = await fetch(url);
    return handleResponse(response, 'Request failed');
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please ensure the backend server is running on port 5001.');
    }
    throw error;
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
      throw new Error('Cannot connect to server. Please ensure the backend server is running on port 5001.');
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

export const getAdminMetrics = async () => {
  return getJson(`${API_ROOT}/admin/metrics`);
};

export const getComplaints = async () => {
  return getJson(`${API_ROOT}/complaints`);
};

export const getUserComplaints = async (userId) => {
  return getJson(`${API_ROOT}/complaints/my/${userId}`);
};

export const submitComplaint = async (complaintData) => {
  return postJson(`${API_ROOT}/complaints`, complaintData, 'Complaint submission failed');
};

export const resetAppData = async () => {
  return postJson(`${API_BASE}/reset`, {}, 'Reset failed');
};
