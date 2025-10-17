import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

class OrdersController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const { tables_sessions_id } = req.params;

            const order = await knex("orders")
                .select(
                    "orders.id",
                    "orders.tables_sessions_id",
                    "orders.product_id",
                    "products.name",
                    "orders.price",
                    "orders.quantity",
                    knex.raw("(orders.price * orders.quantity) as total"),
                    "orders.created_at",
                    "orders.updated_at"
                )
                .join("products", "products.id", "orders.product_id")
                .where({ tables_sessions_id })
                .orderBy("orders.created_at", "desc");

            return res.json(order);
        } catch (error) {
            return next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                tables_sessions_id: z.number(),
                product_id: z.number(),
                quantity: z.number(),
            });

            const { tables_sessions_id, product_id, quantity } =
                bodySchema.parse(req.body);

            const sessions = await knex<TablesSessionsRepository>(
                "tables_sessions"
            )
                .where({ id: tables_sessions_id })
                .first();

            if (!sessions) {
                throw new AppError("Session not found");
            }

            if (sessions.closed_at) {
                throw new AppError("This table is closed");
            }

            const product = await knex<ProductRepository>("products")
                .where({
                    id: product_id,
                })
                .first();

            if (!product) {
                throw new AppError("Product not found");
            }

            await knex<OrdersRepository>("orders").insert({
                tables_sessions_id,
                product_id,
                quantity,
                price: product.price,
            });

            return res.json();
        } catch (error) {
            return next(error);
        }
    }
}

export { OrdersController };
