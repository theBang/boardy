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

usersRouter.post("/", async (req, res) => {
    const dataSource = res.app.get("dataSource");
    const userRepo = dataSource.getRepository(User);
    const newUser = await userRepo.create(req.body);
    const user = await userRepo.save(newUser);

    res.send(user);
});

usersRouter.put("/:id", async (req, res) => {
    const dataSource = res.app.get("dataSource");
    const userRepo = dataSource.getRepository(User);
    const user = await userRepo.findOneBy({
        id: parseInt(req.params.id, 10)
    });
    
    userRepo.merge(user, req.body);
    const results = await userRepo.save(user);
    res.send(results);
})

module.exports = usersRouter;