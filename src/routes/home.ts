import { Router } from "express";
const homeRouter = Router();

homeRouter.get("/", function (req, res) {
    res.render("index", { title: "Home page" })
});

export default homeRouter;