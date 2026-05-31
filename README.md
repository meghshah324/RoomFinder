# RoomFinder (ROOM-WISE)

RoomFinder is a full-stack MERN application for discovering and posting room/roommate listings. It includes secure authentication, listing management, image upload, and real-time chat between users.

## Features

- Authentication with JWT and protected routes
- Create, edit, and delete room listings
- Image upload and optimization pipeline (Cloudinary + Sharp)
- Listing search/filter workflows
- Real-time messaging with Socket.IO
- Responsive React UI with Tailwind CSS

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express, Socket.IO
- Database: MongoDB (Mongoose)
- Auth/Security: JWT, bcrypt, cookie-based sessions, rate limiting
- Media: Cloudinary, Multer, Sharp

## Repository Structure

```text
RoomFinder/
  api/         # Express API + Socket.IO server
  MERN-ROOM/   # React frontend (Vite)
```

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+
- MongoDB connection string
- Cloudinary account credentials
- Google Maps API key (for map-related frontend features)

## Environment Variables

Create an `.env` file in `api/`:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AES_SECRET_KEY=your_aes_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

Create an `.env` file in `MERN-ROOM/`:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## Local Setup

1. Clone the repository

```bash
git clone https://github.com/meghshah324/RoomFinder.git
cd RoomFinder
```

2. Install backend dependencies

```bash
cd api
npm install
```

3. Install frontend dependencies

```bash
cd ../MERN-ROOM
npm install
```

## Run the Project

Use two terminals.

1. Start backend server

```bash
cd api
npm run dev
```

2. Start frontend app

```bash
cd MERN-ROOM
npm run dev
```

Frontend: `http://localhost:5173`  
Backend health check: `http://localhost:5000/api/health`

## Available Scripts

Backend (`api/package.json`):

- `npm run dev` - Start API with nodemon
- `npm start` - Start API with node

Frontend (`MERN-ROOM/package.json`):

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint









