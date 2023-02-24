import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import styles from "../css/Game.module.css";
import { Link } from "react-router-dom";

const Game = ({ games }) => {
  const key = process.env.REACT_APP_GAME_API_KEY;

  const [details, setDetails] = useState();

  const getDetails = async () => {
    const json = await (
      await fetch(`https://api.rawg.io/api/games/${games.id}?key=${key}`)
    ).json();
    setDetails(json.description.replace(/<[^>]*>?/g, ""));
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Card sx={{ width: 550 }}>
      <Link
        to="/details"
        state={{
          details: details,
          games: games,
        }}
      >
        <CardMedia sx={{ height: 250 }} image={games.background_image} />
        <CardContent>
          <div className={styles.game_title}>
            <Typography gutterBottom variant="h5" component="div">
              {games.name}
            </Typography>
            <Rating
              name="half-rating-read"
              defaultValue={games.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <Typography variant="body2" color="text.secondary">
            {details && details.length > 100
              ? `${details.slice(0, 100)}...`
              : details}

            {/* metacritic : {games.metacritic} */}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default Game;
