require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const path = require("path");
const createError = require("http-errors");
const dataSource = require("./data-source");

const isProduction = !process.env.NODE_ENV || process.env.NODE_ENV === "production";

dataSource
    .initialize()
    .then((dataSrc) => {
        if (isProduction) {
            require("./migrations/mock")(dataSrc);
        }
        console.log("db up");
    })
    .catch((err) => {
        console.log("db err:", err);
    });

const app = express();
const indexRouter = require("./routes/home");
const apiRouter = require("./routes/api");
const port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("dataSource", dataSource)

// middleware setup
app.use(logger(process.env.LOG_LEVEL || "dev"));
app.use("./static", express.static((path.join(__dirname, "public"))));

// routes setup
app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.ENV === "dev" ? err : {};

    res.status(err.status || 500);
    res.render("error");
})

app.listen(port, () => {
    console.log(`Server started on port ${port}, pid: ${process.pid}`);
});