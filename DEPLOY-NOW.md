# 🚀 Deploy Backend NOW (2 Minutes!)

## ✅ Simple Backend - No MongoDB Setup Needed!

I've created a simpler backend that uses a JSON file as database. **No MongoDB setup required!**

---

## 📋 Deploy to Render.com (FREE - 2 minutes)

### Step 1: Go to Render
Visit: https://render.com

### Step 2: Sign Up
- Click "Get Started"
- Sign up with your GitHub account

### Step 3: Create Web Service
- Click "New +" → "Web Service"
- Click "Connect account" → Connect your GitHub
- Find and select: `vakapallimukesh/ComplaintBox`
- Click "Connect"

### Step 4: Configure
Fill in EXACTLY these values:

**Name:** `complaint-box-backend`

**Environment:** `Node`

**Branch:** `main`

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Plan:** Select **Free**

### Step 5: Deploy!
- Click "Create Web Service"
- Wait 3-5 minutes
- You'll see: ✅ "Live"
- **COPY YOUR URL!** (like: `https://complaint-box-backend.onrender.com`)

---

## 📋 Update Frontend (1 minute)

### Step 1: Edit .env.production
Open file: `.env.production`

Change to YOUR backend URL:
```
VITE_API_URL=https://YOUR-ACTUAL-URL.onrender.com
```
(Don't add `/api` at the end - just the base URL)

### Step 2: Deploy Frontend
```bash
cd /Users/vakapallimukesh/Desktop/complaint-box-main
git add .env.production
git commit -m "Update backend URL"
git push origin main
npm run deploy
```

---

## 🧪 Test It!

### Phone 1:
1. Go to: https://vakapallimukesh.github.io/ComplaintBox
2. Register as student
3. Submit complaint

### Phone 2 (Different WiFi):
1. Go to same URL
2. Register different student
3. Submit complaint

### Computer:
1. Login as admin: `mukesh@gmail.com` / `mukesh`
2. **See BOTH complaints!** ✅

---

## ⚠️ First Load

**First request after deploy:** Takes 30-60 seconds (server starting)
**After that:** Works instantly!

---

## ✅ That's It!

No MongoDB setup needed!
No environment variables needed!
Just deploy and it works!

🎉 Your backend is ready!
