import { Request, Response } from "express";
import JsonReurn from "./../interface/JsonReturn";

exports.Error404 = (_req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "ohh you are lost, read the documentation to find your way",
  });
};

exports.Home = (_: Request, res: Response): Response<JsonReurn> => {
  return res.status(200).json({
    status: "success",
    message: "Welcome to store App",
  });
};

export default exports;
