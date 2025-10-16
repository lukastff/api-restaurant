import { Request, Response, NextFunction } from "express";

class ProductController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json({ message: "Ok" });
        } catch (error) {
            return next(error);
        }
    }
}

export { ProductController };
