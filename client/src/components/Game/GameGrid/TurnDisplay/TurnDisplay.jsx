import { useEffect, useRef } from "react";
import "./TurnDisplay.css";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { checkWin, playAudio } from "../../../../utils/utils";
import { audioRef } from "../../../Static/AudioAndTitle/AudioAndTitle";
import { gameActions } from "../../../../store/gameSlicer";
import { uiActions } from "../../../../store/uiSlicer";

export default function TurnDisplay() {
  const dispatch = useDispatch();

  const grid = useSelector((state) => state.game.game.grid);
  const curMove = useSelector((state) => state.game.game.curMove);
  const timeLimit = useSelector((state) => state.game.game.timeLimit);
  const totalTime = useSelector((state) => state.game.game.totalTime);
  const player1Move = useSelector((state) => state.game.player1Move);
  const player2 = useSelector((state) => state.game.player2);
  const version = useSelector((state) => state.game.version);
  const result = useSelector((state) => state.game.result);
  const isWaitingRes = useSelector((state) => state.ui.result);

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

    const result = checkWin(grid);

    if (result) {
      dispatch(gameActions.updateResult(result));
    } else if (!isConnectedServer) {
      if (curMove === player1Move) dispatch(gameActions.updateTimeLimit(10000));
      else dispatch(gameActions.updateTimeLimit(700));
    }
  }, [curMove]);

  // Time limit animation with action dispatch of timelimit to null
  useEffect(() => {
    if (!timeLimit || result) return;

    let start;

    function runTimer(timestamp) {
      if (!start) start = timestamp;

      let additionalTime = 0;
      if (isConnectedServer) additionalTime = timeLimit - totalTime;
      const timePassed = timestamp + additionalTime - start;

      console.log(timePassed);

      if (timePassed > timeLimit) dispatch(gameActions.updateTimeLimit(null));

      barRef.current.style.width = `${100 - (timePassed / timeLimit) * 100}%`;

      if (start) animationReq = requestAnimationFrame(runTimer);
    }
    let animationReq = requestAnimationFrame(runTimer);

    return () => {
      cancelAnimationFrame(animationReq);
    };
  }, [timeLimit, version, totalTime, result]);

  useEffect(() => {
    let start;
    let animationReq;
    if (result) {
      const timeLimit = 5000;
      function runTimer(timestamp) {
        if (!start) start = timestamp;
        const timePassed = timestamp - start;

        if (timePassed > timeLimit) {
          dispatch(gameActions.initiateClientGame(null));
          dispatch(
            gameActions.changePlayerMoves({ move: player1Move === "X" ? "O" : "X" })
          );

          if (isConnectedServer) dispatch(uiActions.isWaitingRes(true));
        }

        barRef.current.style.width = `${100 - (timePassed / timeLimit) * 100}%`;
        animationReq = requestAnimationFrame(runTimer);
      }

      animationReq = requestAnimationFrame(runTimer);
    }

    return () => {
      cancelAnimationFrame(animationReq);
    };
  }, [result]);

  return (
    <div className="turn-display">
      <AnimatePresence mode="sync">
        {!result ? (
          <motion.h1
            exit={{ opacity: [1, 0.2, 1, 0.2, 1, 0], transition: { duration: 0.3 } }}
            ref={usernameRef}
            className="player default"
          >
            {curMove === player1Move
              ? "Your Turn"
              : player2
              ? player2
              : "Computer's turn"}
          </motion.h1>
        ) : (
          <motion.h1
            className={`player ${
              result === player1Move || result === "draw" ? "win" : "loss"
            }`}
            animate={{
              opacity: [1, 0.2, 1, 0.2, 1, 0, 1],
              transition: { duration: 0.3 },
            }}
          >
            {result === player1Move
              ? "You Won!"
              : result === "draw"
              ? "It's a draw, try again!"
              : "You Lost, try again"}
          </motion.h1>
        )}
      </AnimatePresence>

      <div
        style={{
          boxShadow: `0px 0px 5px ${
            result === player1Move || result === "draw"
              ? "#05ffa8"
              : !timeLimit || result !== player1Move
              ? "#ff0059"
              : "#0000000"
          }`,
        }}
        className="timer"
      >
        <div
          style={{
            width: !timeLimit || isWaitingRes ? "100%" : "",
            backgroundColor:
              result === player1Move || result === "draw"
                ? "#14e7ff"
                : !timeLimit && !result
                ? "#ff0059"
                : timeLimit && !isWaitingRes
                ? "#f693b6"
                : "#ff0059",
          }}
          ref={barRef}
          className="clock"
        ></div>
      </div>
    </div>
  );
}
