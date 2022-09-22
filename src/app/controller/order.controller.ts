import { Request, Response, NextFunction } from "express";
import config from "../config";
import JsonReurn from "../interface/JsonReturn";
import ARequest from "../interface/Request.interface";
import orderModel from "../models/order.model";
import orderMongo from "../mongo/order.mongo";

const model = new orderModel();
const cache = new orderMongo();

class orderController {
  async create(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      req.body.user_id = req.user?.id;
      req.body.status = "active";
      const modelResult = await model.create(req.body);
      const order = await model.getOrder(modelResult[0].order_id as string);
      if (config.activeMongo) {
        await cache.remove(order.id as string);
      }
      return res.json({
        status: "success",
        message: "Order created successfully",
        data: order,
      });
    } catch (err) {
      next(err);
    }
  }

  async getUserOrders(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      let modelResult = {};
      if (config.activeMongo) {
        modelResult = await cache.getUserOrders(req.params.id);
      } else {
        modelResult = await model.getUserOrders(req.params.id);
      }
      return res.json({
        status: "success",
        message: "Orders getted successfully",
        data: modelResult,
      });
    } catch (err) {
      next(err);
    }
  }

  async getCompletedOrders(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      let modelResult = {};
      if (config.activeMongo) {
        modelResult = await cache.getCompletedOrders(req.params.id);
      } else {
        modelResult = await model.completedOrders(req.params.id);
      }
      return res.json({
        status: "success",
        message: "Orders getted successfully",
        data: modelResult,
      });
    } catch (err) {
      next(err);
    }
  }

  async getActiveOrders(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const modelResult = await model.getActiveOrders();

      return res.json({
        status: "success",
        message: "Orders getted successfully",
        data: modelResult,
      });
    } catch (err) {
      next(err);
    }
  }

  async getOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      let result = {};
      if (config.activeMongo) {
        result = (await cache.getOrder(req.params.id)) as object;
      } else {
        result = await model.getOrder(req.params.id);
      }
      return res.json({
        status: "success",
        message: "Orders getted successfully",
        data: result,
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
      const result = await model.changeState(req.body.id, req.body.state);

      if (config.activeMongo) {
        const data = await model.getOrder(req.body.id);
        await cache.updateOrder(data);
      }
      return res.json({
        status: "success",
        message: "Orders getted successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async mostselled(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await model.mostselled();

      return res.json({
        status: "success",
        message: "Orders getted successfully",
        data: result,
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
      const modelResult = await model.removeOrder(req.params.id);

      if (config.activeMongo) {
        await cache.remove(req.params.id);
      }

      return res.json({
        status: "success",
        message: "Order removed successfully",
        data: modelResult,
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default orderController;
