import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const canvasEl = document.getElementById("canvas");

    function setCanvasSize() {
      canvasEl.width = window.innerWidth * 1.2;
      canvasEl.height = window.innerHeight * 1.2;
    }

    setCanvasSize();
    const ctx = canvasEl.getContext("2d");

    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;

    function mouseMove(e) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function animate() {
      // Smoothly interpolate position (adjust 0.1 for slower or faster lag)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

      // Create a large radial gradient with ultra-soft transition
      const gradient = ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        150
      );

      gradient.addColorStop(0, "rgb(255, 220, 255, 0.6)"); // Strong center light
      gradient.addColorStop(0.1, "rgb(255, 220, 255, 0.5)"); // Softer mid-glow
      gradient.addColorStop(0.2, "rgb(255, 220, 255, 0.4)"); // Nearly faded
      gradient.addColorStop(0.3, "rgb(255, 220, 255, 0.3)"); // Nearly faded
      gradient.addColorStop(0.4, "rgb(255, 220, 255, 0.2)"); // Nearly faded
      gradient.addColorStop(0.5, "rgb(255, 220, 255, 0.1)"); // Nearly faded
      gradient.addColorStop(0.6, "rgb(255, 220, 255, 0.0)"); // Fully transparent
      gradient.addColorStop(0.7, "rgb(255, 220, 255, 0.0)"); // Fully transparent
      gradient.addColorStop(0.8, "rgb(255, 220, 255, 0.0)"); // Fully transparent
      gradient.addColorStop(0.9, "rgb(255, 220, 255, 0.0)"); // Fully transparent
      gradient.addColorStop(1, "rgb(255, 220, 255, 0.0)"); // Fully transparent
      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = "lighter";

      ctx.beginPath();
      ctx.arc(currentX, currentY, 200, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(animate); // Keep animating
    }

    requestAnimationFrame(animate); // Start animation loop

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
      <button> Start</button>
    </>
  );
}
