import { useDispatch, useSelector } from "react-redux";
import { Dices } from "lucide-react";
import { gameActions } from "../../../../store/gameSlicer";
import { getRandomItem, playAudio, usernames } from "../../../../utils/utils";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { audioRef } from "../../../Static/AudioAndTitle/AudioAndTitle";
import getWebSocket from "../../../../web-socket/ws";

export default function Player1() {
  const [initial, setInitial] = useState(true);

  const playerMoveRef = useRef();

  const isSwitchingMovesRef = useRef();

  const diceRef = useRef();

  const [inputRef, animate] = useAnimate();

  const animationTimeoutID = useRef();
  const animationTimeoutID2 = useRef();

  const animationIntervalID = useRef();

  const debounceID = useRef();

  const dispatch = useDispatch();
  const player1 = useSelector((state) => state.game.player1);
  const player1Move = useSelector((state) => state.game.player1Move);
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  function changeNameError() {
    if (animationTimeoutID.current) return;

    playAudio(audioRef);

    animate(
      inputRef.current,
      {
        color: ["#ff2b60", "#ff2b60", "#ffffffe6"],
        textShadow: ["0 0 0", "0 0 5px #ff2b60", `0px 0px 5px #e2a3fa`],
      },
      { duration: 0.3 }
    );

    animationTimeoutID.current = setTimeout(() => {
      animationTimeoutID.current = null;
    }, 150);
  }
  function changePlayer1RandomUsername() {
    let randomUser = getRandomItem(usernames);
    while (randomUser === player1) {
      randomUser = getRandomItem(usernames);
    }
    animate(diceRef.current, { opacity: [1, 0, 1, 0, 1] }, { duration: 0.2 });

    dispatch(gameActions.changePlayer1Username(randomUser));
  }

  function changePlayer1Username(e) {
    const value = e.target.value.trim();
    if (value.length > 15) {
      changeNameError();
      return;
    }
    if (value.length < 3) changeNameError();

    dispatch(gameActions.changePlayer1Username(value));
  }

  function handleEmptyName() {
    if (player1.length < 3) changePlayer1RandomUsername();
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Use typing sound effect when player types in the input
  useEffect(() => {
    if (animationTimeoutID2.current) return;

    animate(inputRef.current, { opacity: [1, 0, 1, 0, 1] }, { duration: 0.2 });

    playAudio(audioRef);
    animationTimeoutID2.current = setTimeout(() => {
      animationTimeoutID2.current = null;
    }, 150);
  }, [player1]);

  // Update the username in the server when the players type in the input
  // and the connection was established
  useEffect(() => {
    if (initial) {
      setInitial(false);
    } else {
      const { readyState, OPEN } = getWebSocket();
      if (readyState !== OPEN) return;
      if (debounceID.current) clearTimeout(debounceID.current);

      debounceID.current = setTimeout(() => {
        getWebSocket().send(
          JSON.stringify({ action: "update-username", data: { username: player1 } })
        );
      }, 500);
    }
  }, [player1]);

  // Pass the username and create lobby in the server if the connection was established when the lobby was created before it was established
  useEffect(() => {
    if (initial) {
      setInitial(false);
    } else {
      if (isConnectedServer) {
        getWebSocket().send(
          JSON.stringify({
            action: "start-lobby",
            data: { username: player1, move: player1Move },
          })
        );
      }
    }
  }, [isConnectedServer]);

  // Handle switch moves animation when the player clicks on the move
  // With somesort of debounce so they can not do too quick move changes
  function switchMoves() {
    if (isSwitchingMovesRef.current) return;

    isSwitchingMovesRef.current = true;
    dispatch(gameActions.changePlayerMoves({ move: player1Move === "X" ? "O" : "X" }));

    playerMoveRef.current.classList.add("active");

    const animation = async () => {
      await animate(
        playerMoveRef.current,
        { opacity: [0.2, 1, 0.2, 1, 0.2, 1, 0.2, 1] },
        { duration: 0.3 }
      );
      isSwitchingMovesRef.current = false;
      playerMoveRef.current.classList.remove("active");
    };
    animation();

    playAudio(audioRef);
    setTimeout(() => {
      playAudio(audioRef, 0.6);
    }, 150);
  }

  // Handle interval animation to indicate that the player can click on the move
  useEffect(() => {
    if (isConnectedServer) return;

    animationIntervalID.current = setInterval(() => {
      playerMoveRef.current.classList.add("active");
      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);

      const animation = async () => {
        await animate(
          playerMoveRef.current,
          { opacity: [0.2, 1, 0.2, 1, 0.2, 1, 0.2, 1] },
          { duration: 0.3 }
        );
        isSwitchingMovesRef.current = false;
        playerMoveRef.current.classList.remove("active");
      };

      animation();
    }, 4000);

    return () => {
      clearInterval(animationIntervalID.current);
    };
  }, [isConnectedServer, player1Move]);

  return (
    <motion.div
      layout
      className="player-1"
      style={{ order: player1Move === "X" ? -1 : 2 }}
    >
      <p
        ref={playerMoveRef}
        onClick={isConnectedServer ? null : switchMoves}
        className={`move ${isConnectedServer ? "" : "hover"}`}
      >
        {player1Move}
      </p>

      <input
        onBlur={handleEmptyName}
        size={player1.length > 1 ? player1.length + 2 : 1}
        ref={inputRef}
        onChange={changePlayer1Username}
        value={player1}
      />

      <div ref={diceRef} onClick={changePlayer1RandomUsername} className={`dices`}>
        <Dices />
        <Dices />
      </div>
    </motion.div>
  );
}
