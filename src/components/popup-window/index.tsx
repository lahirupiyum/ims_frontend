import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const PopupWindow: React.FC<{ title: string, maxWidth:number, maxHeight:number }> = ({ title, maxHeight, maxWidth }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) return null;
  else
    return (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          position: "fixed",
          right: "0",
          top: "0",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "20",
        }}
        onClick={handleClose}
      >
        <div
          style={{
            maxWidth,
            maxHeight,
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px 10px rgba(0,0,0,0.2)",
            padding: "0 20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap:"50px"
            }}
          >
            <h2>{title}</h2>
            <IconButton
              sx={{
                transition: "color 0.5s",
                ":hover": {
                  color: "black",
                },
              }}
              onClick={handleClose}
            >
              <IoMdCloseCircle fontSize={"30px"} />
            </IconButton>
          </Box>
        </div>
      </div>
    );
};

export default PopupWindow;
