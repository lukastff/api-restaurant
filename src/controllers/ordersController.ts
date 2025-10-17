import { Request, Response, NextFunction } from "express";
import { z } from "zod";

class OrdersController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json();
        } catch (error) {
            return next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                tables_sessions_id: z.number(),
                products_id: z.number(),
                quantity: z.number(),
            });

            const { tables_sessions_id, products_id, quantity } =
                bodySchema.parse(req.body);

            return res.json();
        } catch (error) {
            return next(error);
        }
    }
}

export { OrdersController };
