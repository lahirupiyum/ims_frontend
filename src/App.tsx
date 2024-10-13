import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import GlobalScrollbarStyles from "./assets/style/globalScrollBarStyles";
import lightTheme from "./assets/theme/light";
import SnackBarManager from "./components/snackbar-manager/SnackBarManager";
import router from "./route";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <GlobalScrollbarStyles />
      <RouterProvider router={router} />
      <SnackbarProvider maxSnack={4}>
        <SnackBarManager />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
