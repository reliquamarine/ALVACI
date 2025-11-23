import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Beranda() {
  const [username, setUsername] = useState("User");
  useEffect(() => {
    const storedData = localStorage.getItem("artzy_account");

    if (storedData) {
      try {
        const userData = JSON.parse(storedData);

        if (userData.username) {
          setUsername(userData.username);
        }
      } catch (error) {
        console.error("Unable to get user data", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <header className="sticky top-0 z-10 flex justify-between items-center px-10 py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        <div className="text-4xl font-extrabold text-[#442D1D] font-montserrat px-8"> Artzy</div>

        <nav className="flex items-center font-medium text-[#442D1D] px-8 text-xl font-montserrat">
          <a href="/beranda" className="hover:text-amber-700 transition duration-150 mr-8">Home</a>
          <a href="/gallery-walls" className="hover:text-amber-700 transition duration-150 mr-8">Gallery Walls</a>
          <a href="/add-artwork" className="hover:text-amber-700 transition duration-150 mr-8">Add Artwork</a>
          <a href="/profile" className="font-semibold py-1.5 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200 px-8">Profile</a>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center w-full beranda-bg">
        <h1 className="text-[70px] font-extrabold text-[#442D1D] mb-2 tracking-tight">
          Welcome back, {username} !
        </h1>

        <p className="text-3xl font-medium text-[#442D1D] mb-12 opacity-90">
          All your creations, beautifully organized
        </p>

        <a href="/add-artwork" className="bg-[#442D1D] text-[#F4EFEB] text-xl font-medium py-3 px-12 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2">
          + Add Artwork
        </a>
      </main>
    </div>
  );
}

export default Beranda;
