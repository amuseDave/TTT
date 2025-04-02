import { animate, AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";
import { playAudio } from "../../../../utils/utils";
import { uiActions } from "../../../../store/uiSlicer";

export default function Player2() {
  const dispatch = useDispatch();

  const [initial, setInitial] = useState(true);

  const usernameRef = useRef();

  const firstRenderRef = useRef(true);

  const timeoutIDRef = useRef();
  const mouseOn = useRef();

  const player1Move = useSelector((state) => state.game.player1Move);
  const player2 = useSelector((state) => state.game.player2);
  const menuErrorUserLeft = useSelector((state) => state.ui.menuErrorUserLeft);

  function onMouseLeave() {
    mouseOn.current = false;
    if (timeoutIDRef.current) return;
    animate(usernameRef.current, { opacity: player2 ? 0.4 : 0.6 }, { duration: 0.2 });
  }
  function onMouseEnter() {
    mouseOn.current = true;
    if (timeoutIDRef.current) return;
    animate(usernameRef.current, { opacity: 1 }, { duration: 0.2 });
  }

  useEffect(() => {
    if (initial) setInitial(false);
    else {
      if (menuErrorUserLeft) return;

      timeoutIDRef.current = setTimeout(() => {
        timeoutIDRef.current = null;
      }, 400);

      animate(
        usernameRef.current,
        {
          opacity: [1, 0, 1, 0, 1, 0, 1, 0.3, mouseOn.current ? 1 : player2 ? 0.4 : 0.6],
        },
        { duration: 0.4 }
      );

      playAudio(audioRef);
    }
  }, [player2]);

  useEffect(() => {
    if (menuErrorUserLeft) {
      playAudio(audioRef, 0.6);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 100);
      setTimeout(() => {
        dispatch(uiActions.setMenuUserLeftError(null));
      }, 3500);
    } else {
      if (firstRenderRef.current) {
        firstRenderRef.current = false;
        return;
      }

      playAudio(audioRef, 0.6);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 100);
    }
  }, [menuErrorUserLeft]);

  return (
    <motion.div
      layout
      className="player-2"
      style={{ order: player1Move === "X" ? 2 : -1 }}
    >
      <p className="move">{player1Move === "X" ? "O" : "X"}</p>

      <motion.div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={usernameRef}
        className={`${player2 ? "username" : "invite"} user`}
      >
        <p>{player2 ? player2 : "invite"}</p>
        {player2 && <p>{player2}</p>}
      </motion.div>

      <AnimatePresence>
        {menuErrorUserLeft && (
          <motion.div
            exit={{
              opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 0],
              transition: { duration: 0.3 },
            }}
            animate={{
              opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 1],
              transition: { duration: 0.3 },
            }}
            className="user-left-error"
          >
            <p>{menuErrorUserLeft}</p>
            <p>{menuErrorUserLeft}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
