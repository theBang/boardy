import { Router } from "express";
import AdminController from "../controllers/admin.controller";

const adminRouter = Router();

adminRouter.get("/", AdminController.getHome);
adminRouter.get("/users", AdminController.getEnity);
adminRouter.get("/notes", AdminController.getEnity);

export default adminRouter;