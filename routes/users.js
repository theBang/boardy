const { Router } = require("express");
const User = require("../models/User");
const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
    const dataSource = res.app.get("dataSource");
    const userRepo = dataSource.getRepository(User);
    const users = await userRepo.find();
    res.json(users);
});

module.exports = usersRouter;