import "./Grid.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../../store/uiSlicer";
import getWebSocket from "../../../../web-socket/ws";
import Box from "./Box/Box";
import Lines from "./Lines/Lines";
import { gameActions } from "../../../../store/gameSlicer";

export default function Grid() {
  const dispatch = useDispatch();

  const grid = useSelector((state) => state.game.game.grid);
  const curMove = useSelector((state) => state.game.game.curMove);
  const player1Move = useSelector((state) => state.game.player1Move);

  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  console.log(curMove);

  useEffect(() => {
    if (curMove === player1Move) return;
    if (isConnectedServer) {
      console.log("handle sending websocket to update the tic tac toe grid");
    }
    // Select random grid box as a robot player
    else {
      const gridIdx = grid.reduce((acc, val, idx) => (!val ? [...acc, idx] : acc), []);

      if (gridIdx.length === 0) {
        console.log("handle tie game or win");
      }

      setTimeout(() => {
        dispatch(
          gameActions.updateClientGame(
            gridIdx[Math.floor(Math.random() * gridIdx.length)]
          )
        );
      }, 500);
    }
  }, [curMove]);

  return (
    <div
      style={{ cursor: player1Move !== curMove ? "not-allowed" : "" }}
      className="grid"
    >
      <Lines />
      {grid.map((state, idx) => (
        <Box state={state} idx={idx} key={idx} />
      ))}

      <button
        onClick={() => {
          dispatch(gameActions.initiateClientGame());
        }}
      >
        reset for test
      </button>
    </div>
  );
}
