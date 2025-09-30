import React from "react";  
import AOS from "aos";  
import "aos/dist/aos.css";  
import Button from "@/components/UI/Button.jsx";  
import { Link } from "react-router-dom";  

export default function Hero() {  
  React.useEffect(() => {  
    AOS.init({ duration: 1000, once: true });  
  }, []);  

  return (  
    <>  
      {/* Hero Section with Subtle Gradient Background */}  
      <section  
        className="relative flex flex-col items-center justify-center min-h-[600px] md:min-h-[800px] w-full overflow-hidden text-center pt-20 px-4 bg-gradient-to-b from-[#2a1b0a] via-[#3b2a15] to-black"  
        data-aos="fade-up"  
      >  
        {/* Headline & Subtitle */}  
        <div  
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl mx-auto mt-20"  
          data-aos="zoom-in"  
        >  
          <h1  
            className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_0_10px_rgba(212,175,55,0.7)] font-azonix"  
            data-aos="bounce"  
          >  
            Accelerate Your Investments With AI  
          </h1>  
          <p  
            className="text-xl md:text-xl text-gray-300 mb-8 font-azonix"  
            data-aos="fade-up"  
          >  
            AI-driven asset management & insights. Empower your portfolio, make  
            smarter trades, and maximize ROI effortlessly.  
          </p>  

          <div  
            className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8"  
            data-aos="flip-up"  
          >  
            <Link to="/register">  
              <Button className="bg-[#d4af37] text-black rounded-full px-8 py-4 font-bold shadow-lg hover:scale-105 transition-transform glass-radial-btn">  
                Get started for free  
              </Button>  
            </Link>  
            <Button  
              variant="outline"  
              className="hidden md:block border-[#d4af37] text-[#d4af37] rounded-full px-8 py-4 border font-bold hover:bg-[#d4af37]/10 transition-colors"  
            >  
              Learn More  
            </Button>  
          </div>  
        </div>  

        {/* Trusted by logos row (optional) */}  
        <div  
          className="relative z-10 flex flex-row flex-wrap justify-center items-center gap-6 mt-2 opacity-80"  
          data-aos="fade-left"  
        >  
          <span className="text-xs text-gray-400 mr-2">  
            Trusted by 200+ investors  
          </span>  
          <img src="/assets/logo.png" alt="Logo" className="h-6 opacity-60" />  
        </div>  
      </section>  
    </>  
  );  
}
