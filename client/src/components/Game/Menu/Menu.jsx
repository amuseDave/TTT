import "./Menu.css";
import { useEffect } from "react";
import { audioTitleRef } from "../../AudioAndTitle/AudioAndTitle";
import { LayoutGroup, motion } from "framer-motion";
import Player1 from "./Player1";
import Player2 from "./Player2";
import ArrowUpDownComp from "./ArrowUpDownComp";

export default function Menu() {
  useEffect(() => {
    if (audioTitleRef) audioTitleRef.volume = 0.05;
    let intervalID;
    intervalID = setInterval(() => {
      if (audioTitleRef) {
        audioTitleRef.volume = 0.05;
        clearInterval(intervalID);
        intervalID = null;
      }
    }, 1000);
    return () => {
      if (audioTitleRef) audioTitleRef.volume = 0.2;
    };
  }, []);

  return (
    <motion.div
      animate={{ opacity: [0, 1], transition: { delay: 0.1 } }}
      className={`menu-container`}
    >
      <LayoutGroup>
        <motion.div
          layout
          animate={{ opacity: [1, 0, 1, 0, 1], transition: { duration: 0.5 } }}
          className="menu"
        >
          <div className="player-menu">
            <Player1 />
            <ArrowUpDownComp />
            <Player2 />
          </div>
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
}
