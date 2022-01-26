import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";

import { userRouter} from "./routes/userRouter";
import { timeRouter } from "./routes/timeRouter";
import { dayRouter } from  "./routes/dayRouter";
import { taskRouter } from "./routes/taskRouter"; 
import { followRouter } from "./routes/followRouter";
import { likeRouter } from "./routes/likeRouter";
import { memoRouter } from "./routes/memoRouter";
import { bookRouter } from "./routes/bookRouter";
import { plannerRouter } from "./routes/plannerRouter";
import HttpException from "./types/HttpException";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use("/user", userRouter);
app.use("/day", dayRouter);
app.use("/task", taskRouter);
app.use("/time", timeRouter);
app.use("/follow", followRouter);
app.use("/like", likeRouter);
app.use("/memo", memoRouter);
app.use("/book", bookRouter);
app.use("/planner", plannerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
