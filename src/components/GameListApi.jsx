import { useEffect, useState } from "react";
import Game from "./Game";
import styles from "./Game.module.css";

const GameListApi = () => {
  const key = "bd1a96395fad40d3a2337b3ff3c01116";

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [api, setApi] = useState(
    `https://api.rawg.io/api/games?metacritic=80,100&ordering=-rating&platdorms=4&page_size=39&key=${key}`
  );
  const [nextApi, setNextApi] = useState();
  const [search, setSearch] = useState();
  const [nextGame, setNextGame] = useState([]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      getNextGame(nextApi);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const getGame = async (api) => {
    const json = await (await fetch(api)).json();
    setNextApi(json.next);
    setGames(json.results);
    setLoading(false);
  };

  useEffect(() => {
    getGame(api);
  }, []);

  const getNextGame = async (nextApi) => {
    const json = await (await fetch(nextApi)).json();
    setNextGame(json.results.concat(nextGame));
    setLoading(false);
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

  console.log(nextGame);

  return (
    <>
      {loading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <input
            className={styles.searchBar}
            type="text"
            value={search || ""}
            onChange={searchBar}
          />

          <div className={styles.game}>
            {games.map((games) => (
              <div key={games.id}>
                <Game games={games} />
              </div>
            ))}
          </div>
        </div>
      )}
      {loading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          {nextGame.map((games) => {
            <div key={games.id}>
              <Game games={games} />
            </div>;
          })}
        </div>
      )}
    </>
  );
};

export default GameListApi;
