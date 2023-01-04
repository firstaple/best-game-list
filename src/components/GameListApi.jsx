import { useEffect, useState } from "react";
import Game from "./Game";

const GameListApi = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [next, setNext] = useState();
  const getGame = async () => {
    const json = await (
      await fetch(`
      https://api.rawg.io/api/games?key=bd1a96395fad40d3a2337b3ff3c01116&dates=2019-09-01,2019-09-30&platforms=18,1,7
      `)
    ).json();
    setGames(json.results);
    setNext(json.next);
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
          {games.map((games) => (
            <div key={games.id}>
              <Game games={games} />
            </div>
          ))}
        </div>
      )}
      <a href={next}>next</a>
    </>
  );
};

export default GameListApi;
