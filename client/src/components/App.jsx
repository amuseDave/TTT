import "./index.css";
import Game from "./Game/Game";
import AudioAndTitle from "./Static/AudioAndTitle/AudioAndTitle";
import CanvasLight from "./Static/CanvasLight/CanvasLight";

export default function App() {
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
