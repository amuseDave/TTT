import "./Menu.css";
import { useEffect } from "react";
import { audioTitleRef } from "../../App";
import { motion } from "framer-motion";
import Player1 from "./Player1";
import Player2 from "./Player2";
import ArrowUpDownComp from "./ArrowUpDownComp";

export default function Menu() {
  useEffect(() => {
    if (audioTitleRef) audioTitleRef.volume = 0.15;
    return () => {
      if (audioTitleRef) audioTitleRef.volume = 0.2;
    };
  }, []);

  return (
    <motion.div
      animate={{ opacity: [0, 1], transition: { delay: 0.1 } }}
      className={`menu-container`}
    >
      <motion.div
        animate={{ opacity: [1, 0, 1, 0, 1], transition: { duration: 0.5 } }}
        className="menu"
      >
        <motion.div className="player-menu">
          <Player1 />
          <ArrowUpDownComp />
          <Player2 />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
