const Game = ({ games }) => {
  return (
    <div>
      <div>
        <h2>{games.name}</h2>
        <img
          src={games.background_image}
          alt=""
          style={{ width: "300px", height: " 150px" }}
        />
      </div>
    </div>
  );
};

export default Game;
