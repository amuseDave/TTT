import { motion, useAnimate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { audioRef } from "../../../Static/AudioAndTitle/AudioAndTitle";
import { playAudio } from "../../../../utils/utils";
import { uiActions } from "../../../../store/uiSlicer";

export default function Player2() {
  const dispatch = useDispatch();

  const [usernameRef, animate] = useAnimate();
  const isAnimating = useRef();
  const mouseOn = useRef();

  const player1Move = useSelector((state) => state.game.player1Move);
  const player2 = useSelector((state) => state.game.player2);

  function onMouseEnter() {
    mouseOn.current = true;
    if (isAnimating.current) return;
    playAudio(audioRef);
    usernameRef.current.style.opacity = mouseOn.current ? 1 : player2 ? 0.3 : 0.5;
  }
  function onMouseLeave() {
    mouseOn.current = false;
    if (isAnimating.current) return;
    playAudio(audioRef, 0.6);
    usernameRef.current.style.opacity = player2 ? 0.3 : 0.5;
  }

  useEffect(() => {
    if (player2) {
      isAnimating.current = true;

      const animation = async () => {
        await animate(
          usernameRef.current,
          { opacity: [1, 0, 1, 0, 1, 0] },
          { duration: 0.3 }
        );
        await animate(
          usernameRef.current,
          { opacity: mouseOn.current ? 1 : player2 ? 0.3 : 0.5 },
          { duration: 0 }
        );
        isAnimating.current = false;
      };
      animation();
      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);
    }
  }, [player2]);

  // copy link with invite button
  function inviteCopyLink() {
    if (player2) return;

    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        dispatch(
          uiActions.setMenuAlert({
            type: "success",
            message: "Link copied! Share it with a friend.",
          })
        );
      })
      .catch(() => {
        dispatch(
          uiActions.setMenuAlert({
            type: "error",
            message: "Copy failed. Try copying the URL manually.",
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

      <p
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={usernameRef}
        className={`${player2 ? "username" : "invite"} user`}
        onClick={inviteCopyLink}
      >
        {player2 ? player2 : "invite"}
      </p>
    </motion.div>
  );
}
