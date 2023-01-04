import { useEffect, useState } from "react";
import Game from "./Game";

const GameListApi = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const getGame = async () => {
    const json = await (
      await fetch(`
      https://api.rawg.io/api/platforms?key=bd1a96395fad40d3a2337b3ff3c01116
      `)
    ).json();
    setGames(json.results);
    setLoading(false);
  };
  useEffect(() => {
    getGame();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          {games.map((game) => (
            <Game games={game.games} />
          ))}
        </div>
      )}
    </>
  );
};

export default GameListApi;
