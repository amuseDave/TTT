import "./StartLobbyBtn.css";

import { motion, AnimatePresence, useAnimate } from "framer-motion";
import getWebSocket from "../../../web-socket/ws";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { audioRef } from "../../Static/AudioAndTitle/AudioAndTitle";
import { playAudio } from "../../../utils/utils";
import { gameActions } from "../../../store/gameSlicer";
import { uiActions } from "../../../store/uiSlicer";

export default function StartLobbyBtn({ className }) {
  const dispatch = useDispatch();

  const startError = useSelector((state) => state.ui.startError);
  const isJoiningLobby = useSelector((state) => state.ui.isJoiningLobby);
  const isCreatingLobby = useSelector((state) => state.ui.isCreatingLobby);

  const [playBtnRef, animate] = useAnimate();

  const firstRenderRef = useRef(true);

  const isHoverRef = useRef();

  const intervalID = useRef();

  function startLobbyServer() {
    if (isJoiningLobby || isCreatingLobby) return;

    // Check if the connection is established and start lobby right from server if it is
    const { readyState, OPEN } = getWebSocket();

    if (readyState === OPEN) {
      // Test out delay UI
      setTimeout(() => {
        getWebSocket().send(JSON.stringify({ action: "start-lobby", data: null }));
      }, 1000);
      dispatch(uiActions.isCreatingLobby(true));
    } else {
      // If connections is not establish start lobby from client to play against bot
      dispatch(
        gameActions.initiateLobbyClient({
          isAdmin: true,
          player1: null,
          player2: null,
          lobbyID: null,
          move: "X",
        })
      );
    }
  }

  // Hover effect to use canvas logical light appearing effect
  function hoverEffect() {
    isHoverRef.current = true;
    if (isCreatingLobby || isJoiningLobby) return;
    playBtnRef.current.classList.add("hover-effect");
    playAudio(audioRef);
  }
  function leaveHoverEffect() {
    isHoverRef.current = false;
    if (isCreatingLobby || isJoiningLobby) return;
    playBtnRef.current.classList.remove("hover-effect");
    playAudio(audioRef, 0.6);
  }

  // If it is joining or creating lobby add pulsating effect to the text then handle ending hover effect if its hovvered
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (isCreatingLobby || isJoiningLobby) {
      // Use interval to indicate neon pulsing with audio
      intervalID.current = setInterval(() => {
        playAudio(audioRef);
      }, 1000);
    } else {
      const animation = async () => {
        await animate(
          playBtnRef.current,
          { opacity: [1, 0.1, 1, 0.1, 1] },
          { duration: 0.3 }
        );
        if (isHoverRef.current) {
          playBtnRef.current.classList.add("hover-effect");
        }
      };
      animation();
    }
    return () => {
      clearInterval(intervalID.current);
    };
  }, [isJoiningLobby, isCreatingLobby]);

  // Play audio on errors
  useEffect(() => {
    if (startError) {
      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);
      setTimeout(() => {
        dispatch(uiActions.setStartError(null));
      }, 3000);
    } else {
      if (firstRenderRef.current) {
        firstRenderRef.current = false;
        return;
      }
      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);
    }
  }, [startError]);

  return (
    <motion.div
      exit={{ opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 0], transition: { duration: 0.3 } }}
      className={`start-btn-container ${className}`}
      onMouseEnter={hoverEffect}
      onMouseLeave={leaveHoverEffect}
    >
      <button
        ref={playBtnRef}
        onClick={startLobbyServer}
        className={`start-btn ${
          isCreatingLobby || isJoiningLobby ? "hover-effect pulsating" : ""
        }`}
      >
        {isJoiningLobby ? "Joining" : "Play"}
      </button>

      <AnimatePresence>
        {startError && (
          <motion.p
            exit={{
              opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 0],
              transition: { duration: 0.3 },
            }}
            animate={{
              opacity: [0.2, 0.2, 1, 1, 0.2, 0.2, 1],
              transition: { duration: 0.3 },
            }}
            className="error-container"
          >
            {startError}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
