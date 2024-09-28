import { Button, styled } from "@mui/material";

const ContainedButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  borderRadius: "10px",
  padding: "10px 20px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  fontWeight: 500,
  textAlign: "center",
}));

export default ContainedButton;
