import { ArrowUpDown, LoaderCircle } from "lucide-react";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { audioRef } from "../../../Static/AudioAndTitle/AudioAndTitle";
import getWebSocket from "../../../../web-socket/ws";
import { uiActions } from "../../../../store/uiSlicer";
import { playAudio } from "../../../../utils/utils";

export default function ArrowUpDownComp() {
  const isSwitchingMoves = useSelector((state) => state.ui.isSwitchingMoves);
  const isAdmin = useSelector((state) => state.game.isAdmin);

  const dispatch = useDispatch();

  const [elRef, animate] = useAnimate();
  const mouseOn = useRef();

  function onMouseLeave() {
    mouseOn.current = false;
    if (isSwitchingMoves) return;
    playAudio(audioRef);

    elRef.current.style.opacity = 0.35;
  }
  function onMouseEnter() {
    mouseOn.current = true;
    if (isSwitchingMoves) return;
    playAudio(audioRef, 0.6);
    elRef.current.style.opacity = 1;
  }

  function switchMoves() {
    if (isSwitchingMoves || !isAdmin) return;
    // Test out delay UI

    getWebSocket().send(JSON.stringify({ action: "switch-moves" }));

    dispatch(uiActions.isSwitchingMoves(true));
  }

  useEffect(() => {
    const animation = async () => {
      await animate(
        elRef.current,
        {
          opacity: [1, 0, 1, 0, 1, 0, 1],
        },
        { duration: 0.3 }
      );
      await animate(
        elRef.current,
        {
          opacity: mouseOn.current || isSwitchingMoves ? 1 : 0.35,
        },
        { duration: 0 }
      );
    };

    animation();

    playAudio(audioRef);
    setTimeout(() => {
      playAudio(audioRef, 0.6);
    }, 150);
  }, [isSwitchingMoves]);

  return (
    <motion.div layout className="svg-switch-container">
      <motion.div
        ref={elRef}
        onMouseEnter={isAdmin ? onMouseEnter : null}
        onMouseLeave={isAdmin ? onMouseLeave : null}
        className={`arrow-up-down ${isSwitchingMoves ? "spinner" : ""}`}
      >
        {!isSwitchingMoves ? (
          <>
            <ArrowUpDown
              style={{ cursor: isAdmin ? "inherit" : "not-allowed" }}
              onClick={switchMoves}
            />
            <ArrowUpDown />
          </>
        ) : (
          <>
            <LoaderCircle />
            <LoaderCircle />
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
