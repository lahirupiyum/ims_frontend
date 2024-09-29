import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import lightTheme from "./assets/theme/light";
import Home from "./screens/home/Home";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div>
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
