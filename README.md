# Complaint Box System

A full-stack complaint management system built with React, Vite, and Express.

## Features

- Student complaint submission and tracking
- Admin dashboard for complaint management
- User authentication for students and admins
- Real-time complaint status updates

## Tech Stack

- **Frontend:** React, Vite, React Router, Recharts
- **Backend:** Node.js, Express
- **Styling:** CSS with custom properties

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd complaint-box-main
```

2. Install dependencies
```bash
npm install
```

### Running the Application

**IMPORTANT:** You need to run both the frontend and backend servers simultaneously.

1. **Start the Backend Server** (in one terminal):
```bash
npm run server
```
The backend will run on `http://localhost:5001`

2. **Start the Frontend Development Server** (in another terminal):
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

### Admin Credentials

- **Email:** `mukesh@gamil.co`
- **Password:** `mukesh`

### Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run server` - Start the backend server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

If you see "Server returned invalid JSON response" or "Cannot connect to server":
- Make sure the backend server is running (`npm run server`)
- Verify the backend is running on port 5001
- Check that both servers are running simultaneously

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
