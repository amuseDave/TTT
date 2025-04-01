import { useDispatch, useSelector } from "react-redux";
import { Dices } from "lucide-react";
import { gameActions } from "../../../store/gameSlicer";
import { getRandomItem, playAudio, usernames } from "../../../utils/utils";
import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { audioRef } from "../../AudioAndTitle/AudioAndTitle";
import webSocket from "../../../web-socket/ws";

export default function Player1() {
  const [initial, setInitial] = useState(true);

  const diceRef = useRef();
  const inputRef = useRef();
  const inputRef2 = useRef();
  const animationTimeoutID = useRef();
  const animationTimeoutID2 = useRef();
  const debounceID = useRef();

  const dispatch = useDispatch();
  const player1 = useSelector((state) => state.game.player1);
  const player1Move = useSelector((state) => state.game.player1Move);

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
      if (debounceID.current) clearTimeout(debounceID.current);

      debounceID.current = setTimeout(() => {
        webSocket.send(
          JSON.stringify({ action: "update-username", data: { username: player1 } })
        );
      }, 500);
    }
  }, [player1]);

  return (
    <motion.div
      layout
      className="player-1"
      style={{ order: player1Move === "X" ? -1 : 2 }}
    >
      <p className="move">{player1Move}</p>
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
