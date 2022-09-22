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
const product_schema_1 = __importDefault(require("../schema/product.schema"));
class ProductMongo {
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productInfo = new product_schema_1.default(product);
                const create = yield productInfo.save();
                return create;
            }
            catch (err) {
                throw new Error(`unable to cache product info of ${product.id} : ${err.message}`);
            }
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_schema_1.default.findOne({ id: id });
                return product;
            }
            catch (err) {
                throw new Error(`unable to get product info of ${id} : ${err.message}`);
            }
        });
    }
    getAllProducts(skip, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let product;
                if (filter === "null") {
                    product = yield product_schema_1.default.find({}).limit(config_1.default.perPage).skip(skip);
                }
                else {
                    product = yield product_schema_1.default.find({
                        "branch_info.id": filter,
                    })
                        .limit(config_1.default.perPage)
                        .skip(skip);
                }
                return product;
            }
            catch (err) {
                throw new Error(`unable to get products info : ${err.message}`);
            }
        });
    }
    editProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield product_schema_1.default.updateOne(product).where({ id: product.id });
                return data;
            }
            catch (err) {
                throw new Error(`unable to update product info of ${product.id} : ${err.message}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield product_schema_1.default.deleteOne({ id: id });
                return user;
            }
            catch (err) {
                throw new Error(`unable to delete cache product info of ${id} : ${err.message}`);
            }
        });
    }
}
exports.default = ProductMongo;
