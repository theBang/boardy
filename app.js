const express = require("express");
const logger = require("morgan");
const path = require("path");

const app = express();
const adminRouter = express.Router();
const port = process.env.PORT || 3000;

app.use(logger(process.env.LOG_LEVEL || "dev"));
app.use("./static", express.static((path.join(__dirname, 'public'))));

adminRouter.get("/", (req, res) => {
    res.send("Admin route");
});

app.use("/admin", adminRouter);

app.get("/", function(req, res) {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}, pid: ${process.pid}`);
});