import styles from "./Game.module.css";

const Game = ({ games }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Title: {games.name}</h2>
      <div className={styles.flex_box}>
        <div className={styles.img_container}>
          <img className={styles.img} src={games.background_image} alt="" />
        </div>
        <div className={styles.flex_direction}>
          <span>rating: {games.rating}</span>
          <span>metacritic: {games.metacritic}</span>
          {games.platforms.map((platforms) => (
            <span key={platforms.platform.id}>{platforms.platform.name}</span>
          ))}
          {games.genres.map((genres) => (
            <span key={genres.id}> {genres.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
