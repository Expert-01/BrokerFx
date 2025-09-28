


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/UI/Button.jsx";
import axios from "axios";
// import logo from "@/assets/logo.png"; // Place your logo in src/assets/logo.png
import loginBg from "@/assets/login-bg.png"; // Place your background image in src/assets/login-bg.png
import Navbar from "@/components/Navbar.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Login() {
  // Animate On Scroll (AOS) initialization
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form);

      console.log("Login successful:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      // Redirect based on admin status
      if (res.data.user.is_admin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
    catch(err) {
      console.error(err.response?.data || err.message);
      
    }
        //console.log("Password:", {email, password});

  };


  return (
    <>
    <Navbar data-aos="fade-down" />
  <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#000]/40 via-[#0A0F1F]/80 to-black overflow-hidden " data-aos="fade-up">
        {/* Sharp background image */}
        <img 
          src={loginBg} 
          alt="Login Background" 
          className="absolute inset-0 w-full h-full object-cover z-0 blur-lg" 
          style={{objectPosition: 'center', objectFit: 'cover'}} 
        />
        {/* Main split layout */}
  <div className="flex flex-col-reverse md:flex-row w-full max-w-6xl mx-auto items-center justify-between gap-8 relative z-10 md:mt-20 mt-[50%]" data-aos="zoom-in">
          {/* Left: Register Section (mobile below, desktop left) */}
          <div className="flex-1 flex flex-col justify-center items-start pl-4 md:pl-12 w-full" data-aos="fade-right">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-[#d4af37] mb-4 md:mb-6 leading-tight">
              Not registered yet?<br />
              <span className="font-normal text-white">It takes less than a minute</span>
            </h2>
            <Link to="/register" className="block w-full">
              <button className="mt-2 px-6 md:px-12 py-3 md:py-4 border-2 border-[#d4af37]/30 rounded-full text-[#d4af37] text-base md:text-lg font-semibold hover:bg-[#d4af37] hover:text-black transition-all w-full md:w-auto">
                REGISTER NOW
              </button>
            </Link>
            <p className="text-xs text-gray-300 mt-6 md:mt-8 max-w-lg">
              Risk Warning : Trading FX instruments and CFDs can incur a high level of risk and may result in a loss of all your invested Capital. <b className='text-[#d4af37]'>Restricted Countries:</b> NexaExchange LTD does not provide services for residents of certain countries, including Israel, New Zealand, Iran, and North Korea (Democratic Peoples's Republic of Korea), or any country where such distribution or use would be contrary of local law or regulation. Please check with your local jurisdiction to determine if you are permitted to open an account with NexaExchange LTD.
            </p>
          </div>
          {/* Right: Login Card (mobile above, desktop right) */}
          <div className="flex-1 flex items-center justify-center w-full" data-aos="fade-left">
            <div className="w-full max-w-xs md:max-w-md bg-gradient-to-br from-black via-[#100503]/40 to-black rounded-3xl shadow-2xl p-6 md:p-10 backdrop-blur-md border border-[#d4af37]/30" data-aos="flip-up">
              <h3 className="text-xl md:text-2xl font-bold text-[#d4af37] text-center mb-6 md:mb-8">Login</h3>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-transparent text-[#d4af37] border border-[#d4af37] focus:outline-none focus:border-[#d4af37] placeholder-gray-400 text-base md:text-lg"
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-transparent text-[#d4af37] border border-[#d4af37] focus:outline-none focus:border-[#d4af37] placeholder-gray-400 text-base md:text-lg"
                  />
                  {/* Eye icon for show/hide password can be added here */}
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <label className="flex items-center text-gray-300">
                    <input type="checkbox" className="mr-2" /> Remember me
                  </label>
                  <Link to="/forgot-password" className="text-[#d4af37] hover:underline">Forgot Password</Link>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#d4af37] hover:bg-[#bfa233] text-black font-semibold rounded-full py-2 md:py-3 text-base md:text-lg shadow-md transition-all"
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
        {/* Decorative blue ring background */}
        <div className="absolute left-0 bottom-0 w-full h-full z-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="900" cy="600" rx="600" ry="120" fill="url(#goldRing)" opacity="0.5" />
            <defs>
              <radialGradient id="goldRing" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(600 0 0 120 300 480)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d4af37" />
                <stop offset="1" stopColor="#0A0F1F" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      </>
    );
  }
