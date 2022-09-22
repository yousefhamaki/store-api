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
const product_mongo_1 = __importDefault(require("../../app/mongo/product.mongo"));
const config_1 = __importDefault(require("../../app/config"));
const model = new product_mongo_1.default();
const product = {
    id: "dvsfvd",
    title: "first product",
    describtion: "this description for first product",
    images: {
        main: "fndvkjsdv.png",
        branch: ["fdncvslkdv.png", "dvcndslvkjsdv.png"],
    },
    isonsale: true,
    salePrice: 15,
    price: 20,
    features: ["first feature", "second feature"],
    branch_info: {
        id: "branch_id",
        name: "branch name",
        status: true,
    },
    countinstroke: 150,
};
const product2 = {
    id: "dvsfvd",
    title: "edit product",
    describtion: "this description for first product",
    images: {
        main: "fndvkjsdv.png",
        branch: ["fdncvslkdv.png", "dvcndslvkjsdv.png"],
    },
    isonsale: true,
    salePrice: 15,
    price: 20,
    features: ["edit feature", "second feature"],
    branch_info: {
        id: "branch_id",
        name: "branch name",
        status: true,
    },
    countinstroke: 150,
};
if (config_1.default.activeMongo) {
    describe("Testing (product cache model) mongo", function () {
        it("it expect new product created in products from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.create(product);
            expect(model.create).toBeDefined;
            expect(create.title).toEqual(product.title);
        }));
        it("it expect get product from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.getProduct(product.id);
            expect(model.getProduct).toBeDefined;
            expect(create === null || create === void 0 ? void 0 : create.title).toEqual(product.title);
        }));
        it("it expect get product from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.getAllProducts(0, "null");
            expect(model.getAllProducts).toBeDefined;
            expect(create.length).toEqual(1);
        }));
        it("it expect get product from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.getAllProducts(1, "null");
            expect(model.getAllProducts).toBeDefined;
            expect(create.length).toEqual(0);
        }));
        it("it expect get product from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.getAllProducts(0, "branch_id");
            expect(model.getAllProducts).toBeDefined;
            expect(create.length).toEqual(1);
        }));
        it("it expect update product from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.editProduct(product2);
            expect(model.editProduct).toBeDefined;
            expect(create.matchedCount).toEqual(1);
        }));
        it("it expect remove product in products from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.delete(product.id);
            expect(model.delete).toBeDefined;
            expect(create.deletedCount).toEqual(1);
        }));
    });
}
