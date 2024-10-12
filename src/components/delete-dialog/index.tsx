import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ContainedButton from "../buttons/ContainedButton";
import { fontSizes, fontWeights } from "../typography/CustomTypography";

type PropTypes = {
  open: boolean;
  deleteFunction: () => void;
  handleClose: () => void;
  name: string;
};

const DeleteDialog = ({ open, deleteFunction, handleClose, name }: PropTypes) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialogTitle-root": {
          pt: 3,
        },
        "& .MuiDialogContent-root": {
          pl: 3,
        },
        "& .MuiDialogActions-root": {
          padding: 2,
          pb:3
        },
      }}
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{ fontWeight: 800 }}
      >
        {`DELETE ${name.toUpperCase()}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{`Are you sure you want to delete this ${name.toLowerCase()}? This will permanently erase all related data and cannot be undone.`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogBoxButton handleClick={deleteFunction} name="Delete" isPrimary />
        <DialogBoxButton handleClick={handleClose} name="Cancel" isPrimary={false} />
      </DialogActions>
    </Dialog>
  );
};

type DialogBoxButtonProps = {
  handleClick: () => void;
  name: string;
  isPrimary: boolean;
};

const DialogBoxButton = ({
  handleClick,
  name,
  isPrimary,
}: DialogBoxButtonProps) => {
  return (
    <ContainedButton
      sx={{
        bgcolor: isPrimary? "darkred": "white",
        color: isPrimary? "white" : "rgb(100,100,100)",
        textTransform: "uppercase",
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.xl,
        width:"90px",
      }}
      onClick={handleClick}
    >
      {name}
    </ContainedButton>
  );
};

export default DeleteDialog;
