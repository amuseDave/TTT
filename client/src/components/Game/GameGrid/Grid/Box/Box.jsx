import { useAnimate } from "framer-motion";
import { gameActions } from "../../../../../store/gameSlicer";
import "./Box.css";
import { useDispatch, useSelector } from "react-redux";
import { playAudio } from "../../../../../utils/utils";
import { audioRef } from "../../../../Static/AudioAndTitle/AudioAndTitle";
import { useEffect } from "react";
import getWebSocket from "../../../../../web-socket/ws";
import { uiActions } from "../../../../../store/uiSlicer";

export default function Box({ state, idx }) {
  const dispatch = useDispatch();

  const [moveElRef, animate] = useAnimate();

  const curMove = useSelector((state) => state.game.game.curMove);
  const timeLimit = useSelector((state) => state.game.game.timeLimit);
  const player1Move = useSelector((state) => state.game.player1Move);
  const result = useSelector((state) => state.game.result);
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  function handleMove() {
    if (player1Move !== curMove || state || !timeLimit || result) return;
    dispatch(gameActions.updateClientGame(idx));

    if (isConnectedServer) {
      dispatch(uiActions.isWaitingRes(true));
      getWebSocket().send(JSON.stringify({ action: "update-game", data: { idx } }));
    }
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
