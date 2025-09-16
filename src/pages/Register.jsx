import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import logo from "@/assets/logo.png";
import registerBg from "@/assets/login-bg.png";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(""); 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your API to register the user
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      setMessage(res.data.message);  
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
    console.log("Signup form submitted:", form);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-[#0A0F1F] to-black overflow-hidden">
      {/* Sharp background image */}
      <img 
        src={registerBg} 
        alt="Register Background" 
        className="absolute inset-0 w-full h-full object-cover z-0 blur-xl" 
        style={{objectPosition: 'center', objectFit: 'cover'}} 
      />
      {/* Logo and EN */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center justify-between w-[200px] z-20">
        <img src={logo} alt="Logo" className="w-14 h-14" />
        <span className="text-[#d4af37] text-sm ml-4">EN</span>
      </div>
      {/* Responsive layout: mobile stacks, desktop splits */}
      <div className="flex flex-col-reverse md:flex-row w-full max-w-6xl mx-auto items-center justify-between gap-8 relative z-10">
        {/* Left: Info Section (mobile below, desktop left) */}
        <div className="flex-1 flex flex-col justify-center items-start pl-4 md:pl-12 w-full">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-[#d4af37] mb-4 md:mb-6 leading-tight">
            Create your account<br />
            <span className="font-normal text-white">and start trading in less than a minute</span>
          </h2>
          <p className="text-xs text-gray-300 mt-6 md:mt-8 max-w-lg">
            Risk Warning : Trading FX instruments and CFDs can incur a high level of risk and may result in a loss of all your invested Capital. <b className='text-[#d4af37]'>Restricted Countries:</b> GatesFX LTD does not provide services for residents of certain countries, including Israel, New Zealand, Iran, and North Korea (Democratic Peoples's Republic of Korea), or any country where such distribution or use would be contrary of local law or regulation. Please check with your local jurisdiction to determine if you are permitted to open an account with GatesFX LTD.
          </p>
        </div>
        {/* Right: Register Card (mobile above, desktop right) */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="w-full max-w-xs md:max-w-md bg-gradient-to-br from-black/40 via-[#100503]/80 to-black rounded-3xl shadow-2xl p-6 md:p-10 backdrop-blur-md border border-[#d4af37]">
            <h3 className="text-xl md:text-2xl font-bold text-[#d4af37] text-center mb-6 md:mb-8">Sign Up</h3>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-transparent text-[#d4af37] border border-[#d4af37] focus:outline-none focus:border-[#d4af37] placeholder-gray-400 text-base md:text-lg"
                />
              </div>
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
              <Button
                type="submit"
                className="w-full bg-[#d4af37] hover:bg-[#bfa233] text-black font-semibold rounded-full py-2 md:py-3 text-base md:text-lg shadow-md transition-all"
              >
                Sign Up
              </Button>
            </form>
            <p className="text-gray-400 text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#d4af37] hover:underline">
                Login
              </Link>
            </p>
            {message && (
              <p className="text-center text-[#d4af37] mt-2">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
