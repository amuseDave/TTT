import { useEffect, useRef } from "react";
import firstNeon from "./assets/firstNeon.mp3";
import secondNeon from "./assets/secondNeon.mp3";
import thirdNeon from "./assets/thirdNeon.mp3";
import fourthNeon from "./assets/thirdNeon.mp3";
import Game from "./components/Game";

export let audioRef = null;

export default function App() {
  const ticRef = useRef();
  const tacRef = useRef();
  const toeRef = useRef();

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

  useEffect(() => {
    let audio;
    let audio1;
    let audio2;

    const audioArr = [];

    function setAudio() {
      audio = new Audio(firstNeon);
      audio1 = new Audio(secondNeon);
      audio2 = new Audio(thirdNeon);

      audioRef = new Audio(fourthNeon);

      audioArr.push(audio, audio1, audio2);

      audioArr.forEach((a) => {
        a.volume = 0.5;
      });

      window.removeEventListener("click", setAudio);
      window.removeEventListener("resize", setAudio);
    }
    window.addEventListener("resize", setAudio);
    window.addEventListener("click", setAudio);

    const opRs = [0.2, 0.5, 0.8, 1];
    let timeoutID;

    setInterval(() => {
      if (timeoutID) return;
      timeoutID = setTimeout(() => {
        if (audio) audioArr[Math.floor(Math.random() * audioArr.length)].play();

        const opR1 = opRs[Math.floor(Math.random() * opRs.length)];
        const opR2 = opRs[Math.floor(Math.random() * opRs.length)];
        const opR3 = opRs[Math.floor(Math.random() * opRs.length)];
        ticRef.current.style.opacity = opR1;
        tacRef.current.style.opacity = opR2;
        toeRef.current.style.opacity = opR3;
        timeoutID = null;
      }, Math.floor(Math.random() * 3000));
    }, 1000);
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
