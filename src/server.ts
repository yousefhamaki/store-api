import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ErrorMiddleware from "./app/middleware/Error.middleware";
import config from "./app/config";
import Routers from "./app/routes/index";
import cache from "./app/database/cache";
import Handler from "./app/controller/Handler.controller";

const PORT = config.port || 5000;
const app: Application = express();

//middleware to parse incoming request
app.use(express.json());
//http request loggen middleware
app.use(morgan("common"));
//http security middleware
app.use(helmet());
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: config.TimeLimit * (60 * 1000),
    max: config.RequestLimit,
    standardHeaders: true,
    legacyHeaders: false,
    message: config.MessageLimit,
  })
);

//Home Router
if (config.ActiveHome) {
  app.get("/", Handler.Home);
}

//mongo connection
if (config.activeMongo) {
  //start connecting to mongo
  cache();
}

//routers
app.use("/api", Routers);

//handle errors
app.use(ErrorMiddleware);

//404 Request
app.use(Handler.Error404);

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));

export default app;
