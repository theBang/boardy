const { Router } = require("express");
const apiRouter = Router();

apiRouter.use("/users", require("./users"));
apiRouter.use("/notes", require("./notes"));

module.exports = apiRouter;
