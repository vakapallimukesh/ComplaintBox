import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const users = [];
const complaints = [];
const adminUser = {
  id: 'admin-1',
  email: 'admin@college.edu',
  password: 'admin123',
  name: 'Campus Administrator'
};

function findUser(identifier) {
  return users.find(
    (user) => user.email === identifier || user.rollNumber === identifier
  );
}

function findComplaintById(complaintId) {
  return complaints.find((complaint) => complaint.id === complaintId);
}

app.post('/api/auth/register', (req, res) => {
  const { fullName, rollNumber, email, password, department } = req.body;

  if (!fullName || !rollNumber || !email || !password || !department) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (findUser(email) || findUser(rollNumber)) {
    return res.status(409).json({ message: 'Email or roll number already registered.' });
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
  return res.status(201).json({ message: 'User registered successfully.', user: newUser });
});

app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Identifier and password are required.' });
  }

  const user = findUser(identifier);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid roll number/email or password.' });
  }

  return res.json({ message: 'Login successful.', user });
});

app.post('/api/auth/admin-login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  if (email !== adminUser.email || password !== adminUser.password) {
    return res.status(401).json({ message: 'Invalid admin credentials.' });
  }

  return res.json({ message: 'Admin login successful.', admin: { id: adminUser.id, name: adminUser.name, email: adminUser.email } });
});

app.post('/api/complaints', (req, res) => {
  const { userId, title, branch, locationDetail, description, category } = req.body;

  if (!userId || !title || !branch || !locationDetail || !description || !category) {
    return res.status(400).json({ message: 'All complaint fields are required.' });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

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
  return res.status(201).json({ message: 'Complaint submitted successfully.', complaint: newComplaint });
});

app.get('/api/complaints', (req, res) => {
  return res.json({ complaints });
});

app.get('/api/complaints/my/:userId', (req, res) => {
  const myComplaints = complaints.filter((complaint) => complaint.studentId === req.params.userId);
  return res.json({ complaints: myComplaints });
});

app.get('/api/admin/metrics', (req, res) => {
  const totalUsers = users.length;
  const activeComplaints = complaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Rejected').length;
  const inProgress = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedMonthly = complaints.filter((c) => c.status === 'Resolved').length;
  const alerts = Math.max(0, activeComplaints - 5);

  return res.json({ totalUsers, activeComplaints, inProgress, resolvedMonthly, alerts, totalComplaints: complaints.length });
});

app.post('/api/auth/reset', (req, res) => {
  users.length = 0;
  complaints.length = 0;
  return res.json({ message: 'All stored user data has been cleared.' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
