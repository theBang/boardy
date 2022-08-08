const { Router } = require("express");
const User = require("../../models/model/User");
const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
    const userRepo = res.app.get("dataSource").getRepository(User);
    const users = await userRepo.find();
    res.send(users);
});

usersRouter.get("/:id", async (req, res) => {
    const user = await res.app.get("dataSource").getRepository(User).findOneBy({
        id: parseInt(req.params.id, 10)
    });
    res.send(user);
})

usersRouter.post("/", async (req, res) => {
    const user = new User();
    user.name = req.body.name;
    const userRepo = res.app.get("dataSource").getRepository(User);
    const results = await userRepo.save(user);

    res.send(results);
});

usersRouter.put("/:id", async (req, res) => {
    const userRepo = res.app.get("dataSource").getRepository(User);
    const user = await userRepo.findOneBy({
        id: parseInt(req.params.id, 10)
    });

    userRepo.merge(user, req.body);
    const results = await userRepo.save(user);
    res.send(results);
})

usersRouter.delete("/:id", async (req, res) => {
    const userRepo = res.app.get("dataSource").getRepository(User);
    const results = await userRepo.delete(req.params.id);
    res.send(results);
});

module.exports = usersRouter;