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
const config_1 = __importDefault(require("../config"));
const branch_model_1 = __importDefault(require("../models/branch.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const product_mongo_1 = __importDefault(require("../mongo/product.mongo"));
const model = new product_model_1.default();
const Branch = new branch_model_1.default();
const cache = new product_mongo_1.default();
class ProductController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.create(req.body);
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
                };
                for (let i = 0; i < modelResult.length; i++) {
                    result.features[i] = modelResult[i].feature;
                }
                if (config_1.default.activeMongo) {
                    const info = yield Branch.getBranch(modelResult[0].branch);
                    result.branch_info = {
                        id: info.id,
                        name: info.name,
                        status: info.status,
                    };
                    req.body.id = modelResult[0].id;
                    yield cache.create(result);
                }
                return res.json({
                    status: "success",
                    message: "Product created successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (config_1.default.activeMongo) {
                    result = yield cache.getProduct(req.params.id);
                }
                else {
                    result = yield model.getProduct(req.params.id);
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
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.getAllProducts(req.body.filter, req.body.branch, req.body.limit);
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
            }
            catch (err) {
                next(err);
            }
        });
    }
    editProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.editProduct(req.body);
                if (config_1.default.activeMongo) {
                    const info = yield Branch.getBranch(modelResult.branch);
                    modelResult.branch_info = {
                        id: modelResult.branch,
                        name: info.name,
                        status: info.status,
                    };
                    yield cache.editProduct(modelResult);
                }
                return res.json({
                    status: "success",
                    message: "Product updated successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.remove(req.params.id);
                if (config_1.default.activeMongo) {
                    yield cache.delete(req.params.id);
                }
                return res.json({
                    status: "success",
                    message: "Product removed successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getFeatures(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.getFeatures(req.params.id);
                return res.json({
                    status: "success",
                    message: "Get Product features info successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    addFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.addFeature(req.body);
                if (config_1.default.activeMongo) {
                    const info = (yield cache.getProduct(req.body.product_id));
                    info.features = [...info.features, req.body.feature];
                    yield cache.editProduct(info);
                }
                return res.json({
                    status: "success",
                    message: "Product feature added successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    editFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.editFeature(req.body);
                if (config_1.default.activeMongo) {
                    const info = yield model.getProduct(req.body.product_id);
                    yield cache.editProduct(info);
                }
                return res.json({
                    status: "success",
                    message: "Edit Product feature successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    removeFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.removeFeature(req.body.id);
                if (config_1.default.activeMongo) {
                    const info = yield model.getProduct(req.body.id);
                    yield cache.editProduct(info);
                }
                return res.json({
                    status: "success",
                    message: "Remove feature successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ProductController;
