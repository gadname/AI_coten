import { useState, FC } from 'react';
import { Typography, Modal, Box } from "@mui/material";
import Image from "next/image";

export const ImageWrapper: FC<{ src: string | null }> = ({ src }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="h-auto max-h-[240px]  w-full flex justify-center items-center">
      {src ? (
        <div onClick={handleOpen}>
          <Image src={src} alt={"generated image"} width={240} height={240} />
        </div>
      ) : (
        <Typography level="body-md">
          Type something in the box to generate an image.
        </Typography>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={modalStyle}>
          
          <p id="simple-modal-description">
            <Image src={src} alt={"generated image"} width={500} height={500} />
          </p>
        </Box>
      </Modal>
    </div>
  );
};
