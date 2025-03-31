import { useEffect } from "react";

import Game from "./components/Game";
import AudioAndTitle from "./components/AudioAndTitle";

export default function App() {
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

  return (
    <>
      <div className="letter letter-0">X</div>
      <div className="letter letter-1">O</div>
      <div className="letter letter-2">X</div>
      <div className="letter letter-3">O</div>
      <canvas id="canvas" />
      <AudioAndTitle />
      <Game />
    </>
  );
}
