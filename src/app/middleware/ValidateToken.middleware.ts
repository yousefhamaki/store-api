import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import ARequest from "../interface/Request.interface";
import HandleUnauthError from "./unauth.error";

const ValidToken = (req: ARequest, _res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization as string;

    if (auth !== undefined) {
      const authData = auth.split(" ");
      const authType = authData[0].toLowerCase();
      const token = authData[1];

      if (token && authType === "bearer") {
        const check: JwtPayload = jwt.verify(
          token,
          config.secretToken as unknown as string
        ) as JwtPayload;
        if (check) {
          req.user = check.user;
          return next();
        }
      }
    }
    return HandleUnauthError(next);
  } catch (err) {
    HandleUnauthError(next);
  }
};

export default ValidToken;
