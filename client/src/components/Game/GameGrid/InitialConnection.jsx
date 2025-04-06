import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/uiSlicer";
import { gameActions } from "../../../store/gameSlicer";

export default function InitialConnection() {
  const dispatch = useDispatch();
  const isStartingSolo = useSelector((state) => state.ui.isStartingSolo);
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  const player2 = useSelector((state) => state.game.player2);

  const initialRef = useRef(true);

  console.log(player2, isStartingSolo, isConnectedServer);

  useEffect(() => {
    if (initialRef.current === "solo") return;
    if (initialRef.current && (!player2 || !isConnectedServer)) {
      if (isStartingSolo) dispatch(uiActions.isStartingSolo(false));
      initialRef.current = "solo";
      return;
    }

    if (!isConnectedServer || !player2) {
      console.log("resetting back to lobby");
      dispatch(gameActions.initiateClientGame(null));
    }

    // Reset the game back to lobby if player2 leaves, or the connection is lost after initial render of game grid
  }, [isConnectedServer, player2]);

  return <></>;
}
