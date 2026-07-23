const API_BASE = '/api/auth';
const API_ROOT = '/api';

const parseResponse = async (response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Server returned invalid JSON response.');
  }
};

const getJson = async (url) => {
  const response = await fetch(url);
  return handleResponse(response, 'Request failed');
};

const handleResponse = async (response, defaultErrorMessage) => {
  const data = await parseResponse(response);
  if (!response.ok) {
    const message = data?.message || defaultErrorMessage;
    throw new Error(message);
  }
  return data;
};

const postJson = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return response;
};

export const registerUser = async (userData) => {
  const response = await postJson(`${API_BASE}/register`, userData);
  return handleResponse(response, 'Registration failed');
};

export const loginUser = async (credentials) => {
  const response = await postJson(`${API_BASE}/login`, credentials);
  return handleResponse(response, 'Login failed');
};

export const loginAdmin = async (credentials) => {
  const response = await postJson(`${API_BASE}/admin-login`, credentials);
  return handleResponse(response, 'Admin login failed');
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
  const response = await postJson(`${API_ROOT}/complaints`, complaintData);
  return handleResponse(response, 'Complaint submission failed');
};

export const resetAppData = async () => {
  const response = await postJson(`${API_BASE}/reset`, {});
  return handleResponse(response, 'Reset failed');
};
