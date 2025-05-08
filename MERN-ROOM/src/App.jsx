import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Profile2 from "./pages/Profile2.jsx"
import Login from "./pages/SignIn";
import SingUp from "./pages/SingUp";
import Header from "./components/Header";
import Property from "./pages/Property";
import RoommateCard from "./components/RoommateCard.jsx";
import { FromProvide } from "./context/FormContext.jsx"
import { AuthProvider } from './context/AuthContext.jsx'
import ChatbotUI from "./components/ChatCard.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import MessagesListPage from "./components/Messages.jsx";
import ChatPage from "./components/ChatPage.jsx";
import ChatBot from "./components/ChatCardForProfile.jsx";
import MyListings from "./pages/MyListing.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Footer from "./components/Footer.jsx";
import MultiImageUploader from "./pages/ImageUpload.jsx";
import Temp from "./pages/temp.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<MultiImageUploader />} /> */}
        <Route path="/form/*"
          element={
            <FromProvide>
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile2" element={<Profile2 />} />
                <Route path="/profile3/:residenceId" element={<MultiImageUploader />} />
              </Routes>
            </FromProvide>
          } />
        <Route path="/profilepage" element={< ProfilePage/>} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/property/:id" element={<Property />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/rooms" element={<RoommateCard />} />
        <Route path="/chat" element={<ChatbotUI />} />
        <Route path="/chat/:conversationId" element={<ChatbotUI />} />
        <Route path="/messages/:conversationId" element={<ChatBot />} />
        <Route path="/chatMessages/:roomId" element={<MessagesListPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/temp" element={<Temp />} />
      </Routes>
      <Footer />
      </AuthProvider>
    </BrowserRouter>

  );
}
