import { Router, Response } from "express";
import { User } from "../../entity/User"
import { Repository } from "typeorm";
import createHttpError from "http-errors";
const usersRouter = Router();

function getUserRepo(res: Response): Repository<User> {
    return res.app.get("dataSource").getRepository(User);
}

usersRouter.get("/", async (req, res) => {
    const users = await getUserRepo(res).find();
    res.send(users);
});

usersRouter.get("/:id", async (req, res) => {
    const user = await getUserRepo(res).findOneBy({
        id: parseInt(req.params.id, 10)
    });
    res.send(user);
})

usersRouter.post("/", async (req, res) => {
    const user = new User();
    user.name = req.body.name;
    const results = await getUserRepo(res).save(user);

    res.send(results);
});

usersRouter.put("/:id", async (req, res, next) => {
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
})

usersRouter.delete("/:id", async (req, res) => {
    const results = await getUserRepo(res).delete(req.params.id);
    res.send(results);
});

export default usersRouter;