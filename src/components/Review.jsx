import styles from "./Review.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";

const Review = ({ review, games, dataDelete, dataReading }) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState();

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

  const confirmPassword = (e) => {
    setPassword(e.target.value);
  };

  const passPassword = () => {
    handleClose();
    dataReading();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteBtn = (reivew) => {
    dataDelete(reivew);
    dataReading();
  };

  useEffect(() => {
    if (review.data().password === password) {
      deleteBtn(review.id);
    }
  }, [dataReading]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-lbelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            비밀번호를 확인해주세요
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={passPassword}>
              <input type="password" onChange={confirmPassword} />
            </form>
          </Typography>
        </Box>
      </Modal>
      {review.data().games === games.id ? (
        <div>
          {review.data().review}
          <button
            className={styles.review_delete_btn}
            onClick={() => {
              handleOpen();
            }}
          >
            X
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Review;
