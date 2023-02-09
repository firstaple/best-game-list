import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const PasswordModal = (props) => {
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

  const [password, setPassword] = useState();

  const passPassword = () => {
    props.addPassword(password);
    props.dataWrite();
    props.setReview("");
    props.dataReading();
    props.handleClose();
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-lbelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            후기 삭제시 사용할 비밀번호를 입력해주세요
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={passPassword}>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default PasswordModal;
