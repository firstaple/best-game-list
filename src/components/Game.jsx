const Game = ({ games }) => {
  return (
    <div>
      <h2>Title: {games.name}</h2>
      <img
        src={games.background_image}
        alt=""
        style={{ width: "300px", height: " 150px" }}
      />
      <p>rating: {games.rating}</p>
      <p>metacritic: {games.metacritic}</p>
      {games.platforms.map((platforms) => (
        <p key={platforms.platform.id}>platforms: {platforms.platform.name}</p>
      ))}
      {games.genres.map((genres) => (
        <p key={genres.id}>genres: {genres.name}</p>
      ))}
    </div>
  );
};

export default Game;
