import { useEffect, useRef } from "react";
import "./menuAlerts.css";
import { useDispatch, useSelector } from "react-redux";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";
import { playAudio } from "../../../../utils/utils";
import { uiActions } from "../../../../store/uiSlicer";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { Info, TriangleAlert } from "lucide-react";

export default function MenuAlerts() {
  const menuAlert = useSelector((state) => state.ui.menuAlert);
  const dispatch = useDispatch();

  const firstRenderRef = useRef(true);
  const [alertContRef, animate] = useAnimate();
  const menuAlertTimeoutRef = useRef();

  useEffect(() => {
    if (menuAlert.message) {
      animate(
        alertContRef.current,
        { opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 1] },
        { transition: { duration: 0.3 } }
      );
      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);
      if (menuAlertTimeoutRef.current) clearTimeout(menuAlertTimeoutRef.current);
      menuAlertTimeoutRef.current = setTimeout(() => {
        dispatch(uiActions.setMenuAlert({ type: menuAlert.type, message: null }));
      }, 4500);
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
    <AnimatePresence>
      {menuAlert.message && (
        <motion.div
          ref={alertContRef}
          exit={{
            opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 0],
            transition: { duration: 0.3 },
          }}
          className={`menu-alerts ${menuAlert.type === "success" ? "success" : "error"}`}
        >
          <div className="menu-alerts-icons">
            {menuAlert.type === "error" && (
              <>
                <TriangleAlert />
                <TriangleAlert />
              </>
            )}
            {menuAlert.type === "success" && (
              <>
                <Info />
                <Info />
              </>
            )}
          </div>
          <p className="menu-alerts-text">{menuAlert.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
