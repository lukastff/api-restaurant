import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class TablesSessionsController {
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
                table_id: z.number(),
            });

            const { table_id } = bodySchema.parse(req.body);

            const session = await knex<TablesSessionsRepository>(
                "tables_sessions"
            )
                .where({ table_id })
                .orderBy("opened_at", "desc")
                .first();

            if (session && !session.closed_at) {
                throw new AppError("This table is already occupied");
            }

            await knex<TablesSessionsRepository>("tables_sessions").insert({
                table_id,
                opened_at: knex.fn.now(),
            });

            return res.status(201).json();
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json();
        } catch (error) {
            return next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json();
        } catch (error) {
            return next(error);
        }
    }
}

export { TablesSessionsController };
