import { useEffect, useState } from "react";
import styles from "./Game.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Game = ({ games }) => {
  const key = "bd1a96395fad40d3a2337b3ff3c01116";

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
        <div>loding</div>
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {games.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {details && details.length > 100
            ? `${details.slice(0, 100)}...`
            : details}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Game;
