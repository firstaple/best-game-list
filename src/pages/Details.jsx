import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Details.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Details = () => {
  const location = useLocation();
  const games = location.state.games;
  const details = location.state.details;

  const navigate = useNavigate();

  navigate("/");
  navigate("/", { replace: true });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    autoplay: true,
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.title_area}>
          <h1 className={styles.title}>{games.name}</h1>
        </div>
        <div className={styles.body_area}>
          <div className={styles.slide_area}>
            <Slider {...settings}>
              {games.short_screenshots.map((screenshots) => (
                <div key={screenshots.id} className={styles.slide}>
                  <img src={screenshots.image} />
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.games_data}>
            <div className={styles.games_details}>&nbsp;{details}</div>
            <div className={styles.games_rating}>Rating : {games.rating}</div>
            <div className={styles.games_metactiric}>
              Metacritic : {games.metacritic}
            </div>
            <div className={styles.games_genres}>
              Genres : {games.genres.map((genres) => genres.name)}
            </div>
          </div>
        </div>
        <div className={styles.review_area}></div>
      </div>
    </div>
  );
};

export default Details;
