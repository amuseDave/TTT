import { useEffect, useRef } from "react";
import { audioTitleRef } from "../../App";
import "./Menu.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Player1 from "./Player1";
import Player2 from "./Player2";

export default function Menu() {
  useEffect(() => {
    if (audioTitleRef) audioTitleRef.volume = 0.15;

    return () => {
      if (audioTitleRef) audioTitleRef.volume = 0.3;
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
        <Player1 />
        <Player2 />
      </motion.div>
    </motion.div>
  );
}
