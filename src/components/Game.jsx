const Game = ({ games }) => {
  return (
    <div>
      <div>
        <h2>{games.map((name) => name.name)}</h2>
      </div>
    </div>
  );
};

export default Game;
