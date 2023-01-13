import { Route, Routes } from "react-router-dom";
import "./App.css";
import Details from "./pages/Details";
import Home from "./pages/Home";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getDatabase, ref, set } from "firebase/database";
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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const database = getDatabase();

async function getCities(db) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

console.log(writeUserData());

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
