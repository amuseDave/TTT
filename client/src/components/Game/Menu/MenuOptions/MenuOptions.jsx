import { useDispatch, useSelector } from "react-redux";
import "./MenuOptions.css";
import getWebSocket from "../../../../web-socket/ws";
import { useEffect, useRef } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";
import { playAudio } from "../../../../utils/utils";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";
import OrSeparator from "./OrSeparator";
import { uiActions } from "../../../../store/uiSlicer";
import FindLoader from "./FindLoader";

export default function MenuOptions() {
  const dispatch = useDispatch();

  const isFindingLobby = useSelector((state) => state.ui.isFindingLobby);
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  const isAdmin = useSelector((state) => state.game.isAdmin);
  const player2 = useSelector((state) => state.game.player2);

  const hoverRef = useRef();

  const menuButtonsRef = useRef();

  const initialRef = useRef(true);

  function joinRandomLobby() {
    if (!player2 && isConnectedServer) {
      dispatch(uiActions.isFindingLobby(true));

      // Test out UI delay
      setTimeout(() => {
        getWebSocket().send(JSON.stringify({ action: "find-lobby" }));
      }, 2000);
    }
  }

  function startGame() {
    if (!isConnectedServer) {
      console.log("start game on the client");
      return;
    } else if (!player2) {
      console.log("start game on the client if noone is in the lobby");
      console.log(getWebSocket().close());
    } else if (isAdmin && player2) {
      console.log("start game on server");
      return;
    }
  }

  // On hover neon
  function onHover() {
    hoverRef.current = true;
    playAudio(audioRef);
  }
  // On leave neon off with audio
  function onHoverLeave() {
    hoverRef.current = false;
    playAudio(audioRef, 0.6);
  }

  const isLobbyFull = !isConnectedServer || (isConnectedServer && isAdmin && player2);

  // Set interval for options light for liveness
  useEffect(() => {
    if (isFindingLobby) return;
    let intervalID;

    intervalID = setInterval(() => {
      if (hoverRef.current) return;
      menuButtonsRef.current.classList.add("neon");

      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);

      animate(
        menuButtonsRef.current,
        { opacity: [1, 0.2, 1, 0.2, 1] },
        { duration: 0.3 }
      ).then(() => {
        menuButtonsRef.current.classList.remove("neon");
      });
    }, 10000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isFindingLobby]);

  // Play audio on when lobby is founding toggle
  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    playAudio(audioRef);
    setTimeout(() => {
      playAudio(audioRef, 0.6);
    }, 150);
  }, [isFindingLobby]);

  return (
    <div
      className={`menu-options ${
        isConnectedServer && (!player2 || !isAdmin) && "higher-width"
      }`}
    >
      <AnimatePresence mode="wait">
        {isFindingLobby ? (
          <FindLoader key="loader" />
        ) : (
          <motion.div
            ref={menuButtonsRef}
            key="options"
            exit={{ opacity: [0, 1, 0, 1, 0], transition: { duration: 0.3 } }}
            animate={{ opacity: [1, 0, 1, 0, 1], transition: { duration: 0.3 } }}
            className="menu-buttons"
          >
            <button
              onMouseEnter={isLobbyFull || !player2 ? onHover : null}
              onMouseLeave={isLobbyFull || !player2 ? onHoverLeave : null}
              onClick={isAdmin ? startGame : null}
            >
              {isLobbyFull
                ? "start"
                : !player2
                ? "Start Solo"
                : "waiting for admin to start"}
            </button>
            {isConnectedServer && !player2 && (
              <>
                <OrSeparator />
                <button
                  onMouseEnter={onHover}
                  onMouseLeave={onHoverLeave}
                  onClick={joinRandomLobby}
                >
                  Join Random
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
