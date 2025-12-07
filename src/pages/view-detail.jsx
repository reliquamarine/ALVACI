import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit3 } from "lucide-react"; // Import ikon Edit
import { toastSuccess, toastError } from "../components/ToastWithProgress";
import ConfirmModal from "../components/ConfirmModal";

function ViewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchArtwork = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/artworks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setArtwork(data);
        } else {
          throw new Error(data.error || "Artwork not found!");
        }
      } catch (err) {
        setError(err.message);
        console.error("Unable to view detail artwork!", err);
      }
    };
    fetchArtwork();
  }, [id, navigate]);

  const handleDelete = async () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/artworks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toastSuccess("Artwork successfully deleted!");
        navigate("/gallery-walls");
      } else {
        const data = await res.json();
        toastError(data.error || "Failed to delete artwork!");
      }
    } catch (err) {
      toastError("Terjadi kesalahan saat menghapus!");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFEB] text-[#442D1D] px-4">
        <div className="text-center">
          <p className="text-lg sm:text-xl font-medium">{error}</p>
          <p className="text-sm sm:text-base mt-2 opacity-80">Try refreshing!</p>
        </div>
      </div>
    );
  }

  if (!artwork)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFEB] text-[#442D1D] text-lg sm:text-xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <main className="flex-grow w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 gallery-gradient-bg flex flex-col items-center justify-center">
        {/* Back Button */}
        <div className="w-full max-w-6xl relative flex items-center justify-center mb-6 sm:mb-8">
          <Link
            to="/gallery-walls"
            className="absolute left-0 p-2 sm:p-3 text-[#442D1D] hover:text-[#2c1d13] transition"
            aria-label="Back to gallery"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3.0}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
        </div>

        {/* Artwork Detail Card */}
        <div className="bg-[#E8D1A7] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[15px] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-lg sm:shadow-xl md:shadow-2xl flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 w-full max-w-4xl items-stretch min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6">
            <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 sm:border-3 md:border-4 border-white/40 w-full h-full max-h-[400px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[600px]">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Info Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-[#442D1D]">
            {/* Title Section */}
            <div className="border-b border-[#442D1D]/20 pb-3 sm:pb-4 mb-3 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-1 line-clamp-2">
                {artwork.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl italic opacity-80 line-clamp-1">
                by {artwork.artist}
              </p>
            </div>

            {/* Year and Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
                  Year Created
                </span>
                <p className="text-base sm:text-lg font-semibold">
                  {artwork.year
                    ? new Date(artwork.year).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
                  Category
                </span>
                <p className="text-base sm:text-lg font-semibold capitalize line-clamp-1">
                  {artwork.category}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 sm:mb-5 md:mb-6 flex-grow">
              <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-1 sm:mb-2">
                Description
              </span>
              <p className="text-sm sm:text-base leading-relaxed opacity-90 max-h-[120px] sm:max-h-[150px] overflow-y-auto pr-2">
                {artwork.description || "No description provided."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 sm:pt-4 mt-auto border-t border-[#442D1D]/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
              <button
                onClick={() => navigate(`/edit-artwork/${artwork.id}`)}
                className="group flex items-center gap-2 sm:gap-3 text-[#442D1D] font-bold text-sm sm:text-base hover:text-[#2c1d13] transition w-full sm:w-fit cursor-pointer justify-center sm:justify-start"
              >
                <div className="p-1.5 sm:p-2 bg-[#442D1D]/10 rounded-full group-hover:bg-[#442D1D]/20 transition">
                  <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <span>Edit Artwork</span>
              </button>

              <button
                onClick={handleDelete}
                className="group flex items-center gap-2 sm:gap-3 text-red-800 font-bold text-sm sm:text-base hover:text-red-600 transition w-full sm:w-fit cursor-pointer justify-center sm:justify-end"
              >
                <div className="p-1.5 sm:p-2 bg-red-800/10 rounded-full group-hover:bg-red-800/20 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
                <span>Delete Artwork</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Artwork?"
          message="This artwork will be permanently deleted. Are you sure?"
          confirmText="Delete"
          cancelText="Cancel"
        />
      </main>
    </div>
  );
}

export default ViewDetail;