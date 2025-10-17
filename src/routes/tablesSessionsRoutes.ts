import { Router } from "express";
import { TablesSessionsController } from "@/controllers/tablesSessionsController";

const tablesSessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

tablesSessionsRoutes.post("/", tablesSessionsController.create);

export { tablesSessionsRoutes };
