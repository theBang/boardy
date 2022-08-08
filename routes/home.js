const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", function(req, res) {
    res.render("index", { title: "Home page" })
});

module.exports = homeRouter;