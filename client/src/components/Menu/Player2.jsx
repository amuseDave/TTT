import { animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { audioRef } from "../AudioAndTitle";

export default function Player2() {
  const [initial, setInitial] = useState(true);
  const usernameRef = useRef();
  const player1Move = useSelector((state) => state.game.player1Move);
  const player2 = useSelector((state) => state.game.player2);

  useEffect(() => {
    if (initial) setInitial(false);
    else {
      animate(
        usernameRef.current,
        { opacity: [0.3, 1, 0.3, 1, 0.3, 1, 0.3, 1, 0.3] },
        { duration: 0.4 }
      );
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
        audioRef.play();
      }
    }
  }, [player2]);

  return (
    <motion.div
      layout
      className="player-2"
      style={{ order: player1Move === "X" ? 2 : -1 }}
    >
      <p className="move">{player1Move === "X" ? "O" : "X"}</p>

      <div ref={usernameRef} className={`${player2 ? "username" : "invite"} user`}>
        <p>{player2 ? player2 : "invite"}</p>
        {player2 && <p>{player2}</p>}
      </div>
    </motion.div>
  );
}
