import { useLocation } from "react-router-dom";
import styles from "./Details.modules.css";

const Details = () => {
  const location = useLocation();
  const games = location.state.games;
  console.log(games.short_screenshots);

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        {games.short_screenshots.map((games) => (
          <img src={`${games.image}`} />
        ))}
      </div>
    </div>
  );
};

export default Details;
