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
  customActionName?:string
  customDescription?:string
  actionButtonColor?:string
};

const DeleteDialog = ({ open, deleteFunction, handleClose, name, customActionName, customDescription, actionButtonColor }: PropTypes) => {

  const deleteHandler = () => {
    deleteFunction();
    handleClose();
  }

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
        {`${customActionName?.toUpperCase() || "DELETE"} ${name.toUpperCase()}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontSize={fontSizes.sm}>{`Are you sure you want to ${customActionName?.toLocaleLowerCase() || "delete"} this ${name.toLowerCase()}? ${!customActionName ? "This will permanently erase all related data and cannot be undone." : customDescription || ""}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogBoxButton actionButtonColor={actionButtonColor} handleClick={deleteHandler} name={customActionName || "Delete"} isPrimary />
        <DialogBoxButton handleClick={handleClose} name="Cancel" isPrimary={false} />
      </DialogActions>
    </Dialog>
  );
};

type DialogBoxButtonProps = {
  handleClick: () => void;
  name: string;
  isPrimary: boolean;
  actionButtonColor?:string
};

const DialogBoxButton = ({
  handleClick,
  name,
  isPrimary,
  actionButtonColor
}: DialogBoxButtonProps) => {
  return (
    <ContainedButton
      sx={{
        bgcolor: isPrimary? actionButtonColor || "darkred": "white",
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
