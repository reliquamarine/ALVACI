import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function GalleryWalls() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchArtworks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/artworks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setArtworks(data);
        }
      } catch (err) {
        console.error("Gagal ambil artworks", err);
      }
    };
    fetchArtworks();
  }, [navigate]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 350;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      {/* Responsive Header */}
      <header className="sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#442D1D] font-montserrat mb-2 sm:mb-0 px-2 sm:px-4 md:px-8">
          Artzy
        </div>
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

      <main className="flex-grow w-full flex flex-col gallery-gradient-bg overflow-hidden bg-gradient-to-b from-[#F4EFEB] to-[#C5B49A]">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#442D1D] text-center mt-6 sm:mt-8 md:mt-10 px-4">
          Gallery Walls
        </h1>

        {artworks.length === 0 ? (
          /* Empty State */
          <div className="flex-grow flex flex-col items-center justify-center text-center px-4 -mt-12 sm:-mt-16 md:-mt-20">
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#442D1D] mb-8 sm:mb-10 md:mb-12 opacity-90 max-w-md">
              looks a little empty here.. start your collection
            </p>
            <button
              onClick={() => navigate("/add-artwork")}
              className="bg-[#442D1D] text-[#F4EFEB] text-base sm:text-lg md:text-xl font-medium py-2.5 sm:py-3 px-8 sm:px-10 md:px-12 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              + Add Artwork
            </button>
          </div>
        ) : (
          /* Gallery Slider */
          <div className="flex-grow flex items-center justify-center w-full px-4 sm:px-6 md:px-8 lg:px-10 relative pb-12 sm:pb-16 md:pb-20">
            {/* Left Scroll Button - Hidden on small screens, visible on medium+ */}
            <button
              onClick={scrollLeft}
              className="hidden sm:flex absolute left-2 sm:left-4 md:left-6 lg:left-10 z-20 p-1 sm:p-2 rounded-full hover:bg-[#442D1D]/10 transition cursor-pointer bg-white/50 backdrop-blur-sm"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="#442D1D"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Artworks Slider */}
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 overflow-x-auto scroll-smooth px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 no-scrollbar w-full max-w-7xl items-start sm:items-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {artworks.map((art) => (
                <div
                  key={art.id}
                  className="flex-none w-64 sm:w-72 md:w-80 lg:w-95 bg-[#E8D1A7] text-center rounded-lg sm:rounded-xl shadow-lg overflow-hidden flex flex-col justify-center transform hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300 min-h-[380px] sm:min-h-[420px]"
                >
                  {/* Image Container */}
                  <div className="h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden flex justify-center mt-4 sm:mt-6 md:mt-8 px-4 sm:px-5 md:px-6">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover rounded-md shadow-sm"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-grow mt-[-0.25rem] sm:mt-[-0.5rem]">
                    <div className="mb-3 sm:mb-4">
                      <p className="text-base sm:text-lg md:text-xl font-bold text-[#442D1D] mb-1 leading-tight line-clamp-2">
                        {art.title}
                      </p>
                      <p className="text-sm sm:text-base font-medium text-[#442D1D] line-clamp-1">
                        by {art.artist}
                      </p>
                    </div>

                    {/* View Details Link */}
                    <div
                      onClick={() => navigate(`/artwork/${art.id}`)}
                      className="text-xs sm:text-sm font-medium italic text-[#442D1D] hover:text-[#6c4e3e] cursor-pointer mb-1 sm:mb-2 transition-colors duration-200"
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && navigate(`/artwork/${art.id}`)}
                    >
                      View Details
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Scroll Button - Hidden on small screens, visible on medium+ */}
            <button
              onClick={scrollRight}
              className="hidden sm:flex absolute right-2 sm:right-4 md:right-6 lg:right-10 z-20 p-1 sm:p-2 rounded-full hover:bg-[#442D1D]/10 transition cursor-pointer bg-white/50 backdrop-blur-sm"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="#442D1D"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            {/* Mobile Scroll Indicators */}
            <div className="sm:hidden flex justify-center gap-2 mt-4 w-full">
              <div className="text-xs text-[#442D1D]/70 italic">
                Swipe to view more artworks →
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default GalleryWalls;