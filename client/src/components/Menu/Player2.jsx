import { useSelector } from "react-redux";

export default function Player2() {
  const player1Move = useSelector((state) => state.game.player1Move);
  const player2 = useSelector((state) => state.game.player2);
  return (
    <div className="player-2">
      <p className="move">{player1Move === "X" ? "O" : "X"}</p>
      <p className={`${player2 ? player2 : "invite"}`}>{player2 ? player2 : "invite"}</p>
    </div>
  );
}
