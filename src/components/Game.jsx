import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import styles from "./Game.module.css";

const Game = ({ games }) => {
  const key = "2c0c9f06996a4376b75df0eaae860863";

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
      {games.background_image ? (
        <CardMedia sx={{ height: 250 }} image={games.background_image} />
      ) : (
        ""
      )}
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
    </Card>
  );
};

export default Game;
