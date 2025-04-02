import { useEffect } from "react";
import "./GameGrid.css";

export default function GameGrid() {
  useEffect(() => {
    function handleLeaveGame() {}
    window.addEventListener("beforeunload", handleLeaveGame);
    return () => {
      window.removeEventListener("beforeunload", handleLeaveGame);
    };
  }, []);
  return <div className={``}>GameGrid</div>;
}
