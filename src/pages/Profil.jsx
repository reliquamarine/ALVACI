import React, { useState, useEffect } from "react";
import { User, Edit3 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toastSuccess, toastError } from '../components/ToastWithProgress';

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", { month: "long", year: "numeric" });
};

function Profile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [artworkCount, setArtworkCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setProfileData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchArtworks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/artworks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setArtworkCount(data.length);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
    fetchArtworks();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toastSuccess("Logout Success!");
    navigate("/login");
  };

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFEB] font-montserrat">
        <div className="text-lg sm:text-xl text-[#442D1D]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-montserrat bg-gradient-to-b from-[#F4EFEB] to-[#C5B49A]/50">
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
            className="font-semibold py-1.5 px-4 sm:px-6 md:px-8 border border-gray-500 rounded-3xl bg-[#442D1D] text-white transition duration-200 text-sm sm:text-base md:text-lg"
          >
            Profile
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 font-montserrat gallery-gradient-bg">
        <div className="w-full max-w-4xl space-y-4 sm:space-y-6 md:space-y-8">
          {/* Page Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#442D1D] mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
            My Profile
          </h1>

          {/* Profile Header Card */}
          <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl sm:rounded-3xl md:rounded-[30px] p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 shadow-lg">
            <div className="flex items-center space-x-4 sm:space-x-5 md:space-x-6 w-full sm:w-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-3 sm:border-4 border-white/50 shadow-sm overflow-hidden bg-[#442D1D]/10 flex items-center justify-center flex-shrink-0">
                {profileData.profile_pic ? (
                  <img
                    src={profileData.profile_pic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#442D1D]"
                    strokeWidth={1.5}
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#442D1D] truncate">
                  {profileData.first_name} {profileData.last_name}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-[#442D1D]/70 truncate">
                  {profileData.handle}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/edit-profile")}
              className="flex items-center justify-center space-x-2 bg-[#442D1D] text-white text-sm sm:text-base font-semibold py-2 px-4 sm:px-5 md:px-6 rounded-full shadow-md hover:bg-[#6c4e3e] transition duration-200 cursor-pointer w-full sm:w-auto"
            >
              <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Personal Information Card */}
          <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl sm:rounded-3xl md:rounded-[30px] p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-[#442D1D] mb-4 sm:mb-6 border-b border-[#442D1D]/20 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm font-semibold text-[#442D1D]/70 mb-1">
                  First Name
                </label>
                <p className="text-base sm:text-lg font-medium text-[#442D1D] break-words">
                  {profileData.first_name || "-"}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm font-semibold text-[#442D1D]/70 mb-1">
                  Last Name
                </label>
                <p className="text-base sm:text-lg font-medium text-[#442D1D] break-words">
                  {profileData.last_name || "-"}
                </p>
              </div>
              <div className="flex flex-col sm:col-span-2 lg:col-span-1">
                <label className="text-xs sm:text-sm font-semibold text-[#442D1D]/70 mb-1">
                  Email Address
                </label>
                <p className="text-base sm:text-lg font-medium text-[#442D1D] break-words">
                  {profileData.email || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Summary Card */}
          <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl sm:rounded-3xl md:rounded-[30px] p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-[#442D1D] mb-4 sm:mb-6 border-b border-[#442D1D]/20 pb-2">
              Profile Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm font-semibold text-[#442D1D]/70 mb-1">
                  Artworks Uploaded
                </label>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#442D1D]">
                  {artworkCount}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm font-semibold text-[#442D1D]/70 mb-1">
                  Joined
                </label>
                <p className="text-base sm:text-lg md:text-xl font-medium text-[#442D1D]">
                  {formatDate(profileData.join_date)}
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="w-full flex justify-center sm:justify-end mt-6 sm:mt-8 mb-2 sm:mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-[#442D1D] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#2c1d13] transition shadow-lg cursor-pointer w-full sm:w-auto text-sm sm:text-base"
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