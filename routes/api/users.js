const { Router } = require("express");
const User = require("../../models/User");
const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
    const dataSource = res.app.get("dataSource");
    const userRepo = dataSource.getRepository(User);
    const users = await userRepo.find();
    res.send(users);
});

usersRouter.get("/:id", async (req, res) => {
    const user = await res.app.get("dataSource").getRepository(User).findOneBy({
        id: parseInt(req.params.id, 10)
    });
    res.send(user);
})

module.exports = usersRouter;