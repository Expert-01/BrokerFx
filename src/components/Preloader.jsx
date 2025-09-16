import React from "react";
import "./Preloader.css";

export default function Preloader() {
  return (
    <div className="preloader-bg">
      <div className="preloader-orb">
        <div className="preloader-glow"></div>
        <div className="preloader-dot"></div>
      </div>
      <div className="preloader-text">Digital Assets Invest</div>
    </div>
  );
}
