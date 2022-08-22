import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import createHttpError from "http-errors";
import { User } from "../entity/User";

function getUserRepo(res: Response): Repository<User> {
    return res.app.get("dataSource").getRepository(User);
}

async function getUsers(req: Request, res: Response) {
    const users = await getUserRepo(res).find();
    res.send(users);
}

async function getUserById(req: Request, res: Response) {
    const user = await getUserRepo(res).findOneBy({
        id: parseInt(req.params.id, 10)
    });
    res.send(user);
}

async function createUser(req: Request, res: Response) {
    const user = new User();
    user.name = req.body.name;
    const results = await getUserRepo(res).save(user);

    res.send(results);
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
    const userRepo = getUserRepo(res);
    const user = await userRepo.findOneBy({
        id: parseInt(req.params.id, 10)
    });

    if (user) {
        userRepo.merge(user, req.body);
        const results = await userRepo.save(user);
        res.send(results);
    } else {
        next(createHttpError(404));
    }
}

async function deleteUser(req: Request, res: Response) {
    const results = await getUserRepo(res).delete(req.params.id);
    res.send(results);
}

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};