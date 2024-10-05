import { createBrowserRouter } from "react-router-dom";
import getRoutesConfig from "./config/routesConfig";

const router = createBrowserRouter(Object.values(getRoutesConfig()));

export default router;