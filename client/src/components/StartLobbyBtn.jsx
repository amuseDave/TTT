import { motion } from "framer-motion";
import { audioRef } from "../App";
import webSocket from "../ws";
import { useRef } from "react";
import { useSelector } from "react-redux";

export let startLobbyIntervalID = null;

export default function StartLobbyBtn({ className }) {
  const isConnecting = useSelector((state) => state.game.isConnecting);
  const elRef = useRef();
  const playBtnRef = useRef();

  function startLobbyServer() {
    if (isConnecting) return;
    if (elRef.current.style.opacity >= 0.2) return;

    webSocket.send(JSON.stringify({ action: "start-lobby" }));

    const titleEl = elRef.current;
    const playBtnEl = playBtnRef.current;

    playBtnEl.style.setProperty("--before-opacity", "1");
    playBtnEl.style.setProperty("color", "white");

    titleEl.style.opacity = titleEl.style.opacity > 0.2 ? 0.2 : 0.9;

    startLobbyIntervalID = setInterval(() => {
      const op = titleEl.style.opacity;
      titleEl.style.opacity = op > 0.2 ? 0.2 : 0.9;
    }, 500);
  }

  return (
    <motion.div
      ref={elRef}
      exit={{ opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 0], transition: { duration: 0.3 } }}
      className={`start-btn-container ${className}`}
      onMouseEnter={() => {
        if (audioRef) {
          audioRef.pause();
          audioRef.currentTime = 0;
          audioRef.play();
        }
      }}
      onMouseLeave={() => {
        if (audioRef) {
          audioRef.pause();
          audioRef.currentTime = 0.5;
          audioRef.play();
        }
      }}
    >
      <button ref={playBtnRef} onClick={startLobbyServer} className="start-btn">
        Play
      </button>

      {isConnecting && (
        <motion.p
          className="lobby-connecting"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [1, 0.2, 1],
            transition: { repeat: Infinity, duration: 1 },
          }}
        >
          Connecting....
        </motion.p>
      )}
    </motion.div>
  );
}
