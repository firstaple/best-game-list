import Slider from "react-slick";

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
    <Slider {...settings}>
      {games.short_screenshots.map((screenshots) => (
        <img key={screenshots.id} src={screenshots.image} alt="" />
      ))}
    </Slider>
  );
};

export default Screenshots;
