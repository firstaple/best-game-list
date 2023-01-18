import { useLocation } from "react-router-dom";
import styles from "./Details.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { useState } from "react";
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
  const [submitReview, setSubmitReview] = useState([]);

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
    setSubmitReview(submitReview.concat(review));
    dataWrite();
    setReview("");
  };

  const deleteBtn = (index) => {
    setSubmitReview((curToDos) =>
      curToDos.filter((_, curIndex) => curIndex !== index)
    );
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // const gameReview = doc(db, "users");

  const dataWrite = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        review: review,
        rating: games.rating,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const dataReading = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  console.log(dataReading());

  // const dataDelete = async () => {
  //   await updateDoc(gameReview, {
  //     review: deleteField(),
  //   });
  // };

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.title}>{games.name}</h2>
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
      </div> */}
      <div className={styles.review}>
        <form action="" onSubmit={reviewSubmit}>
          <input type="text" onChange={addReview} value={review || ""} />
        </form>
        {submitReview.map((review, index) => (
          <li key={index}>
            {review}
            <button
              onClick={() => {
                deleteBtn(index);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Details;
