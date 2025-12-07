import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadIconPlaceholder from "../assets/ep_upload-filled.svg"; 

function AddArtwork() {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!imageFile || !title || !artist) {
      alert("Please upload an image and fill in Title and Artist name.");
      return;
    }

    try {
      const base64Image = await convertToBase64(imageFile);
      const newArtwork = {
        id: Date.now(),
        image: base64Image,
        title,
        artist,
        year,
        category,
        description,
      };

      const existingData = localStorage.getItem("artzy_gallery");
      let gallery = existingData ? JSON.parse(existingData) : [];
      gallery.push(newArtwork);
      localStorage.setItem("artzy_gallery", JSON.stringify(gallery));

      alert("Artwork Saved Successfully!");
      navigate("/gallery-walls");
    } catch (error) {
      console.error("Error saving artwork:", error);
      alert("Failed to save artwork.");
    }
  };

  const inputFields = [
    {
      label: "Title",
      val: title,
      set: setTitle,
      placeholder: "example: Girl with a Pearl Earring",
      type: "text",
    },
    {
      label: "Artist Name",
      val: artist,
      set: setArtist,
      placeholder: "example: by Johannes Vermeer",
      type: "text",
    },
    {
      label: "Year Created", 
      val: year,
      set: setYear,
      placeholder: "",
      type: "date", 
    },
    {
      label: "Category",
      val: category,
      set: setCategory,
      placeholder: "painting, photography, digital art, etc",
      type: "text",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      {/* Responsive Header */}
      <header className="sticky top-0 z-10 flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-4 md:py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        <div className="text-2xl md:text-4xl font-extrabold text-[#442D1D] font-montserrat mb-2 md:mb-0">
          Artzy
        </div>

        <nav className="flex flex-wrap items-center justify-center font-medium text-[#442D1D] text-base md:text-xl font-montserrat gap-2 md:gap-4 lg:gap-8">
          <Link to="/beranda" className="hover:text-amber-700 transition duration-150 px-2 py-1 md:px-0 md:py-0">Home</Link>
          <Link to="/gallery-walls" className="hover:text-amber-700 transition duration-150 px-2 py-1 md:px-0 md:py-0">Gallery Walls</Link>
          <Link to="/add-artwork" className="hover:text-amber-700 transition duration-150 px-2 py-1 md:px-0 md:py-0">Add Artwork</Link>
          <Link to="/profile" className="font-semibold py-1.5 px-4 md:px-8 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200 text-sm md:text-base">
            Profile
          </Link>
        </nav>
      </header>

      <main className="flex-grow w-full px-4 md:px-8 lg:px-16 py-4 md:py-8 beranda-bg">
        {/* Responsive Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-6 md:mt-10 mb-8 md:mb-12 lg:mb-15 text-[#442D1D]">
          Add to Your Collection
        </h1>

        {/* Responsive Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 min-h-[500px]">
          {/* Image Upload Section */}
          <div
            className="w-full lg:w-1/2 h-64 md:h-80 lg:h-full rounded-2xl lg:rounded-3xl border-2 border-[#442D1D] bg-[#C5B49A]/60 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative hover:bg-black/5 transition p-4"
            onClick={() => fileInputRef.current.click()}
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
                className="w-full h-full object-contain p-2 md:p-4"
              />
            ) : (
              <>
                <img
                  src={uploadIconPlaceholder}
                  alt="Upload Icon"
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-3 md:mb-4 opacity-70 text-[#442D1D]"
                />
                <p className="text-base md:text-lg lg:text-xl font-semibold text-[#442D1D] text-center px-2">
                  Drag and Drop Image Files to Upload
                </p>
                <p className="text-sm text-[#442D1D]/70 mt-2 text-center">
                  Click to browse files
                </p>
              </>
            )}
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSave}
            className="w-full lg:w-1/2 flex flex-col justify-between font-medium text-[#442D1D] gap-4 md:gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {inputFields.map((field, idx) => (
                <div key={idx} className={`flex flex-col gap-2 ${idx === 2 || idx === 3 ? 'md:col-span-1' : ''}`}>
                  <label className="text-base md:text-lg font-bold">{field.label}</label>
                  <input
                    type={field.type}
                    value={field.val}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full font-medium px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl outline-none placeholder-[#442D1D]/50 text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm md:text-base"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base md:text-lg font-bold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="optional"
                rows="3"
                className="w-full font-medium px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl outline-none resize-none text-[#442D1D] transition-all duration-200 backdrop-blur-XL bg-[#442D1D]/15 border border-white/20 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm md:text-base"
              />
            </div>

            {/* Responsive Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4 md:mt-6">
              <button
                type="submit"
                className="px-6 md:px-10 py-2 md:py-3 rounded-full text-white font-medium text-base md:text-lg hover:scale-105 transition bg-[#442D1D] w-full sm:w-auto text-center"
              >
                Save Artwork
              </button>
              <button
                type="button"
                onClick={() => navigate("/gallery-walls")}
                className="px-6 md:px-10 py-2 md:py-3 rounded-full text-white font-medium text-base md:text-lg hover:scale-105 transition bg-[#442D1D] w-full sm:w-auto text-center"
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

export default AddArtwork;