import { Request, Response, NextFunction } from "express";
import config from "../config";
import JsonReurn from "../interface/JsonReturn";
import branch from "../models/branch.model";
import mainBranch from "../models/mainBranch.model";
import branchMongo from "../mongo/Branch.mongo";

const model = new branch();
const Main = new mainBranch();
const cache = new branchMongo();

class BranchController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const modelResult = await model.create(req.body);
      if (config.activeMongo) {
        const info = await Main.getBranch(req.body.main);
        modelResult.main_name = info.name;
        modelResult.main_status = info.status;
        await cache.create(modelResult);
      }

      return res.json({
        status: "success",
        message: "Branch created successfully",
        data: modelResult,
      });
    } catch (err) {
      next(err);
    }
  }

  async changeRelation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const modelResult = await model.changeRelation(
        req.body.id,
        req.body.main_id
      );
      if (config.activeMongo) {
        const info = await Main.getBranch(req.body.main_id);
        await cache.changeMain(
          req.params.id,
          req.params.main_id,
          info.name,
          info.status
        );
      }
      return res.json({
        status: "success",
        message: "Relation updated successfully",
        data: modelResult,
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
      const modelResult = await model.changeState(
        req.params.id,
        req.body.status
      );
      if (config.activeMongo) {
        await cache.changeState(req.params.id, req.body.status);
      }
      return res.json({
        status: "success",
        message: "State updated successfully",
        data: modelResult,
      });
    } catch (err) {
      next(err);
    }
  }

  async changeName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const modelResult = await model.changeName(req.params.id, req.body.name);
      if (config.activeMongo) {
        await cache.changeName(req.params.id, req.body.name);
      }
      return res.json({
        status: "success",
        message: "Name updated successfully",
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
        message: "Branch deleted successfully",
        data: modelResult,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default BranchController;
