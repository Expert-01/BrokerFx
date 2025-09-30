import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar.jsx";
import { Link } from "react-router-dom";
import Button from "@/components/UI/Button.jsx";
import axios from "axios";
import registerBg from "@/assets/login-bg.png";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Signup() {
  // Animate On Scroll (AOS) initialization
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Confirm password validation
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );
      setMessage(res.data.message || "Signup successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar data-aos="fade-down" />
      <div
        className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-[#0A0F1F] to-black overflow-hidden"
        data-aos="fade-up"
      >
        <img
          src={registerBg}
          alt="Register Background"
          className="absolute inset-0 w-full h-full object-cover z-0 blur-xl"
          style={{ objectPosition: "center", objectFit: "cover" }}
        />
        <div
          className="flex flex-col-reverse md:flex-row w-full max-w-6xl mx-auto items-center justify-between gap-8 relative z-10 mt-[90px]"
          data-aos="zoom-in"
        >
          <div
            className="flex-1 flex flex-col justify-center items-start pl-4 md:pl-12 w-full"
            data-aos="fade-right"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-[#d4af37] mb-4 md:mb-6 leading-tight">
              Create your account
              <br />
              <span className="font-normal text-white">
                and start trading in less than a minute
              </span>
            </h2>
            <p className="text-xs text-gray-300 mt-6 md:mt-8 max-w-lg">
              Risk Warning : Trading FX instruments and CFDs can incur a high
              level of risk and may result in a loss of all your invested
              Capital.{" "}
              <b className="text-[#d4af37]">Restricted Countries:</b>{" "}
              NexaExchange LTD does not provide services for residents of
              certain countries, including Israel, New Zealand, Iran, and North
              Korea (Democratic Peoples's Republic of Korea), or any country
              where such distribution or use would be contrary of local law or
              regulation. Please check with your local jurisdiction to determine
              if you are permitted to open an account with NexaExchange LTD.
            </p>
          </div>

          {/* Signup Form */}
          <div
            className="flex-1 flex items-center justify-center w-full"
            data-aos="fade-left"
          >
            <div
              className="w-full max-w-xs md:max-w-md bg-gradient-to-br from-black/40 via-[#100503]/80 to-black rounded-3xl shadow-2xl p-6 md:p-10 backdrop-blur-md border border-[#d4af37]/30"
              data-aos="flip-up"
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#d4af37] text-center mb-6 md:mb-8">
                Sign Up
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-transparent text-[#d4af37] border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] placeholder-gray-400 text-base md:text-lg"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-transparent text-[#d4af37] border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] placeholder-gray-400 text-base md:text-lg"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-transparent text-[#d4af37] border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] placeholder-gray-400 text-base md:text-lg"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-transparent text-[#d4af37] border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] placeholder-gray-400 text-base md:text-lg"
                    required
                  />
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
    </>
  );
                  }                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-transparent text-[#d4af37] border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] placeholder-gray-400 text-base md:text-lg"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-transparent text-[#d4af37] border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] placeholder-gray-400 text-base md:text-lg"
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-transparent text-[#d4af37] border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] placeholder-gray-400 text-base md:text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#d4af37] hover:bg-[#bfa233] text-black font-semibold rounded-full py-2 md:py-3 text-base md:text-lg shadow-md transition-all"
                >
                  Sign Up
                </Button>
              </form>

              {/* 🔹 TEMP TEST BUTTON */}
              <button
                onClick={handleTestSignup}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full py-2 md:py-3 text-base md:text-lg shadow-md transition-all mt-4"
              >
                Test Signup
              </button>

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
    </>
  );
      }
