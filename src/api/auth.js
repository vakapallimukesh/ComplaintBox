// Frontend-only implementation using localStorage (no backend required)

const STORAGE_KEYS = {
  USERS: 'complaint_users',
  COMPLAINTS: 'complaint_complaints',
  ADMIN: 'complaint_admin'
};

// Initialize admin user
const adminUser = {
  id: 'admin-1',
  email: 'mukesh@gmail.com',
  password: 'mukesh',
  name: 'Campus Administrator'
};

// Helper functions
const getStorageData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const findUser = (identifier) => {
  const users = getStorageData(STORAGE_KEYS.USERS);
  return users.find(
    (user) => user.email === identifier || user.rollNumber === identifier
  );
};

export const registerUser = async (userData) => {
  const { fullName, rollNumber, email, password, department } = userData;

  if (!fullName || !rollNumber || !email || !password || !department) {
    throw new Error('All fields are required.');
  }

  const users = getStorageData(STORAGE_KEYS.USERS);

  if (findUser(email) || findUser(rollNumber)) {
    throw new Error('Email or roll number already registered.');
  }

  const newUser = {
    id: `user-${Date.now()}`,
    fullName,
    rollNumber,
    email,
    password,
    department
  };

  users.push(newUser);
  setStorageData(STORAGE_KEYS.USERS, users);

  return { message: 'User registered successfully.', user: newUser };
};

export const loginUser = async (credentials) => {
  const { identifier, password } = credentials;

  if (!identifier || !password) {
    throw new Error('Identifier and password are required.');
  }

  const user = findUser(identifier);
  if (!user || user.password !== password) {
    throw new Error('Invalid roll number/email or password.');
  }

  return { message: 'Login successful.', user };
};

export const loginAdmin = async (credentials) => {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  if (email !== adminUser.email || password !== adminUser.password) {
    throw new Error('Invalid admin credentials.');
  }

  return { 
    message: 'Admin login successful.', 
    admin: { id: adminUser.id, name: adminUser.name, email: adminUser.email } 
  };
};

export const submitComplaint = async (complaintData) => {
  const { userId, title, branch, locationDetail, description, category } = complaintData;

  if (!userId || !title || !branch || !locationDetail || !description || !category) {
    throw new Error('All complaint fields are required.');
  }

  const users = getStorageData(STORAGE_KEYS.USERS);
  const user = users.find((u) => u.id === userId);
  
  if (!user) {
    throw new Error('User not found.');
  }

  const complaints = getStorageData(STORAGE_KEYS.COMPLAINTS);
  
  const newComplaint = {
    id: `C-${1000 + complaints.length + 1}`,
    student: user.fullName,
    studentId: user.id,
    category,
    title,
    branch,
    locationDetail,
    description,
    status: 'Pending',
    date: new Date().toISOString().split('T')[0]
  };

  complaints.push(newComplaint);
  setStorageData(STORAGE_KEYS.COMPLAINTS, complaints);

  return { message: 'Complaint submitted successfully.', complaint: newComplaint };
};

export const getComplaints = async () => {
  const complaints = getStorageData(STORAGE_KEYS.COMPLAINTS);
  return { complaints };
};

export const getUserComplaints = async (userId) => {
  const complaints = getStorageData(STORAGE_KEYS.COMPLAINTS);
  const myComplaints = complaints.filter((complaint) => complaint.studentId === userId);
  return { complaints: myComplaints };
};

export const getAdminMetrics = async () => {
  const users = getStorageData(STORAGE_KEYS.USERS);
  const complaints = getStorageData(STORAGE_KEYS.COMPLAINTS);
  
  const totalUsers = users.length;
  const activeComplaints = complaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Rejected').length;
  const inProgress = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedMonthly = complaints.filter((c) => c.status === 'Resolved').length;
  const alerts = Math.max(0, activeComplaints - 5);

  return { 
    totalUsers, 
    activeComplaints, 
    inProgress, 
    resolvedMonthly, 
    alerts, 
    totalComplaints: complaints.length 
  };
};

export const resetAppData = async () => {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.COMPLAINTS);
  return { message: 'All stored user data has been cleared.' };
};

export const updateComplaintStatus = async (complaintId, status, response) => {
  const complaints = getStorageData(STORAGE_KEYS.COMPLAINTS);
  const complaintIndex = complaints.findIndex(c => c.id === complaintId);
  
  if (complaintIndex === -1) {
    throw new Error('Complaint not found.');
  }
  
  complaints[complaintIndex] = {
    ...complaints[complaintIndex],
    status,
    adminResponse: response,
    updatedDate: new Date().toISOString().split('T')[0]
  };
  
  setStorageData(STORAGE_KEYS.COMPLAINTS, complaints);
  
  return { 
    message: 'Complaint updated successfully.', 
    complaint: complaints[complaintIndex] 
  };
};

export const getComplaintById = async (complaintId) => {
  const complaints = getStorageData(STORAGE_KEYS.COMPLAINTS);
  const complaint = complaints.find(c => c.id === complaintId);
  
  if (!complaint) {
    throw new Error('Complaint not found.');
  }
  
  return { complaint };
};
