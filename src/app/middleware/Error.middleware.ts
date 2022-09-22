import { NextFunction, Request, Response } from "express";
import Error from "../interface/Error.interface";

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "oops! some thing went wrong";

  res.status(status).json({ status, message });
};

export default errorMiddleware;
