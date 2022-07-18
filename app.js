const express = require("express");
const logger = require("morgan");
const path = require("path");

const app = express();
const indexRouter = require("./routes/index");
const port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// middleware setup
app.use(logger(process.env.LOG_LEVEL || "dev"));
app.use("./static", express.static((path.join(__dirname, "public"))));

// routes setup
app.use("/", indexRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}, pid: ${process.pid}`);
});