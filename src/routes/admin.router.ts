import { Router } from "express";
import AdminController from "../controllers/admin.controller";

const adminRouter = Router();

adminRouter.get("/", AdminController.getHome)

export default adminRouter;