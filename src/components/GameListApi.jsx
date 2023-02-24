import { useEffect, useState } from "react";
import Game from "./Game";
import styles from "./Game.module.css";

const GameListApi = () => {
  const key = process.env.REACT_APP_GAME_API_KEY;

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [nextApi, setNextApi] = useState();
  const [search, setSearch] = useState();
  const [nextGame, setNextGame] = useState([]);

  const handleScroll = () => {
    const doc = document.documentElement;
    const scrollHeight = doc.scrollHeight;
    const scrollTop = doc.scrollTop;
    const clientHeight = doc.clientHeight;
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
        `https://api.rawg.io/api/games?metacritic=80,100&platdorms=4&page_size=9&key=${key}`
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

  const onSubmit = (e) => {
    e.preventDefault();
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

  const searchBar = (e) => {
    setSearch(e.target.value);
    // e.preventDefault();
    // const findGame = async () => {
    //   const json = await (
    //     await fetch(
    //       `https://api.rawg.io/api/games?metacritic=80,100&ordering=-rating&platdorms=4&search=${search}&key=${key}`
    //     )
    //   ).json();
    //   setGames(json.results);
    //   setLoading(false);
    // };
    // findGame();
  };

  return (
    <>
      {loading ? (
        <span className={styles.loading}>Loading...</span>
      ) : (
        <div>
          <form onSubmit={onSubmit}>
            <input
              className={styles.searchBar}
              type="text"
              value={search || ""}
              onChange={searchBar}
            />
          </form>
          <div className={styles.game}>
            {games.map((games) => (
              <div key={games.id}>
                <Game games={games} />
              </div>
            ))}
          </div>
        </div>
      )}
      {nextGame && !search ? (
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
