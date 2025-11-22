import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { galleryItems } from "../components/Gallery";

function ViewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemId = Number(id);
  const item = galleryItems.find((g) => g.id === itemId);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Item not found</h2>
          <Link to="/gallery-walls" className="text-blue-600 hover:underline">
            Back to Gallery Walls
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4EFEB] min-h-screen flex flex-col scroll-smooth">
      <header className="sticky top-0 z-10 flex justify-between items-center px-10 py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        <div className="text-5xl font-extrabold text-[#442D1D] font-montserrat px-8">Artzy</div>
        <nav className="flex items-center font-medium text-[#442D1D] px-8 text-2xl font-montserrat">
          <Link to="/beranda" className="hover:text-amber-700 transition duration-150 mr-8">Home</Link>
          <Link to="/gallery-walls" className="hover:text-amber-700 transition duration-150 mr-8">Gallery Walls</Link>
          <Link to="/add-artwork" className="hover:text-amber-700 transition duration-150 mr-8">Add Artwork</Link>
          <Link to="/profile" className="font-semibold py-1.5 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200 px-8">Profile</Link>
        </nav>
      </header>

      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => navigate(-1)} className="text-[#442D1D] hover:underline">&larr; Back</button>
              <h1 className="text-3xl font-bold text-[#442D1D]">{item.title}</h1>
              <div />
            </div>

            <p className="text-lg text-[#4A2E1E] mb-6">by {item.artist}</p>
            <div className="flex justify-center mb-6">
              <img src={item.image} alt={item.title} className="w-96 h-auto object-cover rounded-md" />
            </div>
            <p className="text-sm text-[#442D1D]">This is a placeholder description for the artwork. Replace with real data when available.</p>

            <div className="mt-6">
              <Link to="/gallery-walls" className="inline-block bg-[#442D1D] text-[#E8D1A7] px-4 py-2 rounded-full hover:bg-[#886757]">Back to Gallery Walls</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewDetail;