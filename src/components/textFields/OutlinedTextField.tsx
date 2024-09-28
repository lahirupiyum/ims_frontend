import { styled, TextField } from "@mui/material";

const OutlinedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderWidth: "1px",
    fontSize: "14px",
    borderRadius: "10px",
    borderColor: "lightgray",
    "& fieldset": {
      borderColor: "lightgray",
      transition: "border-color 0.35s",
    },
    "&:hover fieldset": {
      borderColor: "#888888",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& input": {
    padding: "12px",
  },
}));

export default OutlinedTextField;
