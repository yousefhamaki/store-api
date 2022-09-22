import { Response, NextFunction } from "express";
import ARequest from "../interface/Request.interface";
import UserModel from "../models/user.model";
import User from "../types/user.type";

const model = new UserModel();

export const isAdmin = async (
  req: ARequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { rank } = await model.getUserRank(user?.id as string);
  (req.user as User).rank = rank;
  if (user?.rank === "admin") {
    return next();
  } else {
    res.status(401).send({ message: "Unable to use this link" });
  }
};

export const selfData = async (
  req: ARequest,
  res: Response,
  next: NextFunction
) => {
  const data = req.method === "POST" ? req.body : req.params;
  const user = req.user;

  if (req.method === "PUT" && req.originalUrl === "/api/user/change") {
    if (user?.id === req.body.id) {
      return next();
    }
  }

  if (user?.id === data.id) {
    return next();
  }
  return res.status(401).send({ message: "Authorization Failed" });
};
