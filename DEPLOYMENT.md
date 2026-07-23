# Deployment Guide

## Backend Deployment (Render.com - Free)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with your GitHub account

### Step 2: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `vakapallimukesh/ComplaintBox`
3. Configure the service:
   - **Name**: complaint-box-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
4. Click "Create Web Service"
5. Wait for deployment (5-10 minutes)
6. Copy your service URL (e.g., `https://complaint-box-backend.onrender.com`)

### Step 3: Update Frontend Configuration
1. Open `.env.production` file
2. Replace the URL with your actual Render backend URL:
   ```
   VITE_API_URL=https://YOUR-SERVICE-NAME.onrender.com
   ```

### Step 4: Deploy Frontend to GitHub Pages
Run these commands:
```bash
npm run build
npm run deploy
```

### Step 5: Test
1. Visit your GitHub Pages site: `https://vakapallimukesh.github.io/ComplaintBox`
2. Try to login with test credentials
3. Check browser console for any errors

## Important Notes

- **Free Tier Limitation**: Render free tier spins down after 15 minutes of inactivity. First request after inactivity takes 30-60 seconds.
- **CORS**: Already configured to accept requests from GitHub Pages
- **Admin Credentials**: 
  - Email: `mukesh@gamil.co`
  - Password: `mukesh`

## Local Development

For local development, run both servers:

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

## Troubleshooting

**Issue**: "Cannot connect to server"
- **Solution**: Backend might be spinning up (wait 60 seconds) or check Render dashboard for errors

**Issue**: CORS errors
- **Solution**: Verify your GitHub Pages URL is in the `allowedOrigins` array in `server.js`

**Issue**: Changes not visible
- **Solution**: Run `npm run deploy` again to rebuild and deploy
