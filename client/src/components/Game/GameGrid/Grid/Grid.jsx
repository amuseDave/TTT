import "./Grid.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "./Box/Box";
import Lines from "./Lines/Lines";
import { gameActions } from "../../../../store/gameSlicer";
import getWebSocket from "../../../../web-socket/ws";

export default function Grid() {
  const dispatch = useDispatch();

  const grid = useSelector((state) => state.game.game.grid);
  const curMove = useSelector((state) => state.game.game.curMove);
  const timeLimit = useSelector((state) => state.game.game.timeLimit);
  const player1Move = useSelector((state) => state.game.player1Move);

  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  // Select random grid box as a robot player
  useEffect(() => {
    if (timeLimit) return;

    const gridIdx = grid.reduce((acc, val, idx) => {
      if (!val) acc.push(idx);
      return acc;
    }, []);

    if (gridIdx.length === 0) {
      console.log("handle tie game or win");
    } else {
      if (player1Move !== curMove && isConnectedServer) {
        // Potentially display error message that user skipped a turn
        // Don't handle anything if it isn't your move and you are connected
        // Wait for user response
      } else {
        const randomIdx = gridIdx[Math.floor(Math.random() * gridIdx.length)];
        dispatch(gameActions.updateClientGame(randomIdx));

        if (isConnectedServer) {
          getWebSocket().send(
            JSON.stringify({ action: "skip-turn", data: { randomIdx } })
          );
          console.log("handle skip turn random on server");
        }
      }
    }
  }, [timeLimit]);

  return (
    <>
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
    </>
  );
}
