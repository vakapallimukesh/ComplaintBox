import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'complaintbox';

let db;
let usersCollection;
let complaintsCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    db = client.db(DB_NAME);
    usersCollection = db.collection('users');
    complaintsCollection = db.collection('complaints');
    
    // Create indexes
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ rollNumber: 1 }, { unique: true });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://vakapallimukesh.github.io'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now
    }
  },
  credentials: true
}));

app.use(express.json());

// Admin user (hardcoded)
const adminUser = {
  id: 'admin-1',
  email: 'mukesh@gmail.com',
  password: 'mukesh',
  name: 'Campus Administrator'
};

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, rollNumber, email, password, department } = req.body;

    if (!fullName || !rollNumber || !email || !password || !department) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      $or: [{ email }, { rollNumber }]
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email or roll number already registered.' });
    }

    const newUser = {
      fullName,
      rollNumber,
      email,
      password,
      department,
      createdAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);
    newUser.id = result.insertedId.toString();

    return res.status(201).json({ 
      message: 'User registered successfully.', 
      user: { ...newUser, _id: undefined }
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Identifier and password are required.' });
    }

    const user = await usersCollection.findOne({
      $or: [{ email: identifier }, { rollNumber: identifier }]
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid roll number/email or password.' });
    }

    return res.json({ 
      message: 'Login successful.', 
      user: { 
        id: user._id.toString(),
        fullName: user.fullName,
        rollNumber: user.rollNumber,
        email: user.email,
        department: user.department
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

// Admin login endpoint
app.post('/api/auth/admin-login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  if (email !== adminUser.email || password !== adminUser.password) {
    return res.status(401).json({ message: 'Invalid admin credentials.' });
  }

  return res.json({ 
    message: 'Admin login successful.', 
    admin: { id: adminUser.id, name: adminUser.name, email: adminUser.email } 
  });
});

// Submit complaint endpoint
app.post('/api/complaints', async (req, res) => {
  try {
    const { userId, title, branch, locationDetail, description, category } = req.body;

    if (!userId || !title || !branch || !locationDetail || !description || !category) {
      return res.status(400).json({ message: 'All complaint fields are required.' });
    }

    // Get user details
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Get complaint count for ID generation
    const count = await complaintsCollection.countDocuments();

    const newComplaint = {
      complaintId: `C-${1000 + count + 1}`,
      student: user.fullName,
      studentId: userId,
      category,
      title,
      branch,
      locationDetail,
      description,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date()
    };

    const result = await complaintsCollection.insertOne(newComplaint);
    newComplaint.id = newComplaint.complaintId;

    return res.status(201).json({ 
      message: 'Complaint submitted successfully.', 
      complaint: { ...newComplaint, _id: undefined }
    });
  } catch (error) {
    console.error('Submit complaint error:', error);
    return res.status(500).json({ message: 'Failed to submit complaint. Please try again.' });
  }
});

// Get all complaints endpoint
app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await complaintsCollection.find().sort({ createdAt: -1 }).toArray();
    
    const formattedComplaints = complaints.map(c => ({
      id: c.complaintId,
      student: c.student,
      studentId: c.studentId,
      category: c.category,
      title: c.title,
      branch: c.branch,
      locationDetail: c.locationDetail,
      description: c.description,
      status: c.status,
      date: c.date,
      adminResponse: c.adminResponse,
      updatedDate: c.updatedDate
    }));

    return res.json({ complaints: formattedComplaints });
  } catch (error) {
    console.error('Get complaints error:', error);
    return res.status(500).json({ message: 'Failed to fetch complaints.' });
  }
});

// Get user's complaints endpoint
app.get('/api/complaints/my/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const complaints = await complaintsCollection.find({ studentId: userId }).sort({ createdAt: -1 }).toArray();
    
    const formattedComplaints = complaints.map(c => ({
      id: c.complaintId,
      student: c.student,
      studentId: c.studentId,
      category: c.category,
      title: c.title,
      branch: c.branch,
      locationDetail: c.locationDetail,
      description: c.description,
      status: c.status,
      date: c.date,
      adminResponse: c.adminResponse,
      updatedDate: c.updatedDate
    }));

    return res.json({ complaints: formattedComplaints });
  } catch (error) {
    console.error('Get user complaints error:', error);
    return res.status(500).json({ message: 'Failed to fetch complaints.' });
  }
});

// Get complaint by ID endpoint
app.get('/api/complaints/:complaintId', async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await complaintsCollection.findOne({ complaintId });
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }

    const formattedComplaint = {
      id: complaint.complaintId,
      student: complaint.student,
      studentId: complaint.studentId,
      category: complaint.category,
      title: complaint.title,
      branch: complaint.branch,
      locationDetail: complaint.locationDetail,
      description: complaint.description,
      status: complaint.status,
      date: complaint.date,
      adminResponse: complaint.adminResponse,
      updatedDate: complaint.updatedDate
    };

    return res.json({ complaint: formattedComplaint });
  } catch (error) {
    console.error('Get complaint error:', error);
    return res.status(500).json({ message: 'Failed to fetch complaint.' });
  }
});

// Update complaint status endpoint
app.put('/api/complaints/:complaintId', async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status, adminResponse } = req.body;

    if (!status || !adminResponse) {
      return res.status(400).json({ message: 'Status and response are required.' });
    }

    const result = await complaintsCollection.updateOne(
      { complaintId },
      { 
        $set: { 
          status, 
          adminResponse,
          updatedDate: new Date().toISOString().split('T')[0],
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }

    const updatedComplaint = await complaintsCollection.findOne({ complaintId });

    return res.json({ 
      message: 'Complaint updated successfully.',
      complaint: {
        id: updatedComplaint.complaintId,
        status: updatedComplaint.status,
        adminResponse: updatedComplaint.adminResponse
      }
    });
  } catch (error) {
    console.error('Update complaint error:', error);
    return res.status(500).json({ message: 'Failed to update complaint.' });
  }
});

// Get admin metrics endpoint
app.get('/api/admin/metrics', async (req, res) => {
  try {
    const totalUsers = await usersCollection.countDocuments();
    const totalComplaints = await complaintsCollection.countDocuments();
    const activeComplaints = await complaintsCollection.countDocuments({ 
      status: { $nin: ['Resolved', 'Rejected'] } 
    });
    const inProgress = await complaintsCollection.countDocuments({ status: 'In Progress' });
    const resolvedMonthly = await complaintsCollection.countDocuments({ status: 'Resolved' });
    const alerts = Math.max(0, activeComplaints - 5);

    return res.json({ 
      totalUsers, 
      activeComplaints, 
      inProgress, 
      resolvedMonthly, 
      alerts, 
      totalComplaints 
    });
  } catch (error) {
    console.error('Get metrics error:', error);
    return res.status(500).json({ message: 'Failed to fetch metrics.' });
  }
});

// Reset data endpoint
app.post('/api/auth/reset', async (req, res) => {
  try {
    await usersCollection.deleteMany({});
    await complaintsCollection.deleteMany({});
    return res.json({ message: 'All stored user data has been cleared.' });
  } catch (error) {
    console.error('Reset error:', error);
    return res.status(500).json({ message: 'Failed to reset data.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
});
