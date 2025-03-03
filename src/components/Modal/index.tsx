import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const CommonModal: React.FC<CommonModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {title && <Typography variant="h6" mb={2}>{title}</Typography>}
        {children}
        <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">Close</Button>
      </Box>
    </Modal>
  );
};

export default CommonModal;
