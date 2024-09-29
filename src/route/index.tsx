import { createBrowserRouter } from "react-router-dom";
import routesConfig from "./routes";

const router = createBrowserRouter(Object.values(routesConfig));

export default router;