import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Player2() {
  const player1Move = useSelector((state) => state.game.player1Move);
  const player2 = useSelector((state) => state.game.player2);
  return (
    <motion.div
      layout
      className="player-2"
      style={{ order: player1Move === "X" ? 2 : -1 }}
    >
      <p className="move">{player1Move === "X" ? "O" : "X"}</p>
      <p className={`${player2 ? "username" : "invite"}`}>
        {player2 ? player2 : "invite"}
      </p>
    </motion.div>
  );
}
