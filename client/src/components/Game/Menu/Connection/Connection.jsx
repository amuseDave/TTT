import { useEffect, useRef } from "react";
import "./Connection.css";

import { useSelector } from "react-redux";
import { reconnectWebSocket } from "../../../../web-socket/ws";

export default function Connection() {
  const intervalID = useRef();

  const isConnectingServer = useSelector((state) => state.ui.isConnectingServer);
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  // Handle auto reconnections in menu component
  useEffect(() => {
    if (isConnectedServer) return;
    intervalID.current = setInterval(() => {
      if (isConnectingServer) return;
      if (isConnectedServer) {
        clearInterval(intervalID.current);
        return;
      } else reconnectWebSocket();
    }, 10000);

    return () => {
      clearInterval(intervalID.current);
    };
  }, [isConnectedServer]);

  return (
    <div className="connection">
      <p> Display connection state here...</p>
    </div>
  );
}
