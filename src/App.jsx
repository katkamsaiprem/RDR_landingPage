import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import "remixicon/fonts/remixicon.css";

// Import images as ES6 modules for Vite static assets
import backgroundImg from "/background.jpg";
import skyImg from "/imag.png"; // Note: sky.png doesn't exist, using imag.png
import charImg from "/char.png";
import ps5Img from "/ps5.png";
import miniCharImg from "/miniChar.png";

function App() {
  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    //after app func returns the jsx ,code inside useGsap runs right ,used for animations
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
        opacity: 0, // Fade out the text
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            // Remove the SVG after the animation completes
            document.querySelector(".svg").remove();
            setShowContent(true);
            this.kill();
          }
        },
      });
  });

  useGSAP(() => {
    if (!showContent) return; //runs only after content is shown

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: "Expo.easeInOut",
    });
    gsap.to(".sky", {
      scale: 1.4,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });
    gsap.to(".bg", {
      scale: 1.4,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });
    gsap.to(".charactor", {
      scale: 0.7,
      x: "-50%",
      rotate: 0,
      duration: 1.7,
      bottom: "-15%",
      delay: -0.8,
      ease: "Expro.easeInOut",
    });
    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });
    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", (e) => {
      console.log(e);
      const moveX = (e.clientX / window.innerWidth - 0.5) * 40; //paralllax effect,ref to plan.tldr

      gsap.to(".text", {
        x: `${moveX * 1}%`, //we convert decimal value to precentage,because to make it responsive ,movment will be relative to elements own width
      });
      gsap.to(".sky", {
        x: `${moveX * -1}%`,
      });
      // gsap.to(".charactor", {
      //   x: `${moveX}%`,
      // });
      gsap.to(".bg", {
        x: `${moveX * 1}%`,
      });
    });
  }, [showContent]); // This will run after the content is shown
  //if there is any dependencies,we need to pass it in array in second argment of useGSap

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
                  R
                </text>
              </g>
            </mask>
          </defs>
          <image
            href={backgroundImg}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen">
            <div className="navbar absolute w-full py-5 z-[10] ">
              <div className="logo flex gap-7 ml-5">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-12 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <div className="text-4xl -mt-[4px] leading-none text-white">
                  Rockstar
                </div>
              </div>
            </div>
            <div className="imagdiv relative overflow-hidden w-full h-screen bg-black">
              <img
                className="absolute scale-[1.5] sky rotate-[-20deg] sky top-0 left-0 w-full h-screen object-cover"
                src={skyImg}
                alt=""
              />
              <img
                className="absolute bg rotate-[-3deg] scale-[1.8] bg top-0 left-0 w-full h-screen object-cover"
                src={backgroundImg}
                alt="no img"
              />
              <div className="text  text-white flex flex-col gap-3 absolute top-2 left-1/2 scale-[1.4] rotate-[-10deg] -translate-x-1/2 ">
                <h1 className="text-[5rem] leading-none -ml-40">Red</h1>
                <h1 className="text-[5rem] leading-none -ml-30">Dead</h1>
                <h1 className="text-[5rem] leading-none -ml-40">
                  Redemptions 
                </h1>
              </div>
              <img
                className="absolute charactor -bottom-[150%] -translate-x-1/2 left-1/2 scale-[3] rotate-[-20deg]"
                src={charImg}
                alt=""
              />
              <div className="bottom text-white bg-gradient-to-t from-black to-transparent w-full px-3 py-7 absolute left-0 bottom-0 ">
                <div className="flex gap-4 items-center">
                  <i className="ri-arrow-down-line "></i>
                  <h3 className="font-[Helvetica_Now_Display] ">Scroll Down</h3>
                </div>
                <img
                  className="absolute h-[50px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src={ps5Img}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.7]"
                  src={miniCharImg}
                  alt=""
                />
              </div>
              <div className="right w-full flex flex-col items-center justify-center px-4">
                <h1 className="text-5xl mb-8 text-center">Red Dead Redemption</h1>
                <p className="mt-4 text-xl font-[Helvetica_Now_Display] text-center leading-relaxed max-w-3xl">
                  America, 1899. The end of the Wild West era has begun. After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.
                </p>
                <button
                  onClick={() => {
                    window.open("https://www.rockstargames.com/games/reddeadredemption2", "_blank");
                  }}
                  className="bg-red-900 px-6 py-3 mt-8 text-black cursor-pointer text-2xl transition-all duration-300 ease-in-out hover:bg-red-700 rounded-lg font-semibold"
                >
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
