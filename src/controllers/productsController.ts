import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";

class ProductController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.query;

            const products = await knex<ProductRepository>("products")
                .select()
                .whereLike("name", `%${name ?? ""}%`)
                .orderBy("id");

            return res.json(products);
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

            await knex<ProductRepository>("products").insert({ name, price });

            return res.status(201).json();
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), {
                    message: "id must be a number",
                })
                .parse(req.params.id);

            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0),
            });

            const { name, price } = bodySchema.parse(req.body);

            await knex<ProductRepository>("products")
                .update({ name, price, updated_at: knex.fn.now() })
                .where({ id });

            return res.send();
        } catch (error) {
            next(error);
        }
    }
}

export { ProductController };
