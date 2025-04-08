import "./CanvasLight.css";
import { useEffect, useRef } from "react";

export default function CanvasLight() {
  const canvasRef = useRef();

  // Set Canvas Drawing With Whole Page effect
  useEffect(() => {
    const canvasEl = canvasRef.current;
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

    ctx.filter = "blur(48px)";
    function animate() {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      ctx.clearRect(0, 0, canvasEl.width * 1.2, canvasEl.height * 1.2);

      ctx.fillStyle = "white";

      ctx.beginPath();
      ctx.arc(currentX, currentY, 30, 0, Math.PI * 2);
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

  return <canvas id="canvas" ref={canvasRef} />;
}
