import { useLocation } from "react-router-dom";
import styles from "./Details.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  deleteDoc,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Review from "../components/Review";
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const location = useLocation();
  const games = location.state.games;
  const details = location.state.details;
  const detailsCheck = details || [];

  const ITEMS_PER_PAGE = 800;

  const [review, setReview] = useState();
  const [dbReview, setDbReview] = useState([]);
  const [detailShow, setDetailShow] = useState(ITEMS_PER_PAGE);
  const [data] = useState(detailsCheck);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    handleOpen();
  };

  const addPassword = (e) => {
    setPassword(e.target.value);
  };

  const passPassword = () => {
    handleClose();
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
        password: password,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const dataReading = async () => {
    const filedReading = query(collection(db, "ID"), orderBy("timeStamp"));
    const querySnapshot = await getDocs(filedReading);
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

  const handleLoadMore = () => {
    setDetailShow((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  const handleLoadClose = () => {
    setDetailShow((prevCount) => prevCount - ITEMS_PER_PAGE);
  };

  return (
    <div className={styles.container}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            후기 삭제시 사용할 비밀번호를 입력해주세요
            <form onSubmit={passPassword}>
              <input type="password" autoFocus={true} onChange={addPassword} />
            </form>
          </div>
        </Box>
      </Modal>

      <div className={styles.body}>
        <h1 className={styles.title}>{games.name}</h1>
        <div className={styles.screenshots}>
          <Slider {...settings}>
            {games.short_screenshots.map((screenshots) => (
              <img key={screenshots.id} src={screenshots.image} alt="" />
            ))}
          </Slider>
        </div>
        <div className={styles.details}>
          <span> &nbsp;{detailsCheck?.slice(0, detailShow)}</span>
          {detailShow < data?.length && (
            <button
              onClick={handleLoadMore}
              style={{ border: "none", backgroundColor: "inherit" }}
            >
              ...더보기
            </button>
          )}
          {detailShow > ITEMS_PER_PAGE && (
            <button
              onClick={handleLoadClose}
              style={{ border: "none", backgroundColor: "inherit" }}
            >
              ...접기
            </button>
          )}
          <div className={styles.detailsEvaluation}>
            <span>rating : {games.rating}</span>
            <span>metacritic : {games.metacritic}</span>
            <span>genres : {games.genres.map((genres) => genres.name)}</span>
          </div>
        </div>
        <div className={styles.review}>
          <h5 className={styles.review_title}>Review</h5>
          {dbReview.map((review, index) => (
            <Review
              key={index}
              review={review}
              games={games}
              dataDelete={dataDelete}
              dataReading={dataReading}
            />
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
