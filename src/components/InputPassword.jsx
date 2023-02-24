import { Box, Modal } from "@mui/material";

const InputPassword = ({
  dataWrite,
  open,
  setPassword,
  setOpen,
  setReview,
  dataReading,
}) => {
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

  const handleClose = () => {
    setOpen(false);
  };

  const addPassword = (e) => {
    setPassword(e.target.value);
  };

  const passPassword = () => {
    handleClose();
    dataWrite();
    setReview("");
    dataReading();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          후기 삭제시 사용할 비밀번호를 입력해주세요
          <form onSubmit={passPassword}>
            <input type="password" autoFocus={true} onChange={addPassword} />
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default InputPassword;
