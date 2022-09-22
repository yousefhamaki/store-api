import { Request, Response, NextFunction } from "express";
import checkPass from "../traits/checkPass";
import ARequest from "../interface/Request.interface";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config";
import JsonReurn from "../interface/JsonReturn";
import UserMongo from "../mongo/user.mongo";

const model = new userModel();
const cache = new UserMongo();

class userController {
  async create(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    //password validation
    const validpass = await checkPass(req.body.password);
    if (validpass.length < 3) {
      return res.status(505).json({
        status: "validation failed",
        message: "password is not valid",
        data: {
          type: "password",
          info: validpass,
        },
      });
    }
    //add new user
    try {
      //check if admin create or normal user
      req.body.rank = "user";
      if (req.user !== undefined) {
        if (req.user.rank) {
          req.body.rank = "admin";
        }
      }

      const create = await model.create(req.body);

      if (config.activeMongo) {
        create.db_id = create.id as string;
        const user = await cache.create(create);

        return res.json({
          status: "success",
          message: "User created successfully",
          data: user,
        });
      }

      return res.json({
        status: "success",
        message: "User created successfully",
        data: create,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(
    req: Request,
    res: Response<JsonReurn>,
    next: NextFunction
  ): Promise<Request<JsonReurn> | unknown> {
    try {
      const { email, password } = req.body;

      const user = await model.makeAuth(email, password);
      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "email or password is not correct",
        });
      }
      const token = jwt.sign({ user }, config.secretToken as unknown as string);
      return res.status(200).json({
        status: "success",
        message: "user is login successfully",
        data: { ...user, token: "Bearer " + token },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      let users;
      const page: number = Number(req.params.page) | 1;

      if (config.activeMongo) {
        users = await cache.getAll(page);
      } else {
        users = await model.getAll();
      }
      return res.json({
        status: "success",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }

  async getUser(
    req: Request,
    res: Response<JsonReurn>,
    next: NextFunction
  ): Promise<Request<JsonReurn> | unknown> {
    try {
      let user;
      if (config.activeMongo) {
        user = await cache.getUser(req.params.id);
      } else {
        user = await model.getUser(req.params.id);
      }

      if (!user) {
        return res.json({
          status: "failed",
          message: "user isn't defined",
        });
      }
      return res.json({
        status: "success",
        data: user as object,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateuserinfo(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const change = await model.updateUser(req.body);

      if (config.activeMongo) {
        await cache.updateInfo(req.body);
      }

      return res.json({
        status: "success",
        message: "Your info is updated successfully",
        data: { ...change },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const deleteInfo = await model.deleteUser(req.params.id);

      if (config.activeMongo) {
        await cache.deleteUser(req.params.id);
      }

      return res.json({
        status: "success",
        message: "User is deleted successfully",
        data: { ...deleteInfo },
      });
    } catch (err) {
      next(err);
    }
  }

  async changePass(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const update = await model.changePass(
        req.user?.id as string,
        req.body.oldpass,
        req.body.newpass
      );

      if (update) {
        return res.json({
          status: "success",
          message: "your password was changed successfully",
        });
      } else {
        throw new Error("old password is not correct");
      }
    } catch (err) {
      next(err);
    }
  }

  //options
  async searchEmail(
    req: Request,
    res: Response<JsonReurn>,
    next: NextFunction
  ): Promise<Request<JsonReurn> | unknown> {
    try {
      let status;
      let message;
      let email;
      if (config.activeMongo) {
        email = await cache.searchEmail(req.params.email);
      } else {
        email = await model.searchEmail(req.params.email);
      }

      if (email?.email) {
        status = "failed";
        message = "email is already exist";
      } else {
        status = "success";
        message = "successful email";
      }

      return res.json({
        status: status as string,
        message: message as string,
      });
    } catch (err) {
      next(err);
    }
  }

  async searchUserName(
    req: Request,
    res: Response<JsonReurn>,
    next: NextFunction
  ): Promise<Request<JsonReurn> | unknown> {
    try {
      let status;
      let message;
      let username;
      if (config.activeMongo) {
        username = await cache.searchUserName(req.params.username);
      } else {
        username = await model.searchUserName(req.params.username);
      }

      if (username?.username) {
        status = "failed";
        message = "Username is already exist";
      } else {
        status = "success";
        message = "Successful username";
      }

      return res.json({
        status: status as string,
        message: message as string,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default userController;
