import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Profile2 from "./pages/Profile2.jsx";
import Login from "./pages/SignIn";
import SingUp from "./pages/SingUp";
import Header from "./components/Header";
import Property from "./pages/Property";
import RoommateCard from "./components/RoommateCard.jsx";
import { FromProvide } from "./context/FormContext.jsx";
import { AuthProvider } from './context/AuthContext.jsx';
import ChatbotUI from "./components/ChatCard.jsx";
import MessagesListPage from "./components/Messages.jsx";
import ChatBot from "./components/ChatCardForProfile.jsx";
import MyListings from "./pages/MyListing.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Footer from "./components/Footer.jsx";
import MultiImageUploader from "./pages/ImageUpload.jsx";
import AddressForm from "./components/Address.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/form/*"
            element={
              <ProtectedRoute>
                <FromProvide>
                  <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile2" element={<Profile2 />} />
                    <Route path="/address" element={<AddressForm />} />
                    <Route path="/profile3/:residenceId" element={<MultiImageUploader />} />
                  </Routes>
                </FromProvide>
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                <MyListings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatbotUI />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat/:conversationId"
            element={
              <ProtectedRoute>
                <ChatbotUI />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages/:conversationId"
            element={
              <ProtectedRoute>
                <ChatBot />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chatMessages/:roomId"
            element={
              <ProtectedRoute>
                <MessagesListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/rooms" element={<RoommateCard />} />
          <Route path="/property/:id" element={<Property />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
