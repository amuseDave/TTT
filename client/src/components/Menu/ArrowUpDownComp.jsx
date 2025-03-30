import { ArrowUpDown } from "lucide-react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { gameActions } from "../../gameSlicer";
import { animate } from "framer-motion";
import { audioRef } from "../../App";

export default function ArrowUpDownComp() {
  const dispatch = useDispatch();

  const iconRef = useRef();

  function onMouseLeave() {
    animate(iconRef.current, { opacity: 0.3 }, { duration: 0.2 });
  }
  function onMouseEnter() {
    animate(iconRef.current, { opacity: 1 }, { duration: 0.2 });
  }

  function switchMoves() {
    dispatch(gameActions.changePlayerMoves());
    animate(iconRef.current, { opacity: [1, 0, 1, 0, 1, 0, 1] }, { duration: 0.2 });
    audioRef.pause();
    audioRef.currentTime = 0;
    audioRef.play();
  }

  return (
    <div ref={iconRef} className="arrow-up-down" style={{ opacity: 0.3 }}>
      <ArrowUpDown
        onClick={switchMoves}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <ArrowUpDown />
    </div>
  );
}
