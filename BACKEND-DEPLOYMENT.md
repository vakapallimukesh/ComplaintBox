# Backend Deployment Guide with MongoDB

## ✅ Changes Made

Your app now uses a **REAL BACKEND** with MongoDB database:
- ✅ Works across multiple devices and WiFi networks
- ✅ All users see the same data
- ✅ Proper database storage (not localStorage)
- ✅ Admin can see complaints from all students

---

## 📋 Step 1: Create Free MongoDB Database (5 minutes)

### 1.1 Go to MongoDB Atlas
Visit: https://www.mongodb.com/cloud/atlas/register

### 1.2 Sign Up (Free)
- Click "Try Free"
- Sign up with Google or email
- Choose **FREE** tier (M0 Sandbox)

### 1.3 Create a Cluster
- Select **AWS** as cloud provider
- Choose region closest to you
- Click "Create Cluster" (takes 1-3 minutes)

### 1.4 Create Database User
- Click "Database Access" in left menu
- Click "Add New Database User"
- Username: `complaintuser`
- Password: (Generate strong password or use: `ComplaintBox2024`)
- **SAVE THIS PASSWORD!**
- Click "Add User"

### 1.5 Allow Network Access
- Click "Network Access" in left menu
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (for testing)
- Click "Confirm"

### 1.6 Get Connection String
- Click "Database" in left menu
- Click "Connect" button on your cluster
- Select "Connect your application"
- Copy the connection string (looks like):
  ```
  mongodb+srv://complaintuser:<password>@cluster0.xxxxx.mongodb.net
  ```
- **Replace `<password>` with your actual password!**

---

## 📋 Step 2: Deploy Backend to Render.com (5 minutes)

### 2.1 Go to Render
Visit: https://render.com

### 2.2 Sign Up with GitHub
- Click "Get Started"
- Sign up with your GitHub account

### 2.3 Create New Web Service
- Click "New +" → "Web Service"
- Connect your repository: `vakapallimukesh/ComplaintBox`
- Click "Connect"

### 2.4 Configure the Service
Fill in these details:
- **Name:** `complaint-box-backend` (or any name you like)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Select **Free**

### 2.5 Add Environment Variable
Scroll down to "Environment Variables":
- Click "Add Environment Variable"
- **Key:** `MONGODB_URI`
- **Value:** (Paste your MongoDB connection string from Step 1.6)
- Example: `mongodb+srv://complaintuser:ComplaintBox2024@cluster0.xxxxx.mongodb.net`

### 2.6 Deploy
- Click "Create Web Service"
- Wait 5-10 minutes for deployment
- You'll see a URL like: `https://complaint-box-backend.onrender.com`
- **COPY THIS URL!**

---

## 📋 Step 3: Update Frontend Configuration (2 minutes)

### 3.1 Update Production Environment
1. Open file: `.env.production`
2. Replace with your actual backend URL:
   ```
   VITE_API_URL=https://complaint-box-backend.onrender.com
   ```
   (Use YOUR actual URL from Render)

### 3.2 Commit and Deploy
Run these commands:
```bash
cd /Users/vakapallimukesh/Desktop/complaint-box-main
git add -A
git commit -m "Add MongoDB backend with real database"
git push origin main
npm run deploy
```

---

## 🧪 Step 4: Test Your Website (Multi-Device)

### Test on Phone 1:
1. Open: https://vakapallimukesh.github.io/ComplaintBox
2. Register as student (e.g., name: "Student A", roll: "101")
3. Submit a complaint

### Test on Phone 2 (Different WiFi):
1. Open same URL
2. Register different student (name: "Student B", roll: "102")
3. Submit a complaint

### Test on Computer:
1. Open same URL
2. Login as admin:
   - Email: `mukesh@gmail.com`
   - Password: `mukesh`
3. **You should see BOTH complaints from Phone 1 and Phone 2!** ✅

---

## ⚠️ Important Notes

### Free Tier Limitations:
- **Render Free Tier:** Backend sleeps after 15 minutes of inactivity
- **First request after sleep:** Takes 30-60 seconds to wake up
- **MongoDB Free Tier:** 512MB storage (plenty for this app)

### Cold Start Warning:
If website seems slow or shows "Cannot connect to server":
- Wait 60 seconds (backend is waking up)
- Refresh the page
- Should work fine after first wake up

---

## 🔧 Local Development

### Run Backend Locally:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

Backend runs on: http://localhost:5001
Frontend runs on: http://localhost:5173

---

## 🆘 Troubleshooting

### "Cannot connect to server"
**Solutions:**
1. Check if backend is deployed on Render
2. Verify MongoDB connection string is correct
3. Wait 60 seconds (cold start)
4. Check Render logs for errors

### "Authentication failed" on MongoDB
**Solutions:**
1. Double-check password in connection string
2. Ensure no special characters need URL encoding
3. Verify IP whitelist includes "0.0.0.0/0" (allow all)

### Changes not showing on website
**Solutions:**
1. Run `npm run deploy` again
2. Clear browser cache (Ctrl+Shift+R)
3. Try incognito/private window

---

## ✅ Success Checklist

- [ ] MongoDB cluster created
- [ ] Database user created with password
- [ ] Connection string copied
- [ ] Backend deployed to Render.com
- [ ] Environment variable `MONGODB_URI` added
- [ ] `.env.production` updated with backend URL
- [ ] Code pushed to GitHub
- [ ] Frontend deployed to GitHub Pages
- [ ] Tested on multiple devices ✅

---

## 📞 Need Help?

If you get stuck, check:
1. Render deployment logs
2. Browser console (F12)
3. MongoDB Atlas metrics

Your app now has a REAL backend and database! 🎉
