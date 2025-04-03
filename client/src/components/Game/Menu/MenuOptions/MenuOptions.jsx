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
  const hoverRef2 = useRef();

  const joinBtnRef = useRef();
  const startBtnRef = useRef();

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
  function onHover(e, num) {
    if (num === 1) hoverRef.current = true;
    else if (num === 2) hoverRef2.current = true;
    playAudio(audioRef);
    e.target.style.color = "#ffffff";
    e.target.style.textShadow = "0px 0px 5px #9133bc";
  }
  // On leave neon off with audio
  function onHoverLeave(e, num) {
    if (num === 1) hoverRef.current = false;
    else if (num === 2) hoverRef2.current = false;
    playAudio(audioRef, 0.6);
    e.target.style.color = "#ffffff15";
    e.target.style.textShadow = "none";
  }

  const isLobbyFull = !isConnectedServer || (isConnectedServer && isAdmin && player2);

  // Set interval for options light for liveness
  useEffect(() => {
    if (isFindingLobby) return;
    let intervalID;

    intervalID = setInterval(() => {
      if (hoverRef.current || hoverRef2.current) return;
      startBtnRef.current.style.color = "#ffffff";
      startBtnRef.current.style.textShadow = "0px 0px 5px #9133bc";

      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);

      animate(
        startBtnRef.current,
        { opacity: [1, 0.2, 1, 0.2, 1] },
        { duration: 0.3 }
      ).then(() => {
        if (hoverRef.current) return;
        startBtnRef.current.style.color = "#ffffff15";
        startBtnRef.current.style.textShadow = "none";
      });
      if (joinBtnRef.current) {
        joinBtnRef.current.style.color = "#ffffff";
        joinBtnRef.current.style.textShadow = "0px 0px 5px #9133bc";
        animate(
          joinBtnRef.current,
          { opacity: [1, 0.2, 1, 0.2, 1] },
          { duration: 0.3 }
        ).then(() => {
          if (hoverRef2.current) return;
          joinBtnRef.current.style.color = "#ffffff15";
          joinBtnRef.current.style.textShadow = "none";
        });
      }
    }, 8000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isFindingLobby]);

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
            key="options"
            exit={{ opacity: [0, 1, 0, 1, 0], transition: { duration: 0.3 } }}
            animate={{ opacity: [1, 0, 1, 0, 1], transition: { duration: 0.3 } }}
            className="menu-buttons"
          >
            <button
              ref={startBtnRef}
              onMouseEnter={isLobbyFull || !player2 ? (e) => onHover(e, 1) : null}
              onMouseLeave={isLobbyFull || !player2 ? (e) => onHoverLeave(e, 1) : null}
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
                  ref={joinBtnRef}
                  onMouseEnter={(e) => onHover(e, 2)}
                  onMouseLeave={(e) => onHoverLeave(e, 2)}
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
