# 🏠 ROOM-WISE – MERN Stack Room Finder Web App

**ROOM-WISE** is a full-stack Room Finder web application that connects room owners with potential renters. Built using the **MERN stack** (MongoDB, Express, React, Node.js) and styled with **Tailwind CSS**, the platform supports dynamic search, real-time messaging, and secure multi-image uploads.


## 🚀 Features

- 🔍 **Dynamic Search & Filter**
  - Search rooms by **city, price, location**
  - Instant filtering for a seamless UX

- 🏠 **Room Listings for Owners**
  - List rooms with **title, description, price, and location**
  - Upload up to 5 images using **Cloudinary**

- 📍 **Google Maps Integration**
  - View rooms directly on the map
  - Auto-suggest addresses and city detection

- 🗨️ **Secure Real-Time Chat**
  - Encrypted **Socket.IO**-based private messaging
  - **JWT authentication** for secure user sessions

- 🧾 **User Roles & Auth**
  - Separate flows for **buyers and sellers**
  - **JWT-protected routes** and **role-based UI**

---

## 🧑‍💻 Tech Stack

| Frontend        | Backend        | Database | Auth        | Other Tools               |
|-----------------|----------------|----------|-------------|----------------------------|
| React.js        | Node.js        | MongoDB  | JWT         | Tailwind CSS              |
| Google Maps API | Express.js     |          | bcrypt.js   | Cloudinary (image upload) |
|                 | Socket.IO      |          |             | Postman (API testing)     |

---



## 🌐 APIs & Integration

- **Cloudinary API**: Upload and store room images
- **Google Maps API**: Location autocomplete and maps
- **Socket.IO**: Real-time chat between buyers and sellers




## 🧪 Setup & Installation

Follow the steps below to run the **RoomFinder** MERN stack application locally.

---

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/meghshah324/RoomFinder.git
cd RoomFinder
```

### 2. 🛠️ Backend Setup (API)

```bash
cd api
npm install
```


### 📄 Create a .env file in the api/ folder with the following variables:

- PORT=5000
- MONGO_URI=your_mongodb_uri
- JWT_SECRET=your_jwt_secret
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_cloudinary_api_key
- CLOUDINARY_API_SECRET=your_cloudinary_api_secret
- CLOUDINARY_URL=your_cloudinary_url
- AES_SECRET_KEY=your_aes_secret_key

▶️ Start the Backend Server
```bash
npm run dev
```

### 3. 🖥️ Frontend Setup (React)

```bash
cd MERN-ROOM
npm install
```

### 📄 Create a .env file in the MERN-ROOM/ folder with the following variables:

- VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key


▶️ Start the Frontend Server
```bash
npm run dev
```
### 4. 🌐 Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```








