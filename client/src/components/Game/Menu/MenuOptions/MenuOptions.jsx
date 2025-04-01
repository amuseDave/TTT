import { useSelector } from "react-redux";
import "./MenuOptions.css";

export default function MenuOptions() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  return (
    <div className="menu-options">
      <button>Start</button>
      {isConnectedServer && <button>Join</button>}
      Create design of menu options here...
    </div>
  );
}
