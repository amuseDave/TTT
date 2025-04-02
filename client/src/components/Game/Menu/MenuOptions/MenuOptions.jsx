import { useSelector } from "react-redux";
import "./MenuOptions.css";

export default function MenuOptions() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  const isAdmin = useSelector((state) => state.game.isAdmin);
  const player2 = useSelector((state) => state.game.player2);

  function joinRandomLobby() {
    console.log("Join random lobby");
  }

  function startGame() {
    if (!isConnectedServer) {
      console.log("start game on the client");
      return;
    }

    console.log(isAdmin, player2);
  }

  return (
    <div className="menu-options">
      <button onClick={startGame}>Start</button>
      {isConnectedServer && <button>Join</button>}
    </div>
  );
}
