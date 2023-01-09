import { useEffect, useState } from "react";
import Game from "./Game";

const GameListApi = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [api] = useState(
    "https://api.rawg.io/api/games?key=bd1a96395fad40d3a2337b3ff3c01116&metacritic=80,100&page_size=40&"
  );
  const [nextApi, setNextApi] = useState();
  const [preApi, setPreApi] = useState();
  const [search, setSearch] = useState();

  const getGame = async (api) => {
    const json = await (
      await fetch(`
      ${api}
      `)
    ).json();
    setNextApi(json.next);
    setPreApi(json.previous);
    setGames(json.results);
    setLoading(false);
  };
  useEffect(() => {
    getGame(api);
  }, []);

  const previous = () => {
    setLoading(true);
    getGame(preApi);
  };

  const next = () => {
    setLoading(true);
    getGame(nextApi);
  };

  const searchBar = (e) => {
    setSearch(e.target.value);
  };

  const findGame = games.filter((title) =>
    title.name.includes(search) ? title.name : ""
  );

  return (
    <>
      {nextApi === null ? (
        <button onClick={previous}>previous</button>
      ) : preApi === null ? (
        <button onClick={next}>next</button>
      ) : (
        <div>
          <button onClick={previous}>previous</button>
          <button onClick={next}>next</button>
        </div>
      )}

      {loading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <input type="text" value={search || ""} onChange={searchBar} />
          {search
            ? findGame.map((games) => (
                <div key={games.id}>
                  <Game games={games} />
                </div>
              ))
            : games.map((games) => (
                <div key={games.id}>
                  <Game games={games} />
                </div>
              ))}
        </div>
      )}
    </>
  );
};

export default GameListApi;
