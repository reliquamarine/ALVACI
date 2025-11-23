import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ArrowLeft, Save, User, Trash2 } from "lucide-react"; 

export default function EditProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    const storedAccountJson = localStorage.getItem("artzy_account");
    if (storedAccountJson) {
      try {
        const account = JSON.parse(storedAccountJson);

        let initialFirstName = account.firstName || "";
        let initialLastName = account.lastName || "";

        if (!initialFirstName && account.username) {
          const parts = account.username.split(" ");
          initialFirstName = parts[0];
          initialLastName = parts.slice(1).join(" ");
        }

        if (account.profilePic) {
          setPhotoPreview(account.profilePic);
        }

        setFormData({
          firstName: initialFirstName,
          lastName: initialLastName,
          username: account.username || "",
          email: account.email || "",
          profilePic: account.profilePic || "",
        });
      } catch (error) {
        console.error("Failed to load data", error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size is too large! Max 2MB..");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove your profile photo?"
    );

    if (isConfirmed) {
      setPhotoPreview(null); 
      setFormData((prev) => ({ ...prev, profilePic: "" }));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const oldDataString = localStorage.getItem("artzy_account");
    let oldData = oldDataString ? JSON.parse(oldDataString) : {};

    const updatedAccount = {
      ...oldData,
      ...formData,
      profilePic: formData.profilePic,
    };

    try {
      localStorage.setItem("artzy_account", JSON.stringify(updatedAccount));
      setTimeout(() => navigate("/profile"), 100);
    } catch (error) {
      alert("Failed to save. The photo might be too large.");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#442D1D]">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen gallery-gradient-bg font-montserrat relative overflow-hidden flex items-center justify-center py-12 px-4">
      <div className="absolute top-0 left-0 w-full h-64 rounded-b-[50px]"></div>

      <button
        onClick={() => navigate("/profile")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[#442D1D] hover:text-[#372517] transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Profile</span>
      </button>

      <div className="relative z-10 w-full max-w-2xl bg-white/20 backdrop-blur-md border border-white/30 rounded-[20px] shadow-2xl pt-20 pb-10 px-8 sm:px-12 mt-10">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#F4EFEB] flex items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-[#442D1D]/30" />
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-[#442D1D] text-white p-2.5 rounded-full shadow-md hover:bg-[#6c4e3e] transition hover:scale-110 z-20"
              title="Change Photo"
            >
              <Camera className="w-5 h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {photoPreview && (
              <button
                type="button"
                onClick={handleDeletePhoto}
                className="absolute bottom-0 -left-2 bg-red-500 text-white p-2.5 rounded-full shadow-md hover:bg-red-600 transition hover:scale-110 z-20"
                title="Remove Photo"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#442D1D]">Edit Profile</h1>
          <p className="text-[#442D1D]/60 mt-1 text-sm">
            Update your personal information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-xl px-4 py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-xl px-4 py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-[#442D1D]/40">
                @
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#442D1D]/60 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#F4EFEB]/50 border border-gray-200 rounded-xl px-4 py-3 text-[#442D1D] font-medium focus:outline-none focus:border-[#442D1D] focus:ring-1 focus:ring-[#442D1D] transition"
            />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="text-[#442D1D]/70 font-semibold text-sm hover:text-[#442D1D] px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#442D1D] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-[#2c1d13] hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
