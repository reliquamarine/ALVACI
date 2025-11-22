// Profile.jsx (Menggunakan Tailwind CSS)

import React from 'react';

/**
 * Data Placeholder Profil Pengguna
 */
const userData = {
  fullName: 'Lorem Dolot',
  username: '@ametkece',
  firstName: 'Lorem',
  lastName: 'Dolot',
  email: 'Loremkece@gmail.com',
  artworksUploaded: 3,
  joinedDate: 'November 2025',
};

// --- Komponen Navbar (Diambil dari komponen sebelumnya untuk konsistensi) ---
const CustomNavbar = () => (
    <header className="sticky top-0 z-10 flex justify-between items-center px-10 py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        <div className="text-5xl font-extrabold text-[#442D1D] font-montserrat px-8">
            Artzy
        </div>
        <nav className="flex items-center font-medium text-[#442D1D] px-8 text-2xl font-montserrat">
            <a href="/beranda" className="hover:text-amber-700 transition duration-150 mr-8">Home</a>
            <a href="/gallery-walls" className="hover:text-amber-700 transition duration-150 mr-8">Gallery Walls</a>
            <a href="/add-artwork" className="hover:text-amber-700 transition duration-150 mr-8">Add Artwork</a>
            <a href="/profile" className="hover:text-amber-700 transition duration-150 mr-8">Profile</a>
        </nav>
    </header>
);

/**
 * Komponen Profile
 */
function Profile() {
  const handleLogout = () => {
    alert('Log Out berhasil! (Simulasi)');
    console.log('User logged out');
    // Di aplikasi nyata, ini akan menghapus token autentikasi dan mengarahkan ke halaman login
  };

  return (
    <div className="bg-[#F4EFEB] min-h-screen flex flex-col scroll-smooth">
      
      <CustomNavbar />
      
      {/* --- Bagian Utama Profil --- */}
      <main className="flex-grow flex flex-col items-center py-12 px-10"
            style={{ 
                // Latar belakang gradien yang konsisten
                background: 'linear-gradient(to bottom, #f0e6d6 0%, #d4c2a5 100%)',
            }}
      >
        <div className="w-full max-w-4xl">
          
          {/* Judul Utama */}
          <h1 className="text-5xl font-bold text-[#5d4037] mb-10 pt-5">
            My Profile
          </h1>

          {/* Kartu 1: Info Dasar & Edit Profile */}
          <div className="bg-[#e0d2bd] shadow-xl rounded-xl p-6 mb-8 flex items-center justify-between">
            <div className="flex items-center">
              {/* Ikon Profil */}
              <div className="bg-[#5d4037] p-3 rounded-full mr-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#5d4037]">{userData.fullName}</p>
                <p className="text-lg text-[#795548]">{userData.username}</p>
              </div>
            </div>
            
            <button className="bg-[#5d4037] text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-[#4e342e] transition duration-200">
              Edit Profile
            </button>
          </div>

          {/* Kartu 2: Informasi Pribadi */}
          <div className="bg-[#e0d2bd] shadow-xl rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-[#5d4037] mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-3 gap-8">
              {/* Kolom First Name */}
              <div>
                <p className="text-xl font-semibold text-[#795548]">First Name</p>
                <p className="text-xl text-[#5d4037]">{userData.firstName}</p>
              </div>
              
              {/* Kolom Last Name */}
              <div>
                <p className="text-xl font-semibold text-[#795548]">Last Name</p>
                <p className="text-xl text-[#5d4037]">{userData.lastName}</p>
              </div>
              
              {/* Kolom Email Address */}
              <div>
                <p className="text-xl font-semibold text-[#795548]">Email Adress</p>
                <p className="text-xl text-[#5d4037] truncate">{userData.email}</p>
              </div>
            </div>
          </div>

          {/* Kartu 3: Ringkasan Profil */}
          <div className="bg-[#e0d2bd] shadow-xl rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold text-[#5d4037] mb-6">Profile Summary</h2>
            
            <div className="grid grid-cols-2 gap-8">
              {/* Kolom Artworks Uploaded */}
              <div>
                <p className="text-xl font-semibold text-[#795548]">Artworks Uploaded</p>
                <p className="text-xl text-[#5d4037]">{userData.artworksUploaded}</p>
              </div>
              
              {/* Kolom Joined */}
              <div>
                <p className="text-xl font-semibold text-[#795548]">Joined</p>
                <p className="text-xl text-[#5d4037]">{userData.joinedDate}</p>
              </div>
            </div>
          </div>
          
          {/* Tombol Log Out (Ditempatkan di kanan bawah halaman) */}
          <div className="flex justify-end">
            <button 
              onClick={handleLogout}
              className="bg-[#5d4037] text-white py-3 px-8 rounded-full text-xl font-semibold hover:bg-[#4e342e] transition duration-200"
            >
              Log Out
            </button>
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default Profile;