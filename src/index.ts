import express, {ErrorRequestHandler, RequestHandler} from "express";
import "dotenv/config"
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import createError from "http-errors";
import {json} from "body-parser";
import {configDotenv} from "dotenv";
import mongoose from "mongoose";

configDotenv()

const app = express();
const port = process.env.PORT || 3000
const dbUri = process.env.DB_URI || "localhost:27127";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set logger
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')));
app.use(json())

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

mongoose.connect(dbUri).then(() => {
    console.log("Connected to database")
})

const pageNotFoundErrorMiddleware: RequestHandler = (req, res, next) => {
    next(createError(404));
}
// Catch 404 and forward to error handler
app.use(pageNotFoundErrorMiddleware);

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    // set locals, only providing error in development res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error')
}

app.use(errorMiddleware);


export default {app}