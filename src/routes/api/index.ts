import { Router } from "express";
import usersRouter from "./users";
import notesRouter from "./notes";
const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/notes", notesRouter);

export default apiRouter;
