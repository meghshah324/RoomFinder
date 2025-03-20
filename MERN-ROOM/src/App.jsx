import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Profile2 from "./pages/Profile2.jsx"
import SignIn from "./pages/SignIn";
import SingUp from "./pages/SingUp";
import Header from "./components/Header";
import Property from "./pages/Property";
import RoommateCard from "./components/RoommateCard.jsx";
import { FromProvide } from "./context/FormContext.jsx"




export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/property" element={<Property />} />
        <Route path="/rooms" element={<RoommateCard />} />
      </Routes>
    </BrowserRouter>

  );
}
