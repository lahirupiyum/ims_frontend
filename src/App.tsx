import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import GlobalScrollbarStyles from "./assets/style/globalScrollBarStyles";
import lightTheme from "./assets/theme/light";
import router from "./route";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <GlobalScrollbarStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
