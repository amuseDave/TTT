import { useDispatch, useSelector } from "react-redux";
import { Dices } from "lucide-react";
import { gameActions } from "../../../../store/gameSlicer";
import { getRandomItem, playAudio, usernames } from "../../../../utils/utils";
import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";
import getWebSocket from "../../../../web-socket/ws";

export default function Player1() {
  const [initial, setInitial] = useState(true);

  const playerMoveRef = useRef();
  const playerMoveRef2 = useRef();

  const isSwitchingMovesRef = useRef();

  const diceRef = useRef();

  const inputRef = useRef();
  const inputRef2 = useRef();

  const animationTimeoutID = useRef();
  const animationTimeoutID2 = useRef();

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
      { color: ["#ff2b60", "#ff2b60", "#ffffffe5"] },
      { duration: 0.2 }
    );
    animate(
      inputRef2.current,
      { color: ["#ff43b1", "#ff43b1", "#e2a3fa"] },
      { duration: 0.2 }
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

  useEffect(() => {
    if (animationTimeoutID2.current) return;

    animate(inputRef.current, { opacity: [1, 0, 1, 0, 1] }, { duration: 0.2 });
    animate(inputRef2.current, { opacity: [1, 0, 1, 0, 1] }, { duration: 0.2 });
    playAudio(audioRef);
    animationTimeoutID2.current = setTimeout(() => {
      animationTimeoutID2.current = null;
    }, 150);
  }, [player1]);

  useEffect(() => {
    if (initial) {
      setInitial(false);
    } else {
      if (getWebSocket().readyState !== getWebSocket().OPEN) return;
      if (debounceID.current) clearTimeout(debounceID.current);

      debounceID.current = setTimeout(() => {
        getWebSocket().send(
          JSON.stringify({ action: "update-username", data: { username: player1 } })
        );
      }, 500);
    }
  }, [player1]);

  // Pass the username and create lobby in the server if the connection was established when the lobby was created
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

  function switchMoves() {
    if (isSwitchingMovesRef.current) return;

    isSwitchingMovesRef.current = true;

    dispatch(gameActions.changePlayerMoves({ move: player1Move === "X" ? "O" : "X" }));

    playAudio(audioRef);
    setTimeout(() => {
      playAudio(audioRef, 0.6);
    }, 150);
    playerMoveRef.current.style.color = "#fd6a6a";
    animate(
      playerMoveRef.current,
      { opacity: [0.2, 1, 0.2, 1, 0.2, 1, 0.2, 1] },
      { duration: 0.3 }
    ).then(() => {
      isSwitchingMovesRef.current = false;
      playerMoveRef.current.style.color = "#ffffff33";
    });
    animate(
      playerMoveRef2.current,
      { opacity: [0, 1, 0, 1, 0, 1, 0] },
      { duration: 0.3 }
    );
  }

  return (
    <motion.div
      layout
      className="player-1"
      style={{ order: player1Move === "X" ? -1 : 2 }}
    >
      <div className="move-container">
        <p
          ref={playerMoveRef}
          onClick={isConnectedServer ? null : switchMoves}
          className="move"
        >
          {player1Move}
        </p>
        {isConnectedServer || (
          <p ref={playerMoveRef2} className="move">
            {player1Move}
          </p>
        )}
      </div>
      <div className="input">
        <input
          onBlur={handleEmptyName}
          size={player1.length > 1 ? player1.length + 1 : 1}
          ref={inputRef}
          onChange={changePlayer1Username}
          value={player1}
        />
        <input
          size={player1.length > 1 ? player1.length + 1 : 1}
          ref={inputRef2}
          disabled={true}
          value={player1}
        />
      </div>

      <div ref={diceRef} onClick={changePlayer1RandomUsername} className={`dices`}>
        <Dices />
        <Dices />
      </div>
    </motion.div>
  );
}
