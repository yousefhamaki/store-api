import { Request, Response, NextFunction } from "express";
import validReturn from "../requests/reutrnRequest";
import QueryCheck from "../traits/CheckQuery";

const Query = (required: { [key: string]: string }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    /* request query handler */
    let data = req.method === "GET" ? req.params : req.body;

    if (req.method === "DELETE") {
      data = req.params;
    }
    const requestInfo: string[] = QueryCheck(data, required);
    if (requestInfo.length > 0) {
      return res.status(412).json(validReturn(requestInfo));
    } else {
      return next();
    }
  };
};

export default Query;
