import "./GameAlerts.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { uiActions } from "../../../../store/uiSlicer";
import { playAudio } from "../../../../utils/utils";
import { audioRef } from "../../../Static/AudioAndTitle/AudioAndTitle";

export default function GameAlerts() {
  const gameAlert = useSelector((state) => state.ui.gameAlert);
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  const result = useSelector((state) => state.game.game.result);
  const dispatch = useDispatch();

  const [alertContRef, animate] = useAnimate();
  const gameAlertTimeoutRef = useRef();

  useEffect(() => {
    if (gameAlert.message) {
      animate(
        alertContRef.current,
        { opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 1] },
        { transition: { duration: 0.3 } }
      );
      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);
      if (gameAlertTimeoutRef.current) clearTimeout(gameAlertTimeoutRef.current);
      gameAlertTimeoutRef.current = setTimeout(() => {
        dispatch(uiActions.setGameAlert({ type: gameAlert.type, message: null }));
      }, 2500);
    } else {
      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);
    }
  }, [gameAlert]);

  return (
    <div className="game-alerts-cont">
      <AnimatePresence>
        {gameAlert.message && (
          <motion.p
            ref={alertContRef}
            exit={{
              opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 0],
              transition: { duration: 0.3 },
            }}
            className={`game-alerts-text ${
              gameAlert.type === "success" || (result.state && isConnectedServer)
                ? "success"
                : "error"
            }`}
          >
            {gameAlert.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
