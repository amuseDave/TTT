import { animate, motion } from "framer-motion";
import webSocket from "../ws";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { audioRef } from "./AudioAndTitle";

export default function StartLobbyBtn({ className }) {
  const isConnecting = useSelector((state) => state.ui.isConnecting);
  const isJoining = useSelector((state) => state.ui.isJoining);
  const elRef = useRef();
  const playBtnRef = useRef();

  function startLobbyServer() {
    if (isConnecting || isJoining) return;
    if (elRef.current.style.opacity >= 0.2) return;

    // Test out delay of starting the lobby
    setTimeout(() => {
      webSocket.send(JSON.stringify({ action: "start-lobby", data: null }));
    }, 1000);

    playBtnRef.current.style.setProperty("--before-opacity", "1");
    playBtnRef.current.style.setProperty("color", "white");

    animate(
      elRef.current,
      { opacity: [1, 0, 1, 0, 1, 0] },
      { duration: 2, repeat: Infinity }
    );
  }

  return (
    <motion.div
      ref={elRef}
      exit={{ opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 0], transition: { duration: 0.3 } }}
      className={`start-btn-container ${className}`}
      onMouseEnter={async () => {
        if (audioRef) {
          audioRef.pause();
          audioRef.currentTime = 0;
          audioRef.play();
        }
      }}
      onMouseLeave={async () => {
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
      {isJoining && (
        <motion.p
          className="lobby-connecting"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [1, 0.2, 1],
            transition: { repeat: Infinity, duration: 1 },
          }}
        >
          Joining Lobby...
        </motion.p>
      )}
    </motion.div>
  );
}
