import { useLocation } from "react-router-dom";
import styles from "./Details.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { deleteDoc, getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const Details = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAk4QCMG3Ai_Y2mL6y8cSaSv3e6K3XBnP4",
    authDomain: "best-game-list-193cd.firebaseapp.com",
    projectId: "best-game-list-193cd",
    storageBucket: "best-game-list-193cd.appspot.com",
    messagingSenderId: "745702572321",
    appId: "1:745702572321:web:9310249593f392c114be60",
  };

  const location = useLocation();
  const games = location.state.games;
  const details = location.state.details;

  const [review, setReview] = useState();
  const [dbReview, setDbReview] = useState([]);

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

  const addReview = (e) => {
    setReview(e.target.value);
  };

  const reviewSubmit = (e) => {
    e.preventDefault();
    dataWrite();
    setReview("");
    dataReading();
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const dataWrite = async () => {
    try {
      const docRef = await addDoc(collection(db, "ID"), {
        review: review,
        games: games.id,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const dataReading = async () => {
    const querySnapshot = await getDocs(collection(db, "ID"));
    let array = [];
    querySnapshot.forEach((doc) => {
      array.push(doc);
    });
    setDbReview(array);
  };

  useEffect(() => {
    dataReading();
  }, []);

  const dataDelete = async (reivew) => {
    await deleteDoc(doc(db, "ID", reivew));
  };

  const onClick = (reivew) => {
    dataDelete(reivew);
    dataReading();
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <h2 className={styles.title}>{games.name}</h2>
        <div className={styles.screenshots}>
          <Slider {...settings}>
            {games.short_screenshots.map((screenshots) => (
              <img key={screenshots.id} src={screenshots.image} alt="" />
            ))}
          </Slider>
        </div>
        <div className={styles.details}>
          <span>
            {details && details.length > 800
              ? `${details.slice(0, 800)}`
              : details}
          </span>
          <button style={{ border: "none", backgroundColor: "inherit" }}>
            ...더보기
          </button>
          <p />
          <span>rating : {games.rating}</span>
          <br />
          <span>metacritic : {games.metacritic}</span>
          <br />
          <span>genres : {games.genres.map((genres) => genres.name)}</span>
        </div>
        <div className={styles.review}>
          <h5 className={styles.review_title}>Review</h5>
          {dbReview.map((review, index) => (
            <div key={index}>
              {review.data().games === games.id ? (
                <div>
                  {review.data().review}
                  <button
                    className={styles.review_delete_btn}
                    onClick={() => {
                      onClick(review.id);
                    }}
                  >
                    X
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
          <form className={styles.review_box} action="" onSubmit={reviewSubmit}>
            <input
              type="text"
              placeholder="Enter..."
              onChange={addReview}
              value={review || ""}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Details;
