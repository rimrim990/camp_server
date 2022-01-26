import { Request, Response, NextFunction } from "express";
import { resourceLimits } from "worker_threads";
import { RequestCustom } from "../types/Request";
import { verifyAccessToken } from "./jwt";

export const authJWT = (req: RequestCustom, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1];
        const result = verifyAccessToken(token);
        if (result.ok) {
            req.userId = result.id;
            next();
        } else {
            res.status(401).send({
                ok: false,
                message: result.message,
            });
        }
    } else {
        res.status(401).send({
            ok: false,
            message: 'UNAUTHORIZED'
        });
    }
}