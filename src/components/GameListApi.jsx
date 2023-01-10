import { useEffect, useState } from "react";
import Game from "./Game";
import styles from "./Game.module.css";

const GameListApi = () => {
  const key = "2c0c9f06996a4376b75df0eaae860863";

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [nextApi, setNextApi] = useState();
  const [search, setSearch] = useState();
  const [nextGame, setNextGame] = useState([]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      getNextGame();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const getGame = async () => {
    const json = await (
      await fetch(
        `https://api.rawg.io/api/games?metacritic=80,100&ordering=-rating&platdorms=4&page_size=9&key=${key}`
      )
    ).json();
    setNextApi(json.next);
    setGames(json.results);
    setLoading(false);
  };

  useEffect(() => {
    getGame();
  }, []);

  const getNextGame = async () => {
    const json = await (await fetch(`${nextApi}`)).json();
    setNextApi(json.next);
    setNextGame(nextGame.concat(json.results));
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

  return (
    <>
      {loading ? (
        <span className={styles.loading}>Loading...</span>
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
      {nextGame ? (
        <div className={styles.game}>
          {nextGame.map((games) => (
            <div key={games.id}>
              <Game games={games} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default GameListApi;
