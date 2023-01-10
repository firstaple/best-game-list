import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
    <Card>
      {games.background_image ? (
        <CardMedia sx={{ height: 250 }} image={games.background_image} />
      ) : (
        ""
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
