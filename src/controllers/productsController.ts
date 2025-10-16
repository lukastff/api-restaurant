import { Request, Response, NextFunction } from "express";
import { z } from "zod";

class ProductController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json({ message: "Ok" });
        } catch (error) {
            return next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0),
            });

            const { name, price } = bodySchema.parse(req.body);

            return res.status(201).json({ name, price });
        } catch (error) {
            return next(error);
        }
    }
}

export { ProductController };
