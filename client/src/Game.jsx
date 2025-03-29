export default function Game() {
  return (
    <div className="game-container">
      <div className="start-btn-container">
        <button
          onClick={() => {
            console.log("clicked");
          }}
          className="start-btn"
        >
          Play
        </button>
      </div>
    </div>
  );
}
