import { Response, NextFunction } from "express";
import ARequest from "../interface/Request.interface";

export const selfData = async (
  req: ARequest,
  res: Response,
  next: NextFunction
) => {
  const data = req.method === "POST" ? req.body : req.params;
  const user = req.user;
  if (user?.id === data.id) {
    next();
  } else {
    res.status(401).send({ message: "Authorization Failed" });
  }
};
