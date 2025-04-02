import { useSelector } from "react-redux";
import "./MenuOptions.css";
import getWebSocket from "../../../../web-socket/ws";
import { useRef } from "react";
import { animate } from "framer-motion";

export default function MenuOptions() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  const isAdmin = useSelector((state) => state.game.isAdmin);
  const player2 = useSelector((state) => state.game.player2);

  const hoverRef = useRef();

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
      console.log(getWebSocket());
    } else if (isAdmin && player2) {
      console.log("start game on server");
      return;
    }
  }

  return (
    <div className="menu-options">
      <button onClick={isAdmin ? startGame : null}>
        {!isConnectedServer || (isConnectedServer && isAdmin && player2)
          ? "start"
          : !player2
          ? "Start Solo"
          : "waiting for admin to start"}
      </button>

      {isConnectedServer && !player2 && (
        <div className="or-separator">
          <div className="left-line line"></div>
          <p className="or-text">or</p>
          <div className="right-line line"></div>
        </div>
      )}

      {isConnectedServer && !player2 && (
        <button onClick={joinRandomLobby}>Join Random</button>
      )}
    </div>
  );
}
