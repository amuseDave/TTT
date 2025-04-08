import Game from "./Game/Game";
import AudioAndTitle from "./Static/AudioAndTitle/AudioAndTitle";
import CanvasLight from "./Static/CanvasLight/CanvasLight";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer";

export default function App() {
  const dispatch = useDispatch();

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const lobbyID = params.get("lobbyID");

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
