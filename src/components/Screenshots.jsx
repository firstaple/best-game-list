import Slider from "react-slick";
import styles from "../css/Screenshots.module.css";

const Screenshots = ({ games }) => {
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
    <div className={styles.screenshots}>
      <Slider {...settings}>
        {games.short_screenshots.map((screenshots) => (
          <img key={screenshots.id} src={screenshots.image} alt="" />
        ))}
      </Slider>
    </div>
  );
};

export default Screenshots;
