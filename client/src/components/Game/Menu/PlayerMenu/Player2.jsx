import { animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";
import { playAudio } from "../../../../utils/utils";
import { uiActions } from "../../../../store/uiSlicer";

export default function Player2() {
  const dispatch = useDispatch();

  const [initial, setInitial] = useState(true);

  const usernameRef = useRef();

  const menuUserErrorRef = useRef();
  const menuUserErrorRef2 = useRef();

  const timeoutIDRef = useRef();
  const mouseOn = useRef();

  const player1Move = useSelector((state) => state.game.player1Move);
  const player2 = useSelector((state) => state.game.player2);
  const menuErrorUserLeft = useSelector((state) => state.ui.menuErrorUserLeft);

  function onMouseLeave() {
    mouseOn.current = false;
    if (timeoutIDRef.current) return;
    animate(usernameRef.current, { opacity: player2 ? 0.4 : 0.6 }, { duration: 0.2 });
  }
  function onMouseEnter() {
    mouseOn.current = true;
    if (timeoutIDRef.current) return;
    animate(usernameRef.current, { opacity: 1 }, { duration: 0.2 });
  }

  useEffect(() => {
    if (initial) setInitial(false);
    else {
      timeoutIDRef.current = setTimeout(() => {
        timeoutIDRef.current = null;
      }, 400);

      animate(
        usernameRef.current,
        {
          opacity: [1, 0, 1, 0, 1, 0, 1, 0.3, mouseOn.current ? 1 : player2 ? 0.4 : 0.6],
        },
        { duration: 0.4 }
      );

      playAudio(audioRef);
    }
  }, [player2]);

  useEffect(() => {
    if (menuErrorUserLeft) {
      setTimeout(() => {
        dispatch(uiActions.setMenuUserLeftError(null));
      }, 3000);
    }
  }, [menuErrorUserLeft]);

  return (
    <motion.div
      layout
      className="player-2"
      style={{ order: player1Move === "X" ? 2 : -1 }}
    >
      <p className="move">{player1Move === "X" ? "O" : "X"}</p>

      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={usernameRef}
        className={`${player2 ? "username" : "invite"} user`}
      >
        <p>{player2 ? player2 : "invite"}</p>
        {player2 && <p>{player2}</p>}
      </div>

      {menuErrorUserLeft && (
        <div className="user-left-error">
          <p ref={menuUserErrorRef}>{menuErrorUserLeft}</p>
          <p ref={menuUserErrorRef2}>{menuErrorUserLeft}</p>
        </div>
      )}
    </motion.div>
  );
}
