import { ArrowUpDown, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";
import getWebSocket from "../../../../web-socket/ws";
import { uiActions } from "../../../../store/uiSlicer";
import { playAudio } from "../../../../utils/utils";

export default function ArrowUpDownComp() {
  const isSwitchingMoves = useSelector((state) => state.ui.isSwitchingMoves);
  const isAdmin = useSelector((state) => state.game.isAdmin);

  const dispatch = useDispatch();

  const elRef = useRef();
  const timeoutIDRef = useRef();
  const mouseOn = useRef();

  function onMouseLeave() {
    mouseOn.current = false;
    if (timeoutIDRef.current) return;
    elRef.current.style.opacity = 0.35;
  }
  function onMouseEnter() {
    mouseOn.current = true;
    if (timeoutIDRef.current) return;
    elRef.current.style.opacity = 1;
  }

  function switchMoves() {
    if (isSwitchingMoves || !isAdmin) return;
    // Test out delay UI
    setTimeout(() => {
      getWebSocket().send(JSON.stringify({ action: "switch-moves" }));
    }, 1000);

    dispatch(uiActions.isSwitchingMoves(true));
  }

  useEffect(() => {
    timeoutIDRef.current = setTimeout(() => {
      timeoutIDRef.current = null;
    }, 300);

    playAudio(audioRef);
    setTimeout(() => {
      playAudio(audioRef, 0.6);
    }, 150);
  }, [isSwitchingMoves]);

  return (
    <motion.div layout className="svg-switch-container">
      {!isSwitchingMoves && (
        <motion.div
          ref={elRef}
          animate={{
            opacity: [1, 0, 1, 0, 1, 0, 1, 0.35, mouseOn.current ? 1 : 0.35],
            transition: { duration: 0.3 },
          }}
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
          animate={{
            opacity: [1, 0, 1, 0, 1, 0, 1],
            transition: { duration: 0.3 },
          }}
          className="arrow-up-down spinner"
        >
          <LoaderCircle />
          <LoaderCircle />
        </motion.div>
      )}
    </motion.div>
  );
}
