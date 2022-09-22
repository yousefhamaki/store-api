"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const images_controller_1 = __importDefault(require("../../controller/images.controller"));
const Authorization_middleware_1 = require("../../middleware/Authorization.middleware");
const Query_middleware_1 = __importDefault(require("../../middleware/Query.middleware"));
const ValidateToken_middleware_1 = __importDefault(require("../../middleware/ValidateToken.middleware"));
const image_Request_1 = __importDefault(require("../../requests/image.Request"));
const request = new image_Request_1.default();
const controller = new images_controller_1.default();
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post("/upload", ValidateToken_middleware_1.default, Authorization_middleware_1.isAdmin, upload.single("image"), controller.uploadImage);
router.get("/:id?", (0, Query_middleware_1.default)(request.get), controller.getImage);
exports.default = router;
