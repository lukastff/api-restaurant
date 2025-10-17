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
