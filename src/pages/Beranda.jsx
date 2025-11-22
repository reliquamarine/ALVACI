import React from 'react';
import { Link } from 'react-router-dom';

function Beranda() {
  return (
  
    <div className="bg-[#F4EFEB] min-h-screen flex flex-col scroll-smooth">
      
     <header className="sticky top-0 z-10 flex justify-between items-center px-10 py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        
        <div className="text-5xl font-extrabold text-[#442D1D] font-montserrat px-8">
          Artzy
        </div>

        <nav className="flex items-center font-medium text-[#442D1D] px-8 text-2xl font-montserrat">
          
          <a href="/beranda" className="hover:text-amber-700 transition duration-150 mr-8">Home</a>
          <a href="/gallery-walls" className="hover:text-amber-700 transition duration-150 mr-8">Gallery Walls</a>
          <a href="/add-artwork" className="hover:text-amber-700 transition duration-150 mr-8">Add Artwork</a>
          <a href="/profile" className=" hover:text-amber_amber-700 transition duration-150 mr-8"> Profile</a>
        </nav>
      </header>

      <main className="flex-grow flex justify-center items-center text-center p-10"
            style={{ 
                background: 'linear-gradient(to bottom, #f0e6d6 0%, #d4c2a5 100%)',
            }}
      >
        <div className="pb-24"> {/* pb-24 = padding-bottom: 6rem untuk menggeser ke atas */}
          
          {/* Judul Selamat Datang */}
          <h1 className="text-6xl font-extrabold text-[#442D1D] mb-3">
            Welcome back, User !
          </h1>
          
          {/* Subjudul */}
          <p className="text-3xl text-[#442D1D] mb-10">
            All your creations, beautifully organized
          </p>
          
          {/* Tombol Add Artwork */}
          <Link to="/add-artwork" className="bg-[#442D1D] text-white border-none py-4 px-8 rounded-[30px] text-xl font-semibold cursor-pointer shadow-lg hover:bg-[#4e342e] transition duration-200 inline-block">
            + Add Artwork
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Beranda;