import { useState } from "react";
import GameListApi from "../components/GameListApi";

const Home = () => {
  const [rating, setRating] = useState();

  const changeRating = (e) => {
    setRating(e.target.value);
  };
  return (
    <div>
      <form action="">
        <select onChange={changeRating}>
          <option value={rating <= 2}>2점 이하</option>
          <option value={2 < rating <= 3}>3점 이하</option>
          <option value={3 < rating <= 4}>4점 이하</option>
          <option value={4 < rating <= 5}>5점 이하</option>
        </select>

        <button>검색하기</button>
      </form>
      <GameListApi />
    </div>
  );
};

export default Home;
