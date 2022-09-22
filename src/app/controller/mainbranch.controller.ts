import { Request, Response, NextFunction } from "express";
import config from "../config";
import MainBranchMongo from "../mongo/mainBranch.mongo";
import mainBranch from "../models/mainBranch.model";
import JsonReurn from "../interface/JsonReturn";

const cache = new MainBranchMongo();
const model = new mainBranch();

class mainController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const modelResult = await model.create(req.body);
      if (config.activeMongo) {
        await cache.create(modelResult);
      }

      return res.json({
        status: "success",
        message: "Main Branch created successfully",
        data: modelResult,
      });
    } catch (err) {
      return next(err);
    }
  }

  async changeName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const modelResult = await model.changeName(req.body.id, req.body.name);

      if (config.activeMongo) {
        await cache.changeName(req.body.id, req.body.name);
      }

      return res.json({
        status: "success",
        message: "Main Branch updated successfully",
        data: modelResult,
      });
    } catch (err) {
      next(err);
    }
  }

  async getMenu(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const data = await model.getMenu();

      return res.json({
        status: "success",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  async changeState(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const modelResult = await model.changeState(req.body.id, req.body.status);

      if (config.activeMongo) {
        await cache.changeState(req.body.id, req.body.status);
      }

      return res.json({
        status: "success",
        message: "Main Branch updated successfully",
        data: modelResult,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const modelResult = await model.remove(req.params.id);

      if (config.activeMongo) {
        await cache.delete(req.params.id);
      }

      return res.json({
        status: "success",
        message: "Main Branch removed successfully",
        data: modelResult,
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default mainController;
