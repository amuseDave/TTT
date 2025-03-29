import { motion } from "framer-motion";
import { audioRef } from "../App";
import webSocket from "../ws";

export default function StartLobbyBtn({ className }) {
  function startLobbyServer() {
    webSocket.send(JSON.stringify({ action: "start-lobby" }));
  }

  return (
    <motion.div
      exit={{ opacity: [1, 0] }}
      className={`start-btn-container ${className}`}
      onMouseEnter={() => {
        if (audioRef) {
          audioRef.pause();
          audioRef.currenTime = 0;
          audioRef.play();
        }
      }}
      onMouseLeave={() => {
        if (audioRef) {
          audioRef.pause();
          audioRef.currenTime = 0;
          audioRef.play();
        }
      }}
    >
      <button onClick={startLobbyServer} className="start-btn">
        Play
      </button>
    </motion.div>
  );
}
