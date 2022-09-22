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
const order_schema_1 = __importDefault(require("../schema/order.schema"));
class orderMongo {
    create(info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = new order_schema_1.default(info);
                const created = yield order.save();
                return created;
            }
            catch (err) {
                throw new Error(`unable to cache order info of ${info.id} : ${err.message}`);
            }
        });
    }
    getUserOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = order_schema_1.default.find({ user_id: id });
                return orders;
            }
            catch (err) {
                throw new Error(`unable to get orders cache order info of ${id} : ${err.message}`);
            }
        });
    }
    getOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = order_schema_1.default.findOne({ id: id });
                return order;
            }
            catch (err) {
                throw new Error(`unable to get order cache order info of ${id} : ${err.message}`);
            }
        });
    }
    getCompletedOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = order_schema_1.default.find({ user_id: id }).where({ status: "complete" });
                return orders;
            }
            catch (err) {
                throw new Error(`unable to get orders cache order info of ${id} : ${err.message}`);
            }
        });
    }
    getActiveOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = order_schema_1.default.find({ user_id: id }).where({ status: "active" });
                return orders;
            }
            catch (err) {
                throw new Error(`unable to get orders cache order info of ${id} : ${err.message}`);
            }
        });
    }
    updateOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield order_schema_1.default.updateOne(order).where({ id: order.id });
                return data;
            }
            catch (err) {
                throw new Error(`unable to update cache order info of ${order.id} : ${err.message}`);
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_schema_1.default.deleteOne({ id: id });
                return order;
            }
            catch (err) {
                throw new Error(`unable to remove cache of order info of ${id} : ${err.message}`);
            }
        });
    }
}
exports.default = orderMongo;
