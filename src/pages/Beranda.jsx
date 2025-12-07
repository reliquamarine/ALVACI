import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Beranda() {
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUsername(data.username || "User");
        }
      } catch (err) {
        console.error("Unable to get profile!", err);
      }
    };
    fetchProfile();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      {/* Responsive Header */}
      <header className="sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#442D1D] font-montserrat mb-2 sm:mb-0 px-2 sm:px-4 md:px-8">
          Artzy
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center font-medium text-[#442D1D] text-base sm:text-lg md:text-xl font-montserrat gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
          <Link
            to="/beranda"
            className="hover:text-amber-700 transition duration-150 px-2 py-1 sm:px-0 sm:py-0"
          >
            Home
          </Link>
          <Link
            to="/gallery-walls"
            className="hover:text-amber-700 transition duration-150 px-2 py-1 sm:px-0 sm:py-0"
          >
            Gallery Walls
          </Link>
          <Link
            to="/add-artwork"
            className="hover:text-amber-700 transition duration-150 px-2 py-1 sm:px-0 sm:py-0"
          >
            Add Artwork
          </Link>
          <Link
            to="/profile"
            className="font-semibold py-1.5 px-4 sm:px-6 md:px-8 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200 text-sm sm:text-base md:text-lg"
          >
            Profile
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center w-full beranda-bg px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12">
        {/* Welcome Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] font-extrabold text-[#442D1D] mb-2 sm:mb-4 tracking-tight leading-tight sm:leading-none">
          Welcome back, {username} !
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#442D1D] mb-8 sm:mb-10 md:mb-12 opacity-90 max-w-2xl lg:max-w-3xl px-4">
          All your creations, beautifully organized
        </p>

        {/* Add Artwork Button */}
        <Link
          to="/add-artwork"
          className="bg-[#442D1D] text-[#F4EFEB] text-base sm:text-lg md:text-xl font-medium py-2.5 sm:py-3 px-8 sm:px-10 md:px-12 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2"
        >
          + Add Artwork
        </Link>
      </main>
    </div>
  );
}

export default Beranda;