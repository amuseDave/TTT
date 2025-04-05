import { useEffect } from "react";
import "./GameGrid.css";
import { motion } from "framer-motion";
import InitialConnection from "./InitialConnection";
import { playAudio } from "../../../utils/utils";
import { audioRef } from "../../Static/AudioAndTitle/AudioAndTitle";
import Grid from "./Grid/Grid";

export default function GameGrid() {
  useEffect(() => {
    function handleLeaveGame() {}
    window.addEventListener("beforeunload", handleLeaveGame);
    playAudio(audioRef);
    setTimeout(() => {
      playAudio(audioRef, 0.6);
    }, 300);
    return () => {
      window.removeEventListener("beforeunload", handleLeaveGame);
    };
  }, []);

  return (
    <motion.div
      animate={{ opacity: [0, 1], transition: { delay: 0.1 } }}
      className="game-grid"
    >
      <InitialConnection />
      <Grid />
    </motion.div>
  );
}
