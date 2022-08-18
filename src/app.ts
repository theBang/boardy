import dotenv from "dotenv";
dotenv.config();

import type { Express, Request, Response } from "express";
import express from "express";
import morgan from "morgan";
import path from "path";
import createError, { HttpError } from "http-errors";

import "reflect-metadata";
import { appDataSource } from "./data-source";
import addMockData from "./migrations/mock";
// const dataSource = require("./data-source");

const isProduction = !process.env.NODE_ENV || process.env.NODE_ENV === "production";

appDataSource
    .initialize()
    .then((dataSrc) => {
        if (isProduction) {
            return addMockData(dataSrc);
        }
        console.log("db up");
    })
    .catch((err: Error) => {
        console.log("db err:", err);
    });

const app: Express = express();
import indexRouter from "./routes/home";
import apiRouter from "./routes/api.router";
const port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "pug");
app.set("dataSource", appDataSource)

// middleware setup
app.use(morgan(process.env.LOG_LEVEL || "dev"));
app.use(express.json());
app.use("./static", express.static((path.join(__dirname, "..", "public"))));

// routes setup
app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err: Error | HttpError, req: Request, res: Response) => {
    res.locals.message = err.message;
    res.locals.error = isProduction ? {} : err;

    let status = 500;
    if (err instanceof HttpError && err.status) {
        status = err.status;
    }

    res.status(status);
    res.render("error");
})

app.listen(port, () => {
    console.log(`Server started on port ${port}, pid: ${process.pid}`);
});