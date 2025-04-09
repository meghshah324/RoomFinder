import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
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


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/form/*"
          element={
            <FromProvide>
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile2" element={<Profile2 />} />
              </Routes>
            </FromProvide>
          } />
        <Route path="/profilepage" element={< ProfilePage/>} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/property/:id" element={<Property />} />
        <Route path="/rooms" element={<RoommateCard />} />
        <Route path="/chat" element={<ChatbotUI />} />
        <Route path="/messages" element={<MessagesListPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}
