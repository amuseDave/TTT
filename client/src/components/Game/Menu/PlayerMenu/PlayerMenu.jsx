import ArrowUpDownComp from "./ArrowUpDownComp";
import Player1 from "./Player1";
import Player2 from "./Player2";
import "./PlayerMenu.css";
import { useSelector } from "react-redux";

export default function PlayerMenu() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  return (
    <div className="player-menu">
      <Player1 />
      {isConnectedServer && (
        <>
          <ArrowUpDownComp />
          <Player2 />
        </>
      )}
    </div>
  );
}
