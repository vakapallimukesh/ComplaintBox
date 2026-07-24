import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5001;

// Setup database with error handling
let db;
let file;

async function initializeDatabase() {
  try {
    file = join(__dirname, 'db.json');
    const adapter = new JSONFile(file);
    db = new Low(adapter, {});
    
    await db.read();
    db.data ||= { users: [], complaints: [] };
    await db.write();
    
    console.log('✅ Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    // Use in-memory database as fallback
    db = { 
      data: { users: [], complaints: [] },
      write: async () => { console.log('In-memory write'); },
      read: async () => { console.log('In-memory read'); }
    };
    console.log('⚠️ Using in-memory database');
    return false;
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
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('github.io')) {
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

// Helper function to find user
function findUser(identifier) {
  return db.data.users.find(
    (user) => user.email === identifier || user.rollNumber === identifier
  );
}

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Register request:', req.body);
    const { fullName, rollNumber, email, password, department } = req.body;

    if (!fullName || !rollNumber || !email || !password || !department) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = db.data.users.find(
      (user) => user.email === email || user.rollNumber === rollNumber
    );

    if (existingUser) {
      return res.status(409).json({ message: 'Email or roll number already registered.' });
    }

    const newUser = {
      id: `user-${Date.now()}`,
      fullName,
      rollNumber,
      email,
      password,
      department,
      createdAt: new Date().toISOString()
    };

    db.data.users.push(newUser);
    await db.write();
    
    console.log('User registered:', newUser.id);

    return res.status(201).json({ 
      message: 'User registered successfully.', 
      user: newUser
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: `Registration failed: ${error.message}` });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Identifier and password are required.' });
    }

    const user = findUser(identifier);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid roll number/email or password.' });
    }

    return res.json({ 
      message: 'Login successful.', 
      user: {
        id: user.id,
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

    const user = db.data.users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newComplaint = {
      id: `C-${1000 + db.data.complaints.length + 1}`,
      student: user.fullName,
      studentId: userId,
      category,
      title,
      branch,
      locationDetail,
      description,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    db.data.complaints.push(newComplaint);
    await db.write();

    return res.status(201).json({ 
      message: 'Complaint submitted successfully.', 
      complaint: newComplaint
    });
  } catch (error) {
    console.error('Submit complaint error:', error);
    return res.status(500).json({ message: 'Failed to submit complaint. Please try again.' });
  }
});

// Get all complaints endpoint
app.get('/api/complaints', async (req, res) => {
  try {
    await db.read();
    return res.json({ complaints: db.data.complaints });
  } catch (error) {
    console.error('Get complaints error:', error);
    return res.status(500).json({ message: 'Failed to fetch complaints.' });
  }
});

// Get user's complaints endpoint
app.get('/api/complaints/my/:userId', async (req, res) => {
  try {
    await db.read();
    const { userId } = req.params;
    const complaints = db.data.complaints.filter(c => c.studentId === userId);
    return res.json({ complaints });
  } catch (error) {
    console.error('Get user complaints error:', error);
    return res.status(500).json({ message: 'Failed to fetch complaints.' });
  }
});

// Get complaint by ID endpoint
app.get('/api/complaints/:complaintId', async (req, res) => {
  try {
    await db.read();
    const { complaintId } = req.params;
    const complaint = db.data.complaints.find(c => c.id === complaintId);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }

    return res.json({ complaint });
  } catch (error) {
    console.error('Get complaint error:', error);
    return res.status(500).json({ message: 'Failed to fetch complaint.' });
  }
});

// Update complaint status endpoint
app.put('/api/complaints/:complaintId', async (req, res) => {
  try {
    await db.read();
    const { complaintId } = req.params;
    const { status, adminResponse } = req.body;

    if (!status || !adminResponse) {
      return res.status(400).json({ message: 'Status and response are required.' });
    }

    const complaintIndex = db.data.complaints.findIndex(c => c.id === complaintId);
    if (complaintIndex === -1) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }

    db.data.complaints[complaintIndex].status = status;
    db.data.complaints[complaintIndex].adminResponse = adminResponse;
    db.data.complaints[complaintIndex].updatedDate = new Date().toISOString().split('T')[0];
    db.data.complaints[complaintIndex].updatedAt = new Date().toISOString();

    await db.write();

    return res.json({ 
      message: 'Complaint updated successfully.',
      complaint: db.data.complaints[complaintIndex]
    });
  } catch (error) {
    console.error('Update complaint error:', error);
    return res.status(500).json({ message: 'Failed to update complaint.' });
  }
});

// Get admin metrics endpoint
app.get('/api/admin/metrics', async (req, res) => {
  try {
    await db.read();
    const totalUsers = db.data.users.length;
    const totalComplaints = db.data.complaints.length;
    const activeComplaints = db.data.complaints.filter(c => 
      c.status !== 'Resolved' && c.status !== 'Rejected'
    ).length;
    const inProgress = db.data.complaints.filter(c => c.status === 'In Progress').length;
    const resolvedMonthly = db.data.complaints.filter(c => c.status === 'Resolved').length;
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
    db.data.users = [];
    db.data.complaints = [];
    await db.write();
    return res.json({ message: 'All stored user data has been cleared.' });
  } catch (error) {
    console.error('Reset error:', error);
    return res.status(500).json({ message: 'Failed to reset data.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend server is running', 
    users: db.data?.users?.length || 0,
    complaints: db.data?.complaints?.length || 0
  });
});

// Start server
async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${file || 'in-memory'}`);
    console.log(`🌍 Ready to accept connections`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
