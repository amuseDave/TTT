import { useEffect, useRef } from "react";
import "./menuAlerts.css";
import { useDispatch, useSelector } from "react-redux";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";
import { playAudio } from "../../../../utils/utils";
import { uiActions } from "../../../../store/uiSlicer";
import { AnimatePresence, motion } from "framer-motion";

export default function MenuAlerts() {
  const menuAlert = useSelector((state) => state.ui.menuAlert);
  const dispatch = useDispatch();

  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (menuAlert.message) {
      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);
      setTimeout(() => {
        dispatch(uiActions.setMenuAlert({ type: menuAlert.type, message: null }));
      }, 3500);
    } else {
      if (firstRenderRef.current) {
        firstRenderRef.current = false;
        return;
      }

      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);
    }
  }, [menuAlert]);

  return (
    <div className="menu-alerts-container">
      <AnimatePresence>
        {menuAlert.message && (
          <motion.div
            exit={{
              opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 0],
              transition: { duration: 0.3 },
            }}
            animate={{
              opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 1],
              transition: { duration: 0.3 },
            }}
            className={`menu-alerts ${
              menuAlert.type === "success" ? "success" : "error"
            }`}
          >
            <p>{menuAlert.message}</p>
            <p>{menuAlert.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
