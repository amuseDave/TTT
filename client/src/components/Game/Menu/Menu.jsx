import "./Menu.css";
import { useEffect } from "react";
import { audioTitleRef } from "../../AudioAndTitle/AudioAndTitle";
import { LayoutGroup, motion } from "framer-motion";
import PlayerMenu from "./PlayerMenu/PlayerMenu";
import Connection from "./Connection/Connection";
import MenuOptions from "./MenuOptions/MenuOptions";
import MenuDivider from "./MenuDivider/MenuDivider";

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

  useEffect(() => {
    function handleLeaveGame() {}
    window.addEventListener("beforeunload", handleLeaveGame);
    return () => {
      window.removeEventListener("beforeunload", handleLeaveGame);
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
          <MenuDivider />
          <MenuOptions />
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
}
