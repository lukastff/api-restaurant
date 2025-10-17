import { OrdersController } from "@/controllers/ordersController";
import { Router } from "express";

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.get("/table-session/:tables_sessions_id", ordersController.index);
ordersRoutes.get(
    "/table-session/:tables_sessions_id/total",
    ordersController.show
);
ordersRoutes.post("/", ordersController.create);

export { ordersRoutes };
