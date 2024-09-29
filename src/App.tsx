import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import lightTheme from "./assets/theme/light";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { inventory } from "./redux/slices/sidenavSlice";
import router from "./route";
import Sidenav from "./screens/sidenav/Sidenav";

function App() {
  const sidenavState = useAppSelector((state) => state.sidenav);
  console.log("side nav", sidenavState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(inventory());
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Sidenav />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
