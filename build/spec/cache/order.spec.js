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
const order_mongo_1 = __importDefault(require("../../app/mongo/order.mongo"));
const config_1 = __importDefault(require("../../app/config"));
const model = new order_mongo_1.default();
const order = {
    id: "bkjhgbkjh",
    user_id: "hgfhn",
    products: [
        {
            id: "hgdhgc",
            quantity: 12,
        },
        {
            id: "gsfdgds",
            quantity: 9,
        },
        {
            id: "dfadcdz",
            quantity: 9,
        },
    ],
    city: "elmahalla elkopra",
    address: "32 mohammed abotahon street",
    country: "egypt",
    phone: "01094938462",
    postalCode: "+20",
    status: "active",
};
if (config_1.default.activeMongo) {
    describe("Testing (order cache model) mongo", function () {
        it("it expect new order created in orders from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.create(order);
            expect(model.create).toBeDefined;
            expect(create.city).toEqual(order.city);
        }));
        it("it expect get order from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.getOrder(order.id);
            expect(model.getOrder).toBeDefined;
            expect(create === null || create === void 0 ? void 0 : create.city).toEqual(order.city);
        }));
        it("it expect get orders from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.getUserOrders(order.user_id);
            expect(model.getUserOrders).toBeDefined;
            expect(create[0].city).toEqual(order.city);
        }));
        it("it expect get completed orders from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.getCompletedOrders(order.user_id);
            expect(model.getCompletedOrders).toBeDefined;
            expect(create.length).toEqual(0);
        }));
        it("it expect get active order from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.getActiveOrders(order.user_id);
            expect(model.getActiveOrders).toBeDefined;
            expect(create[0].city).toEqual(order.city);
        }));
        it("it expect remove order in orders from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.remove(order.id);
            expect(model.remove).toBeDefined;
            expect(create.deletedCount).toEqual(1);
        }));
    });
}
