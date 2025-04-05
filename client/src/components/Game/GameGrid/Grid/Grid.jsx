import "./Grid.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    let timeoutID;
    if (curMove === player1Move) return;
    if (isConnectedServer) {
      // console.log("handle sending websocket to update the tic tac toe grid");
    }
    // Select random grid box as a robot player
    else {
      const gridIdx = grid.reduce((acc, val, idx) => {
        if (!val) acc.push(idx);
        return acc;
      }, []);

      if (gridIdx.length === 0) {
        console.log("handle tie game or win");
      } else {
        timeoutID = setTimeout(() => {
          if (player1Move === curMove) return;
          dispatch(
            gameActions.updateClientGame(
              gridIdx[Math.floor(Math.random() * gridIdx.length)]
            )
          );
        }, 500);
      }

      return () => {
        if (timeoutID) clearTimeout(timeoutID);
      };
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
          dispatch(gameActions.initiateClientGame(true));
        }}
      >
        reset for test
      </button>
    </div>
  );
}
