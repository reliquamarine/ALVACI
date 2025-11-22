import React from 'react';

function LoginPage() {
  return (
    <div className="flex w-full min-h-screen bg-[#F5EEE9]">
      {/* Left login form */}
      <div className="w-1/2 flex flex-col justify-center items-start px-24 gap-6">
        <h1 className="text-4xl font-extrabold text-[#4A2E1E]">Welcome to Artzy</h1>
        <p className="text-xl font-medium text-[#4A2E1E]">Log into your account</p>

        <div className="w-full flex flex-col gap-4">
          <label className="text-[#4A2E1E] font-semibold">Email</label>
          <input
            type="email"
            className="w-full bg-[#D8CCC4] px-4 py-3 rounded-full outline-none"
            placeholder="input text"
          />

          <label className="text-[#4A2E1E] font-semibold">Password</label>
          <input
            type="password"
            className="w-full bg-[#D8CCC4] px-4 py-3 rounded-full outline-none"
            placeholder="input text"
          />

          <p className="text-sm text-[#4A2E1E] cursor-pointer">Forgot Password</p>

          <button className="bg-[#4A2E1E] text-white py-3 rounded-full font-bold text-lg shadow-md hover:scale-105 transition">
            Login
          </button>

          <a href="/register" className="text-sm text-[#4A2E1E]">
            Don't have an account? <span className="font-bold cursor-pointer">Create an account</span>
          </a>
        </div>
      </div>

      {/* Right image */}
      <div className="w-1/2 h-full">
        <img                                                                                                  
          src="/assets/Rumah Vantasi 1.svg"
          alt="Login Side Art"
          className="w-full h-full object-cover"                                                                                                                                                                                                                                                                                                                         
        />
      </div>
    </div>
  );
}

export default LoginPage;
