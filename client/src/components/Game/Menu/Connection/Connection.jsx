import { useEffect, useRef } from "react";
import "./Connection.css";

import { useSelector } from "react-redux";
import { reconnectWebSocket } from "../../../../web-socket/ws";
import { animate } from "framer-motion";
import { playAudio } from "../../../../utils/utils";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";
import { Wifi, WifiOff } from "lucide-react";

export default function Connection() {
  const connectionElRef = useRef();
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

  useEffect(() => {
    animate(connectionElRef.current, { opacity: [1, 0.2, 1, 0.2, 1] }, { duration: 0.2 });
    playAudio(audioRef);
    setTimeout(() => {
      playAudio(audioRef, 0.6);
    }, 100);
  }, [isConnectingServer, isConnectedServer]);

  const className = isConnectingServer
    ? "connecting"
    : isConnectedServer
    ? "connected"
    : "error";

  const text = isConnectingServer
    ? "Establishing Connection"
    : isConnectedServer
    ? "Connection Established"
    : "No Server Connection";

  return (
    <div ref={connectionElRef} className={`connection ${className}`}>
      <div className="text-container">
        <p className={`${className} connection-text`}>{text}</p>
      </div>
      {isConnectingServer || isConnectedServer ? (
        <div className="svg-container">
          <Wifi className="svg" />
          <Wifi className="svg" />
        </div>
      ) : (
        <div className="svg-container">
          <WifiOff className="svg" />
          <WifiOff className="svg" />
        </div>
      )}
    </div>
  );
}
