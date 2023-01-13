import { useLocation } from "react-router-dom";
import styles from "./Details.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Details = () => {
  const location = useLocation();
  const games = location.state.games;
  const details = location.state.details;

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
      <h2 className={styles.title}>{games.name}</h2>
      <div className={styles.body}>
        <div className={styles.screenshots}>
          <Slider {...settings}>
            {games.short_screenshots.map((screenshots) => (
              <img key={screenshots.id} src={screenshots.image} alt="" />
            ))}
          </Slider>
        </div>
        <div className={styles.details}>
          <span>{details}</span>
          <p />
          <span>rating : {games.rating}</span>
          <br />
          <span>metacritic : {games.metacritic}</span>
          <br />
          <span>genres : {games.genres.map((genres) => genres.name)}</span>
        </div>
      </div>
      <div className={styles.review}></div>
    </div>
  );
};

export default Details;
