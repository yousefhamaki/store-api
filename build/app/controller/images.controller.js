"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const images_model_1 = __importDefault(require("../models/images.model"));
const model = new images_model_1.default();
class imagesController {
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                let content;
                if (file) {
                    content = file.buffer.toString("base64");
                }
                else {
                    return res.json({
                        status: "failed",
                        message: "unable to uploaded this file",
                        data: {},
                    });
                }
                const size = file.size;
                const type = file.mimetype;
                const upload = yield model.upload(content, size, type);
                return res.json({
                    status: "success",
                    message: "Image uploaded successfully",
                    data: Object.assign({}, upload),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield model.getImage(req.params.id);
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
                    (0, sharp_1.default)(img)
                        .resize({ width: Number(info.width), height: Number(info.height) })
                        .toBuffer()
                        .then((resizedImageBuffer) => {
                        return res.end(resizedImageBuffer);
                    });
                }
                else {
                    return res.end(img);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = imagesController;
