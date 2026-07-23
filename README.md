# Complaint Box System

A full-stack complaint management system built with React and Vite - **Frontend Only Version** (uses browser localStorage).

## Features

- Student complaint submission and tracking
- Admin dashboard for complaint management
- User authentication for students and admins
- Real-time complaint status updates
- **No backend required** - All data stored in browser localStorage

## Tech Stack

- **Frontend:** React, Vite, React Router, Recharts
- **Storage:** Browser localStorage (no server needed)
- **Styling:** CSS with custom properties

## Live Demo

Visit: https://vakapallimukesh.github.io/ComplaintBox

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/vakapallimukesh/ComplaintBox.git
cd ComplaintBox
```

2. Install dependencies
```bash
npm install
```

### Running the Application Locally

**Start the Development Server:**
```bash
npm run dev
```
The app will run on `http://localhost:5173`

### Admin Credentials

- **Email:** `mukesh@gamil.co`
- **Password:** `mukesh`

### Student Access

1. Click "Register here" on the login page
2. Fill in your details and create an account
3. Login with your credentials

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm run preview` - Preview production build

## Important Notes

- **Data Storage:** All data is stored in browser localStorage
- **Data Persistence:** Data persists only in the current browser
- **Private Browsing:** Data will be lost when closing private/incognito windows
- **Clear Data:** Clear browser data will delete all complaints and users

## Deployment

The app is automatically deployed to GitHub Pages. To deploy updates:

```bash
npm run build
npm run deploy
```

## Project Structure

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
