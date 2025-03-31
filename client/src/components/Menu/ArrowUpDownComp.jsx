import { ArrowUpDown, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animate } from "framer-motion";
import { audioRef } from "../AudioAndTitle";
import webSocket from "../../ws";
import { uiActions } from "../../uiSlicer";

export default function ArrowUpDownComp() {
  const isSwitchingMoves = useSelector((state) => state.ui.isSwitchingMoves);
  const isAdmin = useSelector((state) => state.game.isAdmin);
  const player1Move = useSelector((state) => state.game.player1Move);

  const dispatch = useDispatch();

  const iconRef = useRef();
  const timeoutIDRef = useRef();
  const mouseOn = useRef();

  function onMouseLeave() {
    mouseOn.current = false;
    if (timeoutIDRef.current) return;
    animate(iconRef.current, { opacity: 0.3 }, { duration: 0.2 });
  }
  function onMouseEnter() {
    mouseOn.current = true;
    if (timeoutIDRef.current) return;
    animate(iconRef.current, { opacity: 1 }, { duration: 0.2 });
  }

  function switchMoves() {
    if (isSwitchingMoves || !isAdmin) return;
    setTimeout(() => {
      webSocket.send(JSON.stringify({ action: "switch-moves" }));
    }, 1000);

    dispatch(uiActions.isSwitchingMoves(true));
  }

  useEffect(() => {
    if (!isSwitchingMoves) return;
    timeoutIDRef.current = setTimeout(() => {
      timeoutIDRef.current = null;
    }, 400);

    animate(
      iconRef.current,
      { opacity: [1, 0, 1, 0, 1, 0, 1, 0.3, mouseOn.current ? 1 : 0.3] },
      { duration: 0.4 }
    );
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
      audioRef.play();
    }
  }, [isSwitchingMoves]);

  useEffect(() => {
    timeoutIDRef.current = setTimeout(() => {
      timeoutIDRef.current = null;
    }, 400);

    animate(
      iconRef.current,
      { opacity: [1, 0, 1, 0, 1, 0, 1, 0.3, mouseOn.current ? 1 : 0.3] },
      { duration: 0.4 }
    );
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
      audioRef.play();
    }
  }, [player1Move]);

  return (
    <motion.div ref={iconRef} className="svg-switch-container">
      {!isSwitchingMoves && (
        <motion.div
          onMouseEnter={isAdmin ? onMouseEnter : null}
          onMouseLeave={isAdmin ? onMouseLeave : null}
          className="arrow-up-down"
        >
          <ArrowUpDown
            style={{ cursor: isAdmin ? "inherit" : "not-allowed" }}
            onClick={switchMoves}
          />
          <ArrowUpDown />
        </motion.div>
      )}
      {isSwitchingMoves && (
        <motion.div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          animate={{ rotateZ: [0, 360], transition: { duration: 1, repeat: Infinity } }}
          className="arrow-up-down"
        >
          <LoaderCircle />
          <LoaderCircle />
        </motion.div>
      )}
    </motion.div>
  );
}
