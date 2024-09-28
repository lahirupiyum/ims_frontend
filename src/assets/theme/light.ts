import { createTheme, PaletteColorOptions, TypeText } from "@mui/material";

const primary: PaletteColorOptions = {
  light: "#002461",
  main: "#003083",
  dark: "",
};

const secondary: PaletteColorOptions = {
  main: "#EC9B31",
};

const text: Partial<TypeText> = {
  primary: "#000",
  secondary: "#4D4D4D",
};

const lightTheme = createTheme({
  palette: {
    background: {
      default: 'url("assets//images/background.jpg")',
    },
    primary,
    secondary,
    text,
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default lightTheme;
