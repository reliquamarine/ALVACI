import React from "react";
import heroImage from "../assets/Rumah Fantasi 1.svg";
import About from "../components/about";
import Gallery from "../components/Gallery";

function HomePage() {
  return (
    <div className="bg-[#F4EFEB] min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 flex justify-between items-center px-10 py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        <div className="text-5xl font-extrabold text-[#442D1D] font-montserrat px-8">
          Artzy
        </div>

        <nav className="flex items-center font-medium text-[#442D1D] px-8 text-2xl font-montserrat">
          <a
            href="#gallery"
            className="hover:text-amber-700 transition duration-150 mr-8"
          >
            Gallery
          </a>
          <a
            href="#"
            className="hover:text-amber-700 transition duration-150 mr-8"
          >
            How It Works
          </a>
          <a
            href="#about"
            className="hover:text-amber-700 transition duration-150 mr-8"
          >
            About
          </a>

          <a
            href="#"
            className="font-semibold py-1.5 y border border-gray-500 rounded-4xl hover:bg-[#442D1D] hover:text-white transition duration-200 px-8"
          >
            Login
          </a>
        </nav>
      </header>

      <main className="flex items-center justify-center flex-grow py-15 px-9 max-w-7xl mx-auto w-full ml-25">
        <div className="w-4/5 pr-10 ">
          <img
            src={heroImage}
            alt="Lukisan pemandangan sungai"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        <div className="w-1/2 pl-10">
          <h1 className="text-5xl font-bold leading-snug text-[#442D1D] font-montserrat text-center">
            The Modern Way to Experience Art
          </h1>

          <button className="mt-8 px-10 py-4 bg-[#442D1D] text-[#E8D1A7] font-medium rounded-4xl shadow-lg hover:bg-[#886757] transition duration-200 flex items-center font-montserrat ml-22 text-2xl">
            Explore More
            <span className="ml-3 text-2xl">→</span>
          </button>
        </div>
      </main>

      <About />
      <Gallery />
    </div>
  );
}

export default HomePage;
