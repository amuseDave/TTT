import { useEffect, useRef } from "react";

import thirdNeon from "./assets/thirdNeon.mp3";
import fourthNeon from "./assets/thirdNeon.mp3";
import Game from "./components/Game";
import { getRandomItem } from "./utils";

export let audioRef = null;
export let audioTitleRef = null;

export default function App() {
  const ticRef = useRef();
  const tacRef = useRef();
  const toeRef = useRef();

  // Set Canvas Drawing With Whole Page effect
  useEffect(() => {
    const canvasEl = document.getElementById("canvas");
    const ctx = canvasEl.getContext("2d");

    function setCanvasSize() {
      canvasEl.width = window.innerWidth * 1.2;
      canvasEl.height = window.innerHeight * 1.2;
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }
    setCanvasSize();

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    function mouseMove(e) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function animate() {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      ctx.clearRect(0, 0, canvasEl.width * 1.2, canvasEl.height * 1.2);
      const gradient = ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        110
      );

      gradient.addColorStop(0, "rgb(255, 255, 255, 0.3)");
      gradient.addColorStop(1, "rgb(255, 255, 255, 0.0)");

      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = "lighter";

      ctx.beginPath();
      ctx.arc(currentX, currentY, 200, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    window.addEventListener("resize", setCanvasSize);
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Initiallize audio and set intervals to manipulate effects
  useEffect(() => {
    async function setAudio() {
      audioTitleRef = new Audio(thirdNeon);
      audioTitleRef.volume = 0.3;
      audioRef = new Audio(fourthNeon);

      window.removeEventListener("click", setAudio);
      window.removeEventListener("resize", setAudio);
    }
    window.addEventListener("resize", setAudio);
    window.addEventListener("click", setAudio);

    const opRs = [0.2, 0.5, 0.8, 1];

    function triggerNeonEffect() {
      if (audioTitleRef) {
        audioTitleRef.pause();
        audioTitleRef.currentTime = 0;
        audioTitleRef.play();
      }

      const opR1 = getRandomItem(opRs);
      const opR2 = getRandomItem(opRs);
      const opR3 = getRandomItem(opRs);
      ticRef.current.style.opacity = opR1;
      tacRef.current.style.opacity = opR2;
      toeRef.current.style.opacity = opR3;
    }
    triggerNeonEffect();

    let timeoutID;
    setInterval(() => {
      if (timeoutID) return;
      timeoutID = setTimeout(() => {
        triggerNeonEffect();
        timeoutID = null;
      }, Math.floor(Math.random() * 3000));
    }, 2000);
  }, []);
  return (
    <>
      <div className="letter letter-0">X</div>
      <div className="letter letter-1">O</div>
      <div className="letter letter-2">X</div>
      <div className="letter letter-3">O</div>
      <canvas id="canvas" />
      <h1 className="title">
        <span ref={ticRef}>Tic</span>
        <span ref={tacRef}>Tac</span>
        <span ref={toeRef}>Toe</span>
      </h1>
      <Game />
    </>
  );
}
