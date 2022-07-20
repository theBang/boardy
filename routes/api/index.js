const { Router } = require("express");
const apiRouter = Router();

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
