# Complaint Box System

A full-stack complaint management system with **Real Backend & Database** - works across multiple devices!

## 🎯 Features

- Student complaint submission and tracking
- Admin dashboard for complaint management  
- User authentication for students and admins
- Real-time complaint status updates
- **✅ Multi-device support** - Works on different phones and computers
- **✅ Real database** - MongoDB cloud database (free tier)
- **✅ Cross-network access** - Different WiFi networks, no problem!

## 🚀 Live Demo

**Website:** https://vakapallimukesh.github.io/ComplaintBox

**Admin Login:**
- Email: `mukesh@gmail.com`
- Password: `mukesh`

## 💻 Tech Stack

- **Frontend:** React, Vite, React Router, Recharts
- **Backend:** Node.js, Express
- **Database:** MongoDB (Cloud - MongoDB Atlas)
- **Hosting:** GitHub Pages (frontend) + Render.com (backend)
- **Styling:** CSS with custom properties

---

## 📋 Deployment Guide

### ⚡ Quick Setup (3 Steps - 15 minutes)

1. **Create MongoDB Database** (5 min) - See `QUICK-START.md`
2. **Deploy Backend to Render** (5 min) - See `BACKEND-DEPLOYMENT.md`
3. **Update & Deploy Frontend** (2 min)

**Full instructions:** See `BACKEND-DEPLOYMENT.md`

---

## 🏠 Local Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas connection string)

### Installation

```bash
# Clone repository
git clone https://github.com/vakapallimukesh/ComplaintBox.git
cd ComplaintBox

# Install dependencies
npm install
```

### Running Locally

**Option 1: With Local MongoDB**
```bash
# Make sure MongoDB is running locally
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

**Option 2: With MongoDB Atlas**
```bash
# Create .env file with your MongoDB connection string
MONGODB_URI=mongodb+srv://your-connection-string

# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

- Backend: http://localhost:5001
- Frontend: http://localhost:5173

---

## 🧪 Testing Multi-Device

1. **Phone 1:** Register student, submit complaint
2. **Phone 2 (different WiFi):** Register different student, submit complaint
3. **Computer:** Login as admin → See BOTH complaints! ✅

---

## 📁 Project Structure

```
├── src/
│   ├── api/          # API service with backend calls
│   ├── components/   # Reusable components
│   ├── layouts/      # Layout components
│   ├── pages/        # Page components
│   └── main.jsx      # Application entry point
├── server-mongodb.js # Backend server with MongoDB
├── .env             # Environment variables (local)
├── .env.production  # Production backend URL
└── public/          # Static assets
```

---

## ⚙️ Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
PORT=5001
NODE_ENV=development
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 🔧 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server with MongoDB
- `npm run build` - Build frontend for production
- `npm run deploy` - Deploy frontend to GitHub Pages
- `npm run preview` - Preview production build

---

## ⚠️ Important Notes

### Free Tier Limitations
- **Render.com:** Backend sleeps after 15 min inactivity (first request takes 30-60s)
- **MongoDB Atlas:** 512MB storage limit (plenty for this app)

### Cold Start
If website shows "Cannot connect to server":
- Wait 60 seconds (backend waking up from sleep)
- Refresh page
- Should work normally after wake up

---

## 🆘 Troubleshooting

### "Cannot connect to server"
1. Check backend is deployed on Render
2. Verify MongoDB connection string
3. Wait 60 seconds for cold start
4. Check Render logs

### "Authentication failed"
1. Verify MongoDB credentials
2. Check IP whitelist (0.0.0.0/0 for public access)
3. Ensure password is correctly encoded in connection string

### Changes not showing
1. Clear browser cache (Ctrl+Shift+R)
2. Try incognito/private mode
3. Redeploy: `npm run deploy`

---

## 📚 Documentation

- `QUICK-START.md` - Fast 3-step deployment guide
- `BACKEND-DEPLOYMENT.md` - Detailed deployment instructions
- `CHANGES-SUMMARY.md` - What changed and why

---

## 🎓 Admin Credentials

**Email:** mukesh@gmail.com  
**Password:** mukesh

### Student Access
Students must register first, then can login with their credentials.

---

## ✨ What Makes This Special?

✅ **Real multi-user system** - Not just localStorage  
✅ **Works across devices** - Phone, tablet, computer  
✅ **Cross-network** - Different WiFi, cellular data  
✅ **Free hosting** - No monthly costs  
✅ **Production-ready** - MongoDB + Express backend  

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🤝 Contributing

Feel free to fork, modify, and use this project!

---

Made with ❤️ for campus complaint management

```
├── src/
│   ├── api/          # API service functions
│   ├── components/   # Reusable components
│   ├── layouts/      # Layout components
│   ├── pages/        # Page components
│   └── main.jsx      # Application entry point
├── server.js         # Backend server
└── public/           # Static assets
```
