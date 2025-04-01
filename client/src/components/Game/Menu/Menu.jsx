import "./Menu.css";
import { useEffect } from "react";
import { audioTitleRef } from "../../AudioAndTitle/AudioAndTitle";
import { LayoutGroup, motion } from "framer-motion";
import PlayerMenu from "./PlayerMenu/PlayerMenu";
import { useSelector } from "react-redux";
import Connection from "./Connection/Connection";

export default function Menu() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
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
          <Connection />
          <PlayerMenu />
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
}
