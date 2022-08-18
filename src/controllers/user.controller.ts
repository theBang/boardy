import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import createHttpError from "http-errors";
import { User } from "../entity/User";
import { Profile } from "../entity/Profile";

function getUserRepo(res: Response): Repository<User> {
    return res.app.get("dataSource").getRepository(User);
}

function getProfileRepo(res: Response): Repository<Profile> {
    return res.app.get("dataSource").getRepository(Profile);
}

export async function getUsers(req: Request, res: Response) {
    const users = await getUserRepo(res).find();
    res.send(users);
}

export async function getUserById(req: Request, res: Response) {
    const user = await getUserRepo(res).findOneBy({
        id: parseInt(req.params.id, 10)
    });
    res.send(user);
}

export async function getUserProfile(req: Request, res: Response) {
    const profile = await getProfileRepo(res).findOneBy({
        user: {
            id: parseInt(req.params.id, 10)
        }
    });
    res.send(profile);
}

export async function createUser(req: Request, res: Response) {
    const user = new User();
    user.name = req.body.name;
    const results = await getUserRepo(res).save(user);

    res.send(results);
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    const userRepo = getUserRepo(res);
    const user = await userRepo.findOneBy({
        id: parseInt(req.params.id, 10)
    });

    if (user) {
        userRepo.merge(user, req.body);
        const results = await userRepo.save(user);
        res.send(results);
    }
    else {
        next(createHttpError(404));
    }
}

export async function deleteUser(req: Request, res: Response) {
    const results = await getUserRepo(res).delete(req.params.id);
    res.send(results);
}
