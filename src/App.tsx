import "./App.css";
import Login from "./screens/login/Login";
import lightTheme from "./assets/theme/light";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div>
        <Login />
      </div>
    </ThemeProvider>
  );
}

export default App;
