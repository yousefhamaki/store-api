import Error from "../interface/Error.interface";
import { NextFunction } from "express";

const HandleUnauthError = (next: NextFunction) => {
  const err: Error = new Error("error Auth: please try again");

  err.status = 401;
  next(err);
};

export default HandleUnauthError;
