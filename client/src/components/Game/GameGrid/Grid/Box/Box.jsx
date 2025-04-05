import { useAnimate } from "framer-motion";
import { gameActions } from "../../../../../store/gameSlicer";
import "./Box.css";
import { useDispatch, useSelector } from "react-redux";
import { playAudio } from "../../../../../utils/utils";
import { audioRef } from "../../../../Static/AudioAndTitle/AudioAndTitle";
import { useEffect } from "react";

export default function Box({ state, idx }) {
  const dispatch = useDispatch();

  const [moveElRef, animate] = useAnimate();

  const curMove = useSelector((state) => state.game.game.curMove);
  const player1Move = useSelector((state) => state.game.player1Move);

  function handleMove() {
    if (player1Move !== curMove) return;
    dispatch(gameActions.updateClientGame(idx));
  }

  const isMyMove = player1Move === state ? 1 : 0.4;
  useEffect(() => {
    animate(
      moveElRef.current,
      { opacity: [1, 0, 1, 0, 1, 0, isMyMove] },
      { duration: 0.3 }
    );
    playAudio(audioRef);
    setTimeout(() => {
      playAudio(audioRef, 0.6);
    }, 150);
  }, [state]);

  return (
    <div ref={moveElRef} onClick={handleMove} className="box">
      {state}
    </div>
  );
}
