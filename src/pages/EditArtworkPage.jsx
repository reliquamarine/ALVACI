import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastSuccess, toastError } from '../components/ToastWithProgress';
import uploadIconPlaceholder from "../assets/ep_upload-filled.svg";

function EditArtworkPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    category: "",
    description: "",
    image: "",
  });

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
          setFormData({
            title: data.title || "",
            artist: data.artist || "",
            year: data.year ? data.year.split("T")[0] : "",
            category: data.category || "",
            description: data.description || "",
            image: data.image || "",
          });
          setImagePreview(data.image || null);
        } else {
          throw new Error(data.error || "Artwork not found!");
        }
      } catch (err) {
        toastError("Failed to load artwork data: " + err.message);
        navigate("/gallery-walls");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtwork();
  }, [id, navigate]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      const base64Image = await convertToBase64(file);
      setFormData((prev) => ({ ...prev, image: base64Image }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { image, title, artist } = formData;

    if (!image || !title || !artist) {
      toastError("Please ensure Image, Title, and Artist name are filled.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/artworks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update artwork");
      toastSuccess("Artwork updated successfully!");
      navigate("/gallery-walls");
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

  const inputFields = [
    {
      label: "Title",
      name: "title",
      val: formData.title,
      placeholder: "example: Girl with a Pearl Earring",
      type: "text",
    },
    {
      label: "Artist Name",
      name: "artist",
      val: formData.artist,
      placeholder: "example: by Johannes Vermeer",
      type: "text",
    },
    {
      label: "Year Created",
      name: "year",
      val: formData.year,
      placeholder: "",
      type: "date",
    },
    {
      label: "Category",
      name: "category",
      val: formData.category,
      placeholder: "painting, photography, digital art, etc",
      type: "text",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <main className="flex-grow w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 beranda-bg">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-4 sm:mt-5 md:mt-8 mb-8 sm:mb-12 md:mb-15 text-[#442D1D] px-2 sm:px-0">
          Edit Artwork: <span className="break-words">{formData.title}</span>
        </h1>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 h-auto lg:h-[500px] xl:h-[600px]">
          {/* Image Upload Section */}
          <div
            className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-full rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 border-[#442D1D] bg-[#C5B49A]/60 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative hover:bg-black/5 transition p-4"
            onClick={() => fileInputRef.current.click()}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain p-2 sm:p-3 md:p-4"
              />
            ) : (
              <>
                <img
                  src={uploadIconPlaceholder}
                  alt="Upload Icon"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 opacity-70 text-[#442D1D]"
                />
                <p className="text-base sm:text-lg md:text-xl font-semibold text-[#442D1D] text-center">
                  Click to Change Image
                </p>
                <p className="text-xs sm:text-sm text-[#442D1D]/70 mt-1 sm:mt-2 text-center">
                  Click to browse or drag and drop
                </p>
              </>
            )}
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSave}
            className="w-full lg:w-1/2 flex flex-col justify-between font-medium text-[#442D1D] gap-4 sm:gap-5 md:gap-6"
          >
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {inputFields.map((field, idx) => (
                <div key={idx} className={`flex flex-col gap-1 sm:gap-2 ${idx === 2 || idx === 3 ? 'md:col-span-1' : ''}`}>
                  <label className="text-sm sm:text-base md:text-lg font-bold">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={field.val}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full font-medium px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl outline-none placeholder-[#442D1D]/50 text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm sm:text-base"
                  />
                </div>
              ))}
            </div>

            {/* Description Field */}
            <div className="flex flex-col gap-1 sm:gap-2">
              <label className="text-sm sm:text-base md:text-lg font-bold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="optional"
                rows="3"
                className="w-full font-medium px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl outline-none resize-none text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4 sm:mt-5 md:mt-6">
              <button
                type="submit"
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full text-[#442D1D] font-medium text-base sm:text-lg hover:scale-105 transition bg-[#f4efeb] cursor-pointer w-full sm:w-auto text-center shadow-sm hover:shadow-md"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(`/artwork/${id}`)}
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full text-white font-medium text-base sm:text-lg hover:scale-105 transition bg-[#442D1D] cursor-pointer w-full sm:w-auto text-center shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditArtworkPage;