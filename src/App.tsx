import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import lightTheme from "./assets/theme/light";
import Home from "./screens/home/Home";
import Sidenav from "./screens/sidenav/Sidenav";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { inventory } from "./redux/slices/sidenavSlice";

function App() {
  const sidenavState = useAppSelector(state => state.sidenav);
  console.log("side nav", sidenavState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(inventory());
  },[]);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div>
        <Sidenav />
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
