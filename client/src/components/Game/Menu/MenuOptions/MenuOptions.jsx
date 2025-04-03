import { useSelector } from "react-redux";
import "./MenuOptions.css";
import getWebSocket from "../../../../web-socket/ws";
import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { playAudio } from "../../../../utils/utils";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";

export default function MenuOptions() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  const isAdmin = useSelector((state) => state.game.isAdmin);
  const player2 = useSelector((state) => state.game.player2);

  const hoverRef = useRef();
  const hoverRef2 = useRef();

  const joinBtnRef = useRef();
  const startBtnRef = useRef();

  function joinRandomLobby() {
    if (!player2 && isConnectedServer) {
      console.log("Join random lobby");
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

  function onHover(e, num) {
    if (num === 1) hoverRef.current = true;
    else if (num === 2) hoverRef2.current = true;
    playAudio(audioRef);
    e.target.style.color = "#ffffff";
    e.target.style.textShadow = "0px 0px 5px #9133bc";
  }

  function onHoverLeave(e, num) {
    if (num === 1) hoverRef.current = false;
    else if (num === 2) hoverRef2.current = false;
    playAudio(audioRef, 0.6);
    e.target.style.color = "#ffffff15";
    e.target.style.textShadow = "none";
  }

  const isLobbyFull = !isConnectedServer || (isConnectedServer && isAdmin && player2);

  useEffect(() => {
    let intervalID;

    intervalID = setInterval(() => {
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
    }, 10000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div className="menu-options">
      <button
        ref={startBtnRef}
        onMouseEnter={isLobbyFull || !player2 ? (e) => onHover(e, 1) : null}
        onMouseLeave={isLobbyFull || !player2 ? (e) => onHoverLeave(e, 1) : null}
        onClick={isAdmin ? startGame : null}
      >
        {isLobbyFull ? "start" : !player2 ? "Start Solo" : "waiting for admin to start"}
      </button>

      {isConnectedServer && !player2 && (
        <div className="or-separator">
          <div className="left-line line"></div>
          <p className="or-text">or</p>
          <div className="right-line line"></div>
        </div>
      )}

      {isConnectedServer && !player2 && (
        <button
          ref={joinBtnRef}
          onMouseEnter={(e) => onHover(e, 2)}
          onMouseLeave={(e) => onHoverLeave(e, 2)}
          onClick={joinRandomLobby}
        >
          Join Random
        </button>
      )}
    </div>
  );
}
