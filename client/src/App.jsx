import { useEffect } from "react";
import Game from "./Game";

export default function App() {
  useEffect(() => {
    const canvasEl = document.getElementById("canvas");

    function setCanvasSize() {
      canvasEl.width = window.innerWidth * 2;
      canvasEl.height = window.innerHeight * 2;
    }

    setCanvasSize();
    const ctx = canvasEl.getContext("2d");

    function mouseMove(e) {
      setTimeout(() => {
        ctx.clearRect(0, 0, canvasEl.width * 2, canvasEl.height * 2);

        const gradient = ctx.createRadialGradient(
          e.clientX,
          e.clientY,
          0,
          e.clientX,
          e.clientY,
          150
        );

        gradient.addColorStop(0, "rgb(255, 255, 255, 0.3)"); // Strong center light
        gradient.addColorStop(0.1, "rgb(255, 255, 255, 0.25)"); // Softer mid-glow
        gradient.addColorStop(0.2, "rgb(255, 255, 255, 0.2)"); // Nearly faded
        gradient.addColorStop(0.3, "rgb(255, 255, 255, 0.15)"); // Nearly faded
        gradient.addColorStop(0.4, "rgb(255, 255, 255, 0.1)"); // Nearly faded
        gradient.addColorStop(0.5, "rgb(255, 255, 255, 0.05)"); // Nearly faded
        gradient.addColorStop(0.6, "rgb(255, 255, 255, 0.0)"); // Fully transparent
        gradient.addColorStop(0.7, "rgb(255, 255, 255, 0.0)"); // Fully transparent
        gradient.addColorStop(0.8, "rgb(255, 255, 255, 0.0)"); // Fully transparent
        gradient.addColorStop(0.9, "rgb(255, 255, 255, 0.0)"); // Fully transparent
        gradient.addColorStop(1, "rgb(255, 255, 255, 0.0)"); // Fully transparent
        ctx.fillStyle = gradient;
        ctx.globalCompositeOperation = "lighter";

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 200, 0, Math.PI * 2);
        ctx.fill();
      }, 80);
    }

    let timeoutID;
    function resize() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      if (timeoutID) clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        setCanvasSize();
      }, 100);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);
  return (
    <>
      <canvas id="canvas" />
      <h1 className="title">Tic Tac Toe</h1>
      <Game />
    </>
  );
}
