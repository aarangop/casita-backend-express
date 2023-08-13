import express, {ErrorRequestHandler, RequestHandler} from "express";
import "dotenv/config"
import path from "path";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import {json} from "body-parser";
import {configDotenv} from "dotenv";
import winston, {createLogger} from "winston";
import logger from "morgan";

// Import routers
import usersRouter from "./routes/user.route";
import householdRouter from "./routes/household.route";

export function configureEnv(): void {
    const logger = createLogger({
        level: "info",
        transports: [new winston.transports.Console()]
    })
    // Configure environment
    const configEnvPath = process.env.NODE_ENV === "production" ? "./config/.env" : `./config/.env.${process.env.NODE_ENV}`;
    configDotenv({
        path: configEnvPath
    });
    logger.info(`Configured environment from file ${configEnvPath}`)
}

export function getDbUri(): string {
    return process.env.DB_URI || "mongo://localhost:27027"
}

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set logger
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')));
app.use(json())

// Set up routers
app.use('/user', usersRouter);
app.use("/household", householdRouter);

// Set up error handlers
const pageNotFoundErrorMiddleware: RequestHandler = (req, res, next) => {
    next(createError(404));
}
// Catch 404 and forward to error handler
app.use(pageNotFoundErrorMiddleware);

const errorMiddleware: ErrorRequestHandler = (err, req, res) => {
    // set locals, only providing error in development res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error')
}

app.use(errorMiddleware);

export default app