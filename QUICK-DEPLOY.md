# Quick Deployment Steps

## ✅ Changes Already Pushed to GitHub

All code changes have been pushed to GitHub. Now follow these steps:

## Step 1: Deploy Backend to Render.com (5 minutes)

1. **Go to** https://render.com and sign up with GitHub

2. **Click** "New +" → "Web Service"

3. **Select** your repository: `vakapallimukesh/ComplaintBox`

4. **Configure:**
   - Name: `complaint-box-backend` (or any name you like)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Select **Free** plan

5. **Click** "Create Web Service"

6. **Wait** 5-10 minutes for deployment

7. **Copy** your backend URL (e.g., `https://complaint-box-backend.onrender.com`)

## Step 2: Update Frontend Configuration

1. **Open** `.env.production` file in your code

2. **Replace** the URL with YOUR backend URL:
   ```
   VITE_API_URL=https://YOUR-ACTUAL-SERVICE-NAME.onrender.com
   ```
   (Don't include `/api` at the end)

3. **Save** the file

## Step 3: Deploy Frontend

Run these commands in your terminal:

```bash
cd /Users/vakapallimukesh/Desktop/complaint-box-main
git add .env.production
git commit -m "Update backend URL"
git push origin main
npm run deploy
```

## Step 4: Test Your Website

1. Wait 2-3 minutes after deployment
2. Visit: https://vakapallimukesh.github.io/ComplaintBox
3. Try to login

## Test Credentials

**Student (need to register first)**
- Click "Register here" and create an account

**Admin:**
- Email: `mukesh@gamil.co`
- Password: `mukesh`

## ⚠️ Important Notes

- **First Load**: Render free tier sleeps after 15 min of inactivity. First request takes 30-60 seconds
- **Cold Start**: If login takes long, wait a minute - the backend is waking up
- The "Clear all stored data" button has been removed from login page

## Troubleshooting

**"Cannot connect to server"**
- Check if backend is deployed on Render
- Verify the URL in `.env.production` is correct
- Wait 60 seconds for cold start

**"Changes not showing"**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Try incognito/private mode

**Backend not deploying**
- Check Render dashboard for build logs
- Ensure all files are pushed to GitHub
