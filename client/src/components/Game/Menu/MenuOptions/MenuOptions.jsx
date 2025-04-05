import { useDispatch, useSelector } from "react-redux";
import "./MenuOptions.css";
import getWebSocket from "../../../../web-socket/ws";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { playAudio } from "../../../../utils/utils";
import { audioRef } from "../../../Static/AudioAndTitle/AudioAndTitle";
import OrSeparator from "./OrSeparator";
import { uiActions } from "../../../../store/uiSlicer";
import FindLoader from "./FindLoader";
import { gameActions } from "../../../../store/gameSlicer";

export default function MenuOptions() {
  const dispatch = useDispatch();

  const isFindingLobby = useSelector((state) => state.ui.isFindingLobby);
  const isStartingGame = useSelector((state) => state.ui.isStartingGame);
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  const isAdmin = useSelector((state) => state.game.isAdmin);
  const player2 = useSelector((state) => state.game.player2);

  const [menuButtonsRef, animate] = useAnimate();

  const initialRef = useRef(true);

  const [isHovering, setIsHovering] = useState(false);

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
      dispatch(gameActions.initiateClientGame());
    } else if (!player2) {
      dispatch(gameActions.initiateClientGame());
      getWebSocket().close(3000, "from-server-to-client");
    } else if (isAdmin && player2) {
      getWebSocket().send(JSON.stringify({}));
      console.log("start game on server");
    }
  }

  // On hover neon
  function onHover() {
    setIsHovering(true);
    playAudio(audioRef);
  }
  // On leave neon off with audio
  function onHoverLeave() {
    setIsHovering(false);
    playAudio(audioRef, 0.6);
  }

  // Set interval for options light for liveness
  useEffect(() => {
    if (isFindingLobby || isHovering) return;

    const intervalID = setInterval(() => {
      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);

      menuButtonsRef.current.classList.add("neon");

      const animation = async () => {
        await animate(
          menuButtonsRef.current,
          { opacity: [1, 0.2, 1, 0.2, 1] },
          { duration: 0.3 }
        );
        menuButtonsRef.current.classList.remove("neon");
      };
      animation();
    }, 10000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isFindingLobby, isHovering]);

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
  }, [isFindingLobby, isStartingGame]);

  const isLobbyFull = !isConnectedServer || (isConnectedServer && isAdmin && player2);

  return (
    <div
      className={`menu-options ${
        isConnectedServer && (!player2 || !isAdmin) && "higher-width"
      }`}
    >
      <AnimatePresence mode="wait">
        {isFindingLobby || isStartingGame ? (
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
              onMouseEnter={onHover}
              onMouseLeave={onHoverLeave}
              onClick={startGame}
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
