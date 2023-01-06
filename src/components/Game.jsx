import styles from "./Game.module.css";

const Game = ({ games }) => {
  return (
    <div>
      {/* {findGame ? ( */}
      <div className={styles.container}>
        <h2 className={styles.title}>{games.name}</h2>
        <div className={styles.flex_box}>
          <div className={styles.img_container}>
            <img className={styles.img} src={games.background_image} alt="" />
          </div>
          <div className={styles.flex_direction}>
            <div className={styles.flex_content}>
              <h3>평가 : </h3>
              <span>rating: {games.rating}</span>
              <span>metacritic: {games.metacritic}</span>
            </div>
            <div className={styles.flex_content}>
              <h3>플랫폼 : </h3>
              {games.platforms.map((platforms) => (
                <span key={platforms.platform.id}>
                  {platforms.platform.name}
                </span>
              ))}
            </div>
            <div className={styles.flex_content}>
              <h3>장르 : </h3>
              {games.genres.map((genres) => (
                <span key={genres.id}> {genres.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        ""
      )} */}
    </div>
  );
};

export default Game;
