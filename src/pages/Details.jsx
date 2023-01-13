import { useLocation } from "react-router-dom";
import styles from "./Details.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";

const Details = () => {
  const location = useLocation();
  const games = location.state.games;
  const details = location.state.details;

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCZoBoCfqS-i7nzXpAWZB1weQVTlmXgzk0",
    authDomain: "best-game-list.firebaseapp.com",
    projectId: "best-game-list",
    storageBucket: "best-game-list.appspot.com",
    messagingSenderId: "978905779954",
    appId: "1:978905779954:web:8451142a2fb600c98d0a6b",
    measurementId: "G-M1KL12KX1B",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://best-game-list-default-rtdb.firebaseio.com",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);

  // firebase real time database write
  function writeGameData() {
    const db = getDatabase();
    set(ref(db, "game/" + games.id), {
      games: games.name,
      details: details,
    });
  }

  // firebase real time database read(value)
  const db = getDatabase();
  const id = ref(db, "game/" + games.id);
  onValue(id, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });

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
