import { useDispatch, useSelector } from "react-redux";
import { Dices } from "lucide-react";
import { gameActions } from "../../gameSlicer";
import { getRandomItem, usernames } from "../../utils";
import { useEffect, useRef } from "react";
import { audioRef } from "../../App";

export default function Player1() {
  const inputRef = useRef();
  const inputRef2 = useRef();
  const timeoutID = useRef();

  const dispatch = useDispatch();
  const player1 = useSelector((state) => state.game.player1);
  const player1Move = useSelector((state) => state.game.player1Move);
  const player2 = useSelector((state) => state.game.player2);

  function changeMove() {
    if (player2) return;
  }

  function changePlayer1RandomUsername() {
    dispatch(gameActions.changePlayer1Username(getRandomItem(usernames)));
  }

  function changeNameError() {
    if (timeoutID.current) return;

    audioRef.pause();
    audioRef.currentTime = 0;
    audioRef.play();

    inputRef.current.style.color = "#ff2b60";
    inputRef2.current.style.color = "#ff43b1";

    timeoutID.current = setTimeout(() => {
      timeoutID.current = null;
      inputRef.current.style.color = "rgba(255, 255, 255, 0.9)";
      inputRef2.current.style.color = "#e2a3fa";
    }, 100);
  }

  function changePlayer1Username(e) {
    const { value } = e.target;
    if (value.length > 15) {
      changeNameError();
      return;
    }
    dispatch(gameActions.changePlayer1Username(value));
  }

  function handleEmptyName() {
    if (player1.length < 1) changePlayer1RandomUsername();
  }

  useEffect(() => {
    if (player1.length > 1) {
      inputRef.current.size = player1.length;
      inputRef2.current.size = player1.length;
    }
  }, [player1]);

  return (
    <div className="player-1">
      <p className="move">{player1Move}</p>
      <div className="input">
        <input
          onBlur={handleEmptyName}
          ref={inputRef}
          onChange={changePlayer1Username}
          value={player1}
        />
        <input ref={inputRef2} disabled={true} value={player1} />
      </div>

      <div
        onClick={changePlayer1RandomUsername}
        className={`dices ${player2 && "disabled"}`}
      >
        <Dices />
        <Dices />
      </div>
    </div>
  );
}
