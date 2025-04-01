import "./index.css";
import Game from "./Game/Game";
import AudioAndTitle from "./AudioAndTitle/AudioAndTitle";
import CanvasLight from "./CanvasLight/CanvasLight";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer";
import { lobbyID } from "../web-socket/ws";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (lobbyID) {
      dispatch(uiActions.isJoiningLobby(true));
    }
  }, []);
  return (
    <>
      <CanvasLight />
      <AudioAndTitle />
      <div className="letter letter-0">X</div>
      <div className="letter letter-1">O</div>
      <div className="letter letter-2">X</div>
      <div className="letter letter-3">O</div>
      <Game />
    </>
  );
}
