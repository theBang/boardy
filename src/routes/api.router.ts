import { Router } from "express";
const apiRouter = Router();

import * as UserController from "../controllers/user.controller";

apiRouter.get("/users", UserController.getUsers);
apiRouter.get("/user/:id", UserController.getUserById)
apiRouter.get("/user/:id/profile", UserController.getUserProfile)
apiRouter.post("/user", UserController.createUser);
apiRouter.put("/user/:id", UserController.updateUser);
apiRouter.delete("/user/:id", UserController.deleteUser);

export default apiRouter;