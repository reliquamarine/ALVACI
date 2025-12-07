import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Save, User, Trash2 } from "lucide-react";
import { toastSuccess, toastError } from "../components/ToastWithProgress";
import ConfirmModal from "../components/ConfirmModal";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isDeletePhotoModalOpen, setIsDeletePhotoModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    profile_pic: "",
  });

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
          setFormData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            username: data.username || "",
            email: data.email || "",
            profile_pic: data.profile_pic || "",
          });
          if (data.profile_pic) setPhotoPreview(data.profile_pic);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toastError("File size too large! Max 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData((prev) => ({ ...prev, profile_pic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setIsDeletePhotoModalOpen(true);
  };

  const confirmDeletePhoto = () => {
    setPhotoPreview(null);
    setFormData((prev) => ({ ...prev, profile_pic: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
    toastSuccess("Profile photo deleted!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toastSuccess("Profile updated successfully!");
        navigate("/profile");
      } else {
        throw new Error(data.error || "Failed to update profile");
      }
    } catch (err) {
      toastError(err.message);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#442D1D] text-lg sm:text-xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen gallery-gradient-bg font-montserrat relative overflow-hidden flex items-center justify-center py-8 sm:py-10 md:py-12 px-4 sm:px-6">
      <div className="absolute top-0 left-0 w-full h-48 sm:h-56 md:h-64 rounded-b-3xl sm:rounded-b-[40px] md:rounded-b-[50px]"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/profile")}
        className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-1 sm:gap-2 text-[#442D1D] hover:text-[#372517] transition text-sm sm:text-base"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-4 sm:w-6 sm:h-5 stroke-current"
        >
          <path
            d="M15.75 19.5 8.25 12l7.5-7.5"
            fill="none"
            strokeWidth="3.0"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-semibold cursor-pointer">Back to Profile</span>
      </button>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white/20 backdrop-blur-md border border-white/30 rounded-lg sm:rounded-xl md:rounded-[20px] shadow-lg sm:shadow-xl md:shadow-2xl pt-16 sm:pt-20 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-8 lg:px-12 mt-6 sm:mt-8 md:mt-10">
        {/* Profile Photo */}
        <div className="absolute -top-12 sm:-top-14 md:-top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-3 sm:border-4 border-white shadow-lg overflow-hidden bg-[#F4EFEB] flex items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#442D1D]/30" />
              )}
            </div>

            {/* Camera Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-[#442D1D] text-white p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-md hover:bg-[#6c4e3e] transition hover:scale-105 sm:hover:scale-110 z-20 cursor-pointer"
              title="Change Photo"
              aria-label="Change profile photo"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Delete Button */}
            {photoPreview && (
              <button
                type="button"
                onClick={handleDeletePhoto}
                className="absolute bottom-0 -left-1 sm:-left-2 bg-red-500 text-white p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-md hover:bg-red-600 transition hover:scale-105 sm:hover:scale-110 z-20 cursor-pointer"
                title="Remove Photo"
                aria-label="Remove profile photo"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#442D1D]">
            Edit Profile
          </h1>
          <p className="text-[#442D1D]/60 mt-1 text-xs sm:text-sm md:text-base">
            Update your personal information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Name Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition text-sm sm:text-base"
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition text-sm sm:text-base"
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Username Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 text-[#442D1D]/40 text-sm sm:text-base">
                @
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-lg sm:rounded-xl pl-7 sm:pl-9 pr-3 sm:pr-4 py-2.5 sm:py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition text-sm sm:text-base"
                placeholder="username"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition text-sm sm:text-base"
              placeholder="email@example.com"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="text-[#442D1D]/70 font-semibold text-sm hover:text-[#442D1D] px-4 py-2 cursor-pointer w-full sm:w-auto text-center sm:text-left"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#442D1D] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm shadow-lg hover:bg-[#2c1d13] hover:shadow-xl transform hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Save className="w-3 h-3 sm:w-4 sm:h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
      
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isDeletePhotoModalOpen}
        onClose={() => setIsDeletePhotoModalOpen(false)}
        onConfirm={confirmDeletePhoto}
        title="Delete photo profile?"
        message="Your profile photo will be blank, continue?"
        confirmText="Delete Photo"
        cancelText="Cancel"
      />
    </div>
  );
}