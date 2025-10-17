import { Router } from "express";

import { productsRoutes } from "./productsRoutes";
import { tablesRoutes } from "./tablesRoutes";
import { tablesSessionsRoutes } from "./tablesSessionsRoutes";

const routes = Router();

routes.use("/products", productsRoutes);
routes.use("/tables", tablesRoutes);
routes.use("/tables-sessions", tablesSessionsRoutes);

export { routes };
