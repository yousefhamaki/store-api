"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../../../controller/product.controller"));
const Query_middleware_1 = __importDefault(require("../../../middleware/Query.middleware"));
const productRequest_1 = __importDefault(require("../../../requests/productRequest"));
const requests = new productRequest_1.default();
const controller = new product_controller_1.default();
const router = (0, express_1.Router)();
router.post("/create", (0, Query_middleware_1.default)(requests.create), controller.create);
router.put("/edit/product", (0, Query_middleware_1.default)(requests.editProduct), controller.editProduct);
router.put("/edit/feature", (0, Query_middleware_1.default)(requests.editFeature), controller.editFeature);
router.put("/add/feature", (0, Query_middleware_1.default)(requests.addFeature), controller.addFeature);
router.delete("/remove/:id", (0, Query_middleware_1.default)(requests.checkUuid), controller.delete);
router.delete("/feature/remove/:id", (0, Query_middleware_1.default)(requests.checkUuid), controller.delete);
exports.default = router;
