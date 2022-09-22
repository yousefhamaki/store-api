import { Request, Response, NextFunction } from "express";
import config from "../config";
import JsonReurn from "../interface/JsonReturn";
import branch from "../models/branch.model";
import productsModel from "../models/product.model";
import ProductMongo from "../mongo/product.mongo";
import Product from "../types/product.type";

const model = new productsModel();
const Branch = new branch();
const cache = new ProductMongo();

class ProductController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const modelResult = await model.create(req.body);

      const result = {
        id: modelResult[0].id,
        title: modelResult[0].title,
        describtion: modelResult[0].describtion,
        price: modelResult[0].price,
        isonsale: req.body.isonsale,
        salePrice: req.body.salePrice,
        images: modelResult[0].images,
        countinstroke: modelResult[0].countinstroke,
        features: [],
        branch: modelResult[0].id,
      } as Product;

      for (let i = 0; i < modelResult.length; i++) {
        result.features[i] = modelResult[i].feature as string;
      }
      if (config.activeMongo) {
        const info = await Branch.getBranch(modelResult[0].branch);
        result.branch_info = {
          id: info.id,
          name: info.name,
          status: info.status,
        };
        req.body.id = modelResult[0].id;
        await cache.create(result);
      }
      return res.json({
        status: "success",
        message: "Product created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async getProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      let result;

      if (config.activeMongo) {
        result = await cache.getProduct(req.params.id);
      } else {
        result = await model.getProduct(req.params.id);
      }

      if (result) {
        return res.json({
          status: "success",
          message: "Get Product info successfully",
          data: result,
        });
      }
      return res.status(500).json({
        status: "failed",
        message: "Can't get Product info",
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await model.getAllProducts(
        req.body.filter,
        req.body.branch,
        req.body.limit
      );
      if (result && result.length > 0) {
        return res.json({
          status: "success",
          message: "Get Products info successfully",
          data: result,
        });
      }
      return res.status(500).json({
        status: "failed",
        message: "Can't get Products info",
      });
    } catch (err) {
      next(err);
    }
  }

  async editProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const modelResult = await model.editProduct(req.body);

      if (config.activeMongo) {
        const info = await Branch.getBranch(modelResult.branch);
        modelResult.branch_info = {
          id: modelResult.branch,
          name: info.name,
          status: info.status,
        };
        await cache.editProduct(modelResult);
      }

      return res.json({
        status: "success",
        message: "Product updated successfully",
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
        message: "Product removed successfully",
        data: modelResult,
      });
    } catch (err) {
      return next(err);
    }
  }

  async getFeatures(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await model.getFeatures(req.params.id);

      return res.json({
        status: "success",
        message: "Get Product features info successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async addFeature(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await model.addFeature(req.body);

      if (config.activeMongo) {
        const info = (await cache.getProduct(
          req.body.product_id
        )) as unknown as Product;

        info.features = [...info.features, req.body.feature];
        await cache.editProduct(info);
      }

      return res.json({
        status: "success",
        message: "Product feature added successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async editFeature(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await model.editFeature(req.body);

      if (config.activeMongo) {
        const info = await model.getProduct(req.body.product_id);
        await cache.editProduct(info);
      }

      return res.json({
        status: "success",
        message: "Edit Product feature successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async removeFeature(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await model.removeFeature(req.body.id);

      if (config.activeMongo) {
        const info = await model.getProduct(req.body.id);
        await cache.editProduct(info);
      }

      return res.json({
        status: "success",
        message: "Remove feature successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default ProductController;
