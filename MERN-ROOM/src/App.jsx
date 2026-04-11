import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import FlowNavigationGuard from "./components/FlowNavigationGuard.jsx";

function AppLayout() {
  const location = useLocation();
  const isChatRoute =
    location.pathname === "/chat" || location.pathname.startsWith("/messages/");
  const hideFooter =
    isChatRoute;

  return (
    <AuthProvider>
      <FromProvide>
        <FlowNavigationGuard />
        {!isChatRoute && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />

            <Route
              path="/form/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile2" element={<Profile2 />} />
                    <Route path="/address" element={<AddressForm />} />
                    <Route path="/profile3" element={<MultiImageUploader />} />
                  </Routes>
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
        {!hideFooter && <Footer />}
      </FromProvide>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
