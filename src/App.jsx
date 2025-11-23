import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Beranda from "./pages/Beranda";
import GalleryWalls from "./pages/Gallery-walls";
import ViewDetail from "./pages/view-detail";
import AddArtwork from "./pages/Add-artwork";
import Profile from "./pages/Profil";
import ForgotPassPage from "./pages/forgotpass";
import EditProfilePage from "./pages/EditProfilePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-Password" element={<ForgotPassPage />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/gallery-walls" element={<GalleryWalls />} />
        <Route path="/artwork/:id" element={<ViewDetail />} />
        <Route path="/add-artwork" element={<AddArtwork />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;