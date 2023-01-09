import { useEffect, useState } from "react";
import Game from "./Game";
import styles from "./Game.module.css";

const GameListApi = () => {
  const key = "bd1a96395fad40d3a2337b3ff3c01116";

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [api] = useState(
    `https://api.rawg.io/api/games?metacritic=80,100&ordering=-rating&platdorms=4&key=${key}`
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
    // getDetails();
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
    const findGame = async () => {
      const json = await (
        await fetch(
          `https://api.rawg.io/api/games?metacritic=80,100&ordering=-rating&platdorms=4&search=${search}&key=${key}`
        )
      ).json();
      setGames(json.results);
      setLoading(false);
    };
    findGame();
  };

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

          <div className={styles.game}>
            {games.map((games) => (
              <div key={games.id}>
                <Game games={games} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GameListApi;
