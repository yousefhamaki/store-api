import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import JsonReurn from "../interface/JsonReturn";
import imagesModel from "../models/images.model";

const model = new imagesModel();

class imagesController {
  async uploadImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const file = req.file;
      let content;
      if (file) {
        content = file.buffer.toString("base64") as string;
      } else {
        return res.json({
          status: "failed",
          message: "unable to uploaded this file",
          data: {},
        });
      }
      const size = file.size as number;
      const type = file.mimetype as string;

      const upload = await model.upload(content, size, type);

      return res.json({
        status: "success",
        message: "Image uploaded successfully",
        // data: {
        //   id: upload.id,
        //   size: upload.size
        // }
        data: { ...upload },
      });
    } catch (err) {
      next(err);
    }
  }

  async getImage(req: Request, res: Response, next: NextFunction) {
    try {
      const image = await model.getImage(req.params.id);

      if (!image) {
        return res.status(404).json({
          status: 404,
          message: "Image not found",
        });
      }
      const data = image.content;
      const img = Buffer.from(data, "base64");

      res.writeHead(200, {
        "Content-Type": image.type,
        "Content-Length": img.length,
      });
      const info = req.query;

      if (Number(info.width) && Number(info.height)) {
        sharp(img)
          .resize({ width: Number(info.width), height: Number(info.height) })
          .toBuffer()
          .then((resizedImageBuffer) => {
            return res.end(resizedImageBuffer);
          });
      } else {
        return res.end(img);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default imagesController;
