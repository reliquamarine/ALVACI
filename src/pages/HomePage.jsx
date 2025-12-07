import React from "react";
import heroImage from "../assets/Rumah Fantasi 1.svg";
import About from "../components/about";
import Gallery from "../components/Gallery";
import HowItWorks from "../components/HowItWorks";
import GetStarted from "../components/GetStarted";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-[#F4EFEB] min-h-screen flex flex-col scroll-smooth">
      {/* Responsive Header */}
      <header className="sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#442D1D] font-montserrat mb-2 sm:mb-0 px-2 sm:px-4 md:px-8">
          Artzy
        </div>

        <nav className="flex flex-wrap items-center justify-center font-medium text-[#442D1D] text-base sm:text-lg md:text-xl font-montserrat gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
          <a
            href="#about"
            className="hover:text-amber-700 transition duration-150 px-2 py-1 sm:px-0 sm:py-0"
          >
            About
          </a>
          <a
            href="#gallery"
            className="hover:text-amber-700 transition duration-150 px-2 py-1 sm:px-0 sm:py-0"
          >
            Gallery
          </a>
          <a
            href="#howitworks"
            className="hover:text-amber-700 transition duration-150 px-2 py-1 sm:px-0 sm:py-0"
          >
            How It Works
          </a>
          <Link
            to="/login"
            className="font-semibold py-1.5 px-4 sm:px-6 md:px-8 border border-gray-500 rounded-3xl hover:bg-[#442D1D] hover:text-white transition duration-200 text-sm sm:text-base md:text-lg"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl w-full gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Hero Image - Order changes on mobile */}
          <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
            <img
              src={heroImage}
              alt="Lukisan pemandangan sungai"
              className="w-full max-w-lg lg:max-w-full h-auto object-cover rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg"
            />
          </div>

          {/* Hero Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-bold leading-tight sm:leading-snug text-[#442D1D] font-montserrat w-full max-w-2xl">
              The Modern Way to Experience Art
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#442D1D]/80 max-w-xl">
              Discover, collect, and share beautiful artworks in a digital gallery made for art lovers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8">
              <a
                href="#about"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[#442D1D] text-[#E8D1A7] font-medium rounded-full shadow-lg hover:bg-[#886757] transition duration-200 flex items-center justify-center font-montserrat text-base sm:text-lg md:text-xl w-full sm:w-auto"
              >
                Explore More
                <span className="ml-2 sm:ml-3 text-lg sm:text-xl md:text-2xl">→</span>
              </a>
              <Link
                to="/register"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-[#442D1D] text-[#442D1D] font-medium rounded-full shadow hover:bg-[#442D1D] hover:text-white transition duration-200 flex items-center justify-center font-montserrat text-base sm:text-lg md:text-xl w-full sm:w-auto"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Components Sections */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        <About />
        <Gallery />
        <HowItWorks />
        <GetStarted />
      </div>

      {/* Footer */}
      <footer className="bg-[#9D9167] py-4 text-center w-full mt-8 sm:mt-12 md:mt-16">
        <p className="text-white text-xs sm:text-sm font-medium font-montserrat tracking-wide px-4">
          © 2025 Artzy. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-white/80 text-xs sm:text-sm">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;