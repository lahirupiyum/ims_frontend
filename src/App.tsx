import "./App.css";
import Login from "./screens/login/Login";
import lightTheme from "./assets/theme/light";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./screens/dashboard/Dashboard";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div>
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
