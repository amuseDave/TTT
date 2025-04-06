import { useEffect, useRef } from "react";
import "./TurnDisplay.css";
import { useDispatch, useSelector } from "react-redux";
import { useAnimate } from "framer-motion";
import { playAudio } from "../../../../utils/utils";
import { audioRef } from "../../../Static/AudioAndTitle/AudioAndTitle";
import { gameActions } from "../../../../store/gameSlicer";

export default function TurnDisplay() {
  const dispatch = useDispatch();

  const curMove = useSelector((state) => state.game.game.curMove);
  const timeLimit = useSelector((state) => state.game.game.timeLimit);
  const totalTime = useSelector((state) => state.game.game.totalTime);
  const player1Move = useSelector((state) => state.game.player1Move);
  const player2 = useSelector((state) => state.game.player2);
  const version = useSelector((state) => state.game.version);

  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  const [usernameRef, animate] = useAnimate();
  const barRef = useRef();

  const opacity = curMove === player1Move ? 1 : 0.4;

  // When curMove changes update the timelimit for the solo gameplay & trigger neon username effect
  useEffect(() => {
    animate(
      usernameRef.current,
      { opacity: [1, 0.2, 1, 0.2, 1, 0.2, opacity] },
      { duration: 0.3 }
    );

    playAudio(audioRef);
    setTimeout(() => {
      playAudio(audioRef, 0.6);
    }, 150);

    // When cur move changes update timer for solo game
    if (!isConnectedServer) {
      if (curMove === player1Move) dispatch(gameActions.updateTimeLimit(10000));
      else dispatch(gameActions.updateTimeLimit(700));
    }
  }, [curMove]);

  // Time limit animation with action dispatch of timelimit to null
  useEffect(() => {
    if (!timeLimit) return;

    let start;

    function runTimer(timestamp) {
      if (!start) start = timestamp;

      let additionalTime = 0;
      if (isConnectedServer) additionalTime = timeLimit - totalTime - 1000;
      const timePassed = timestamp + additionalTime - start;

      if (timePassed > timeLimit) dispatch(gameActions.updateTimeLimit(null));

      barRef.current.style.width = `${100 - (timePassed / timeLimit) * 100}%`;

      if (start) animationReq = requestAnimationFrame(runTimer);
    }
    let animationReq = requestAnimationFrame(runTimer);

    return () => {
      cancelAnimationFrame(animationReq);
    };
  }, [timeLimit, version, totalTime]);

  return (
    <div className="turn-display">
      <h1 ref={usernameRef} className="player">
        {curMove === player1Move ? "Your Turn" : player2 ? player2 : "Computer's turn"}
      </h1>
      <div
        style={{
          boxShadow: !timeLimit ? "0px 0px 5px #ff005989" : "",
        }}
        className="timer"
      >
        <div
          style={{
            width: !timeLimit ? "100%" : "",
            backgroundColor: !timeLimit ? "#ff0059" : "",
          }}
          ref={barRef}
          className="clock"
        ></div>
      </div>
    </div>
  );
}
