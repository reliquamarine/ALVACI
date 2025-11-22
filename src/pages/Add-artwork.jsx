// AddArtwork.jsx (Menggunakan Tailwind CSS)

import React, { useState } from 'react';

/**
 * Komponen Input Formulir Umum
 */
const FormInput = ({ label, placeholder, type = 'text' }) => (
  <div className="mb-4">
    <label className="block text-xl font-bold text-[#5d4037] mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      // Styling input yang mirip dengan gambar
      className="w-full p-4 rounded-full bg-[#e0d2bd] border border-[#5d4037] text-[#5d4037] placeholder-[#8d7c6e] focus:outline-none focus:ring-2 focus:ring-[#5d4037]"
    />
  </div>
);

/**
 * Komponen AddArtwork (Halaman Tambah Karya Seni)
 */
function AddArtwork() {
  // State untuk mengelola file yang diunggah (opsional, untuk fungsionalitas lanjutan)
  const [uploadedFile, setUploadedFile] = useState(null);

  // Simulasi fungsi drag dan drop (Anda perlu mengimplementasikan logika file nyata)
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      console.log('File di-drop:', e.dataTransfer.files[0].name);
      // Di sini Anda akan menambahkan logika untuk pratinjau gambar dan upload
    }
  };
  
  const handleFormSubmit = (e) => {
      e.preventDefault();
      alert('Formulir disimpan! (Simulasi)');
      // Logika pengiriman data ke backend ada di sini
  };

  return (
    <div className="bg-[#F4EFEB] min-h-screen flex flex-col scroll-smooth">
      
      {/* --- Bagian Navigasi (Header) --- */}
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
      {/* -------------------------------------------------------------------------------------------------- */}

      {/* --- Bagian Utama Formulir Tambah Karya Seni --- */}
      <main className="flex-grow flex flex-col items-center py-12"
            style={{ 
                background: 'linear-gradient(to bottom, #f0e6d6 0%, #d4c2a5 100%)',
            }}
      >
        <form onSubmit={handleFormSubmit} className="flex w-full max-w-7xl px-10">
          
          {/* Kolom Kiri: Drag and Drop */}
          <div className="w-1/2 pr-12">
            <h2 className="text-3xl font-bold text-[#5d4037] mb-6">
              Add to Your Collection
            </h2>
            
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              // Styling area drag & drop
              className="bg-[#e0d2bd] border-4 border-dashed border-[#5d4037] rounded-xl flex flex-col items-center justify-center p-20 min-h-[500px] cursor-pointer transition duration-300 hover:bg-[#d4c2a5]"
              onClick={() => document.getElementById('file-upload').click()} // Klik untuk membuka file explorer
            >
              {uploadedFile ? (
                // Tampilan setelah file diunggah
                <p className="text-xl text-[#5d4037] text-center">
                  File Siap: **{uploadedFile.name}**
                  <br/>Klik untuk mengubah.
                </p>
              ) : (
                // Tampilan default
                <>
                  <svg className="w-20 h-20 text-[#5d4037] mb-4" fill="currentColor" viewBox="0 0 20 20">
                    {/* Ikon awan (cloud) */}
                    <path d="M13 10H7v-1h6v1zm2 0h-1v-1h1v1zm-8 0h-1v-1h1v1zM6 14a2 2 0 100-4 2 2 0 000 4zM14 14a2 2 0 100-4 2 2 0 000 4zM10 2a8 8 0 100 16 8 8 0 000-16zM10 17a7 7 0 110-14 7 7 0 010 14z"/>
                  </svg>
                  <p className="text-xl font-medium text-[#5d4037]">
                    **Drag and Drop Image Files to Upload**
                  </p>
                </>
              )}
              {/* Input file tersembunyi untuk klik biasa */}
              <input type="file" id="file-upload" className="hidden" onChange={(e) => setUploadedFile(e.target.files[0])} accept="image/*" />
            </div>
          </div>

          {/* Kolom Kanan: Formulir Detail */}
          <div className="w-1/2 pl-12">
            
            <FormInput label="Title" placeholder="input text" />
            <FormInput label="Artist Name" placeholder="input text" />
            <FormInput label="Year Created" placeholder="input text" />
            
            <FormInput 
              label="Category" 
              placeholder="painting, photography, digital art, etc" 
            />
            
            <div className="mb-6">
              <label className="block text-xl font-bold text-[#5d4037] mb-2">Description</label>
              <textarea
                placeholder="optional"
                rows="4" // Menambahkan baris untuk tampilan yang lebih baik
                className="w-full p-4 rounded-xl bg-[#e0d2bd] border border-[#5d4037] text-[#5d4037] placeholder-[#8d7c6e] focus:outline-none focus:ring-2 focus:ring-[#5d4037]"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end space-x-4 mt-10">
              <button 
                type="submit" 
                className="bg-[#5d4037] text-white py-3 px-8 rounded-full text-xl font-semibold hover:bg-[#4e342e] transition duration-200"
              >
                Save Artwork
              </button>
              <button 
                type="button" 
                className="bg-[#795548] text-white py-3 px-8 rounded-full text-xl font-semibold hover:bg-[#6d4c41] transition duration-200"
                onClick={() => console.log('Batal')}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddArtwork;