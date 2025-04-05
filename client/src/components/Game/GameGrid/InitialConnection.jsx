import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/uiSlicer";
import getWebSocket from "../../../web-socket/ws";

export default function InitialConnection() {
  const dispatch = useDispatch();
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  useEffect(() => {
    const { readyState, CLOSED } = getWebSocket();

    if (isConnectedServer && readyState === CLOSED)
      dispatch(uiActions.isConnectedServer(false));
  }, []);

  return <></>;
}
