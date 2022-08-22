import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import createHttpError from "http-errors";
import { User } from "../entity/User";
import { Profile } from "../entity/Profile";

function getProfileRepo(res: Response): Repository<Profile> {
    return res.app.get("dataSource").getRepository(Profile);
}

export async function getUserProfile(req: Request, res: Response) {
    const profile = await getProfileRepo(res).findOneBy({
        user: {
            id: parseInt(req.params.id, 10)
        }
    });
    res.send(profile);
}

export async function updateUserProfile(req: Request, res: Response, next: NextFunction) {
    const profileRepo = getProfileRepo(res);
    const user = await profileRepo.findOneBy({
        user: {
            id: parseInt(req.params.id, 10)
        }
    });

    if (user) {
        profileRepo.merge(user, req.body);
        const results = await profileRepo.save(user);
        res.send(results);
    }
    else {
        next(createHttpError(404));
    }
}

export default {
    getUserProfile,
    updateUserProfile
};