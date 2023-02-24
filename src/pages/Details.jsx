import { useLocation } from "react-router-dom";
import styles from "../css/Details.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../firebase/Firebase";

// Import the functions you need from the SDKs you need
import { deleteDoc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Review from "../components/Review";
import InputPassword from "../components/InputPassword";
import Screenshots from "../components/Screenshots";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const Details = () => {
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

  const addReview = (e) => {
    setReview(e.target.value);
  };

  const reviewSubmit = (e) => {
    e.preventDefault();
    handleOpen();
  };

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

  const dataDelete = async (reivew) => {
    await deleteDoc(doc(db, "ID", reivew));
  };

  useEffect(() => {
    dataReading();
  }, []);

  const handleLoadMore = () => {
    setDetailShow((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  const handleLoadClose = () => {
    setDetailShow((prevCount) => prevCount - ITEMS_PER_PAGE);
  };

  return (
    <div className={styles.container}>
      <InputPassword
        open={open}
        dataWrite={dataWrite}
        setPassword={setPassword}
        setOpen={setOpen}
        setReview={setReview}
        dataReading={dataReading}
      />
      <div className={styles.body}>
        <h1 className={styles.title}>{games.name}</h1>
        <Screenshots games={games} />
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
