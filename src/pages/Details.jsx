import { useLocation } from "react-router-dom";
import styles from "../css/Details.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../firebase/Firebase";
import { deleteDoc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Review from "../components/Review";
import InputPassword from "../components/InputPassword";
import Screenshots from "../components/Screenshots";
import Supplement from "../components/Supplement";

const Details = () => {
  const location = useLocation();
  const games = location.state.games;
  const details = location.state.details;

  const [review, setReview] = useState();
  const [dbReview, setDbReview] = useState([]);
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

  console.log(games.stores.filter((a) => a.store.name));

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
      <div className={styles.gridBox}>
        <div className={styles.titleBox}>
          <div className={styles.title}>
            <h1>{games.name}</h1>
          </div>
        </div>
        <div className={styles.screenshotsBox}>
          <div className={styles.screenshots}>
            <Screenshots games={games} />
          </div>
        </div>
        <div className={styles.evaluationBox}>
          <div className={styles.evaluation}>
            <h2>Evaluation</h2>
            <span>rating : {games.rating}</span>
            <span>metacritic : {games.metacritic}</span>
            <span>genres : {games.genres.map((genres) => genres.name)}</span>
          </div>
          <div className={styles.stores}>
            <h2>Stores</h2>
            {games.stores.map((a) => (
              <span>{a.store.name}</span>
            ))}
          </div>
        </div>
        <div className={styles.detailsReivewBox}>
          <div className={styles.details}>
            <h2>Details</h2>
            <Supplement details={details} />
          </div>
          <div className={styles.review}>
            <div className={styles.reviewTitle}>
              <h2>Review</h2>
            </div>
            {dbReview.map((review, index) => (
              <Review
                key={index}
                review={review}
                games={games}
                dataDelete={dataDelete}
                dataReading={dataReading}
              />
            ))}
          </div>
          <form className={styles.reviewInput} onSubmit={reviewSubmit}>
            <input
              type="text"
              required
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
