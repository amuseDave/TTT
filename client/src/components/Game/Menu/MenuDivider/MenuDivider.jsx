import { useSelector } from "react-redux";
import "./MenuDivider.css";

export default function MenuDivider() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  console.log(isConnectedServer);

  return (
    <div className="menu-divider">
      <div className={`divider ${isConnectedServer ? "duo" : "solo"}`}></div>
      <div className={`divider ${isConnectedServer ? "duo" : "solo"}`}></div>
    </div>
  );
}
