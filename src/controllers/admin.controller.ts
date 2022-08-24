import { Request, Response } from "express";
import path from "path";

async function getHome(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "..", "..", "views", "admin", "index.html"));
}


async function getEnity(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "..", "..", "views", "admin", "entity.html"));
}

export default {
    getHome,
    getEnity
};