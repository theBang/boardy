import { Router } from "express";
const apiRouter = Router();

import UserController from "../controllers/user.controller";
import ProfileController from "../controllers/profile.controller";
import NoteController from "../controllers/note.controller";

apiRouter.get("/users", UserController.getUsers);
apiRouter.get("/user/:id", UserController.getUserById);
apiRouter.post("/user", UserController.createUser);
apiRouter.put("/user/:id", UserController.updateUser);
apiRouter.delete("/user/:id", UserController.deleteUser);

apiRouter.get("/user/:id/profile", ProfileController.getUserProfile);
apiRouter.put("/user/:id/profile", ProfileController.updateUserProfile);

apiRouter.get("/notes", NoteController.getNotes);
apiRouter.get("/note/:id", NoteController.getNoteById)
apiRouter.post("/note", NoteController.createNote);
apiRouter.put("/note/:id", NoteController.updateNote)
apiRouter.delete("/note/:id", NoteController.deleteNote);

export default apiRouter;