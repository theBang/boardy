const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", function(req, res) {
    res.send("Hello world!");
});

module.exports = indexRouter;