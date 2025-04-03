import { animate, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";
import { playAudio } from "../../../../utils/utils";
import { uiActions } from "../../../../store/uiSlicer";

export default function Player2() {
  const dispatch = useDispatch();

  const initial = useRef(true);

  const usernameRef = useRef();

  const timeoutIDRef = useRef();
  const mouseOn = useRef();

  const player1Move = useSelector((state) => state.game.player1Move);
  const player2 = useSelector((state) => state.game.player2);

  function onMouseLeave() {
    mouseOn.current = false;
    if (timeoutIDRef.current) return;
    playAudio(audioRef, 0.6);
    animate(usernameRef.current, { opacity: player2 ? 0.4 : 0.6 }, { duration: 0.2 });
  }
  function onMouseEnter() {
    mouseOn.current = true;
    if (timeoutIDRef.current) return;
    playAudio(audioRef);
    animate(usernameRef.current, { opacity: 1 }, { duration: 0.2 });
  }

  useEffect(() => {
    if (initial.current) initial.current = false;
    else if (player2) {
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

  function inviteCopyLink() {
    if (player2) return;

    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        dispatch(
          uiActions.setMenuAlert({ type: "success", message: "Copied to clipboard!" })
        );
      })
      .catch(() => {
        dispatch(
          uiActions.setMenuAlert({
            type: "error",
            message: "Failed to copy. Try manually copying url.",
          })
        );
      });
  }

  return (
    <motion.div
      layout
      className="player-2"
      style={{ order: player1Move === "X" ? 2 : -1 }}
    >
      <p className="move">{player1Move === "X" ? "O" : "X"}</p>

      <motion.div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={usernameRef}
        className={`${player2 ? "username" : "invite"} user`}
      >
        <p onClick={inviteCopyLink}>{player2 ? player2 : "invite"}</p>
        {player2 && <p>{player2}</p>}
      </motion.div>
    </motion.div>
  );
}
