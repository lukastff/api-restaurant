import { Router } from "express";
import { ProductController } from "../controllers/productsController";

const productsRoutes = Router();
const productController = new ProductController();

productsRoutes.get("/", productController.index);

export { productsRoutes };
