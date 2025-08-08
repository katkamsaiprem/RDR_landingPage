
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useState } from "react";

function App() {
  let [showContent,setShowContent]=useState(false);
  useGSAP(() => {
    const timeLine = gsap.timeline();
    

    timeLine
      .to(".vi-mask-group", {
        rotate: 10,
        ease: "Power4.easeInOut",
        transformOrigin: "50% 50%",
        duration: 2,
      })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "Expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity:0,// Fade out the text
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            // Remove the SVG after the animation completes
            document.querySelector(".svg").remove();
            setState(true);
            this.kill();
          }
        },
      });
  });

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
    </>
  );
}

export default App;
