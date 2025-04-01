import "./Connection.css";

import { useSelector } from "react-redux";

export default function Connection() {
  const isConnectingServer = useSelector((state) => state.ui.isConnectingServer);
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  return (
    <div className="connection">
      <p> Connection</p>
    </div>
  );
}
