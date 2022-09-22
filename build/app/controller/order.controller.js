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
const order_model_1 = __importDefault(require("../models/order.model"));
const order_mongo_1 = __importDefault(require("../mongo/order.mongo"));
const model = new order_model_1.default();
const cache = new order_mongo_1.default();
class orderController {
    create(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                req.body.status = "active";
                const modelResult = yield model.create(req.body);
                const order = yield model.getOrder(modelResult[0].order_id);
                if (config_1.default.activeMongo) {
                    yield cache.remove(order.id);
                }
                return res.json({
                    status: "success",
                    message: "Order created successfully",
                    data: order,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getUserOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let modelResult = {};
                if (config_1.default.activeMongo) {
                    modelResult = yield cache.getUserOrders(req.params.id);
                }
                else {
                    modelResult = yield model.getUserOrders(req.params.id);
                }
                return res.json({
                    status: "success",
                    message: "Orders getted successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getCompletedOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let modelResult = {};
                if (config_1.default.activeMongo) {
                    modelResult = yield cache.getCompletedOrders(req.params.id);
                }
                else {
                    modelResult = yield model.completedOrders(req.params.id);
                }
                return res.json({
                    status: "success",
                    message: "Orders getted successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getActiveOrders(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.getActiveOrders();
                return res.json({
                    status: "success",
                    message: "Orders getted successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = {};
                if (config_1.default.activeMongo) {
                    result = (yield cache.getOrder(req.params.id));
                }
                else {
                    result = yield model.getOrder(req.params.id);
                }
                return res.json({
                    status: "success",
                    message: "Orders getted successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    changeState(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.changeState(req.body.id, req.body.state);
                if (config_1.default.activeMongo) {
                    const data = yield model.getOrder(req.body.id);
                    yield cache.updateOrder(data);
                }
                return res.json({
                    status: "success",
                    message: "Orders getted successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    mostselled(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.mostselled();
                return res.json({
                    status: "success",
                    message: "Orders getted successfully",
                    data: result,
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
                const modelResult = yield model.removeOrder(req.params.id);
                if (config_1.default.activeMongo) {
                    yield cache.remove(req.params.id);
                }
                return res.json({
                    status: "success",
                    message: "Order removed successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = orderController;
