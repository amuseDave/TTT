import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/uiSlicer";
import { gameActions } from "../../../store/gameSlicer";
import { reconnectWebSocket } from "../../../web-socket/ws";

export default function InitialConnection() {
  const dispatch = useDispatch();
  const isStartingSolo = useSelector((state) => state.ui.isStartingSolo);
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  const player2 = useSelector((state) => state.game.player2);
  const lobby = useSelector((state) => state.game.lobby);

  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current === "solo") return;
    if (initialRef.current && !isConnectedServer) {
      if (isStartingSolo) dispatch(uiActions.isStartingSolo(false));
      initialRef.current = "solo";
      return;
    } else {
      initialRef.current = false;
    }

    if (!isConnectedServer || !player2) {
      dispatch(gameActions.initiateClientGame(null));
    }

    // Reset the game back to lobby if player2 leaves, or the connection is lost after initial render of game grid
  }, [isConnectedServer, player2]);

  // Reconnect back to server when game is finished on offline
  useEffect(() => {
    return () => {
      if (!isConnectedServer && !lobby) reconnectWebSocket();
    };
  }, [lobby]);

  return <></>;
}
