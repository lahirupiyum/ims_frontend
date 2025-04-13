import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import ContainedButton from "../buttons/ContainedButton";
import CustomTypography, {
  fontSizes,
  fontWeights,
} from "../typography/CustomTypography";

type PopupDialogProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children?: ReactNode | null;
  width: number;
  loading: boolean;
  onClick: () => void;
};

const PopupDialog = ({
  open,
  handleClose,
  title,
  children,
  width,
  loading,
  onClick,
}: PopupDialogProps) => {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper":{
          maxWidth:"100%",
        },
        "& .MuiDialogContent-root": {
          width,
          padding: 2,
        },
        "& .MuiDialogActions-root": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        },
      }}
      open={open}
    >
      <DialogTitle>
        <CustomTypography fontSize={fontSizes.xl} fontWeight={fontWeights.xl}>
          {title}
        </CustomTypography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <IoClose />
      </IconButton>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <ContainedButton
          fullWidth
          sx={{
            fontSize: fontSizes.xs,
            fontWeight: fontWeights.md,
            textTransform: "uppercase",
          }}
          autoFocus
          onClick={onClick}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "SUBMIT"}
        </ContainedButton>
      </DialogActions>
    </Dialog>
  );
};

export default PopupDialog;
