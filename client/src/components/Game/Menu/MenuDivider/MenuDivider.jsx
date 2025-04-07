import { useSelector } from "react-redux";
import "./MenuDivider.css";
import { motion } from "framer-motion";

export default function MenuDivider() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  const isStartingSolo = useSelector((state) => state.ui.isStartingSolo);
  const player2 = useSelector((state) => state.game.player2);

  return (
    <motion.div
      className={`divider ${isConnectedServer || isStartingSolo ? "duo" : "solo"} ${
        (isConnectedServer || isStartingSolo) && player2 ? "extra-margin" : ""
      }`}
      layout
    ></motion.div>
  );
}
