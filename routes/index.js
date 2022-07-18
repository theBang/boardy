const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", function(req, res) {
    res.render("index", { title: "Home page" })
});

module.exports = indexRouter;