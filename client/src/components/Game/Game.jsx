import "./Game.css";

import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import StartLobbyBtn from "./StartLobbyBtn/StartLobbyBtn";
import Menu from "./Menu/Menu";
import GameGrid from "./GameGrid/GameGrid";

export default function Game() {
  const lobby = useSelector((state) => state.game.lobby);
  console.log(lobby);

  return (
    <div className="game-container">
      <AnimatePresence mode="wait">
        {lobby === undefined && <StartLobbyBtn key="start-lobby-btn" />}
        {lobby === null && <Menu key="menu" />}
        {lobby && <GameGrid key="game-grid" />}
      </AnimatePresence>
    </div>
  );
}
