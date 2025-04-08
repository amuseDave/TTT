import "./Grid.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "./Box/Box";
import Lines from "./Lines/Lines";
import { gameActions } from "../../../../store/gameSlicer";
import { uiActions } from "../../../../store/uiSlicer";

import notAllowed from "../../../../assets/notAllowed.png";

export default function Grid() {
  const dispatch = useDispatch();

  const grid = useSelector((state) => state.game.game.grid);
  const curMove = useSelector((state) => state.game.game.curMove);
  const timeLimit = useSelector((state) => state.game.game.timeLimit);
  const player1Move = useSelector((state) => state.game.player1Move);
  const result = useSelector((state) => state.game.game.result);
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  // Select random grid box as a robot player
  useEffect(() => {
    if (timeLimit || isConnectedServer || result.state) return;

    const gridIdx = grid.reduce((acc, val, idx) => {
      if (!val) acc.push(idx);
      return acc;
    }, []);

    if (curMove === player1Move) {
      dispatch(
        uiActions.setGameAlert({
          type: "error",
          message: "Exceeded Time Limit - Selecting Random Move!",
        })
      );
    }
    const randomIdx = gridIdx[Math.floor(Math.random() * gridIdx.length)];
    dispatch(gameActions.updateClientGame(randomIdx));
  }, [timeLimit]);

  return (
    <>
      <div
        style={{
          cursor:
            player1Move !== curMove && !result.state ? `url(${notAllowed}), default` : "",
        }}
        className="grid"
      >
        <Lines result={result} />
        {grid.map((state, idx) => (
          <Box state={state} idx={idx} key={idx} />
        ))}
      </div>
    </>
  );
}
