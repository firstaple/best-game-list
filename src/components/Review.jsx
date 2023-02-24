import styles from "./Review.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";

const Review = ({ review, games, dataDelete, dataReading }) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState();
  const [selectedReview, setSelectedReview] = useState(null);

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
    if (selectedReview && selectedReview.data().password === password) {
      dataDelete(selectedReview.id);
    }
    dataReading();
  };

  const handleOpen = () => {
    setOpen(true);
    setSelectedReview(review);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            비밀번호를 확인해주세요
            <form onSubmit={passPassword}>
              <input
                type="password"
                autoFocus={true}
                onChange={confirmPassword}
              />
            </form>
          </div>
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
