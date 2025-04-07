import ArrowUpDownComp from "./ArrowUpDownComp";
import Player1 from "./Player1";
import Player2 from "./Player2";
import "./PlayerMenu.css";
import { useSelector } from "react-redux";

export default function PlayerMenu() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  const isStartingSolo = useSelector((state) => state.ui.isStartingSolo);

  return (
    <div
      className={`player-menu ${
        isConnectedServer || isStartingSolo ? "extra-margin" : ""
      }`}
    >
      <Player1 />
      {(isConnectedServer || isStartingSolo) && (
        <>
          <ArrowUpDownComp />
          <Player2 />
        </>
      )}
    </div>
  );
}
