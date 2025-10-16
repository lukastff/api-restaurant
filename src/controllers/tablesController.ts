import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class TablesController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const tables = await knex<TableRepository>("tables")
                .select()
                .orderBy("table_number");

            return res.send(tables);
        } catch (error) {
            return next(error);
        }
    }
}

export { TablesController };
