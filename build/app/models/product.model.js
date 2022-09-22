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
const Connect_1 = __importDefault(require("../database/Connect"));
const createRelation_1 = __importDefault(require("../traits/createRelation"));
const filterProduct_1 = __importDefault(require("../traits/filterProduct"));
class productsModel {
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = (0, createRelation_1.default)(product);
                const result = yield connect.query(query);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not create product ${product.title} : ${err.message}`);
            }
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT  
                        products.id, products.title, products.price, 
                        products.describtion, products.isonSale, products.salePrice, 
                        products.branch, products.images, products.countinstroke,
                        product_features.id, product_features.feature
                          FROM products
                          INNER JOIN product_features
                              ON products.id = product_features.product_id
                          WHERE
                            products.id = $1;`;
                const result = yield connect.query(query, [id]);
                connect.release();
                const features = [];
                result.rows.forEach((data) => {
                    features[features.length] = data.feature;
                });
                const product = {
                    id: id,
                    title: result.rows[0].title,
                    price: result.rows[0].price,
                    describtion: result.rows[0].describtion,
                    isonsale: result.rows[0].isonsale,
                    salePrice: result.rows[0].saleprice,
                    branch: result.rows[0].branch,
                    countinstroke: result.rows[0].countinstroke,
                    images: result.rows[0].images,
                    features: features,
                };
                return product;
            }
            catch (err) {
                throw new Error(`Unable to get product ${id} : ${err.message}`);
            }
        });
    }
    getAllProducts(filter, branch, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = (0, filterProduct_1.default)(filter, branch);
                const connect = yield Connect_1.default.connect();
                const query = `SELECT  * FROM products${q}LIMIT $1;`;
                const result = yield connect.query(query, [limit]);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get products : ${err.message}`);
            }
        });
    }
    editProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `UPDATE products SET 
              title = $1 , describtion = $2 , price = $3, isonSale = $4, salePrice = $5 , 
              branch = $6 , images = $7 , countinstroke = $8
              WHERE id=$9  returning *;`;
                const result = yield connect.query(query, [
                    product.title,
                    product.describtion,
                    product.price,
                    product.isonsale,
                    product.salePrice,
                    product.branch,
                    JSON.stringify(product.images),
                    product.countinstroke,
                    product.id,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create product ${product.title} : ${err.message}`);
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `WITH product_features AS (
                DELETE from product_features WHERE product_id = $1 returning *
            )
            delete from products WHERE id=$1 returning *;`;
                const result = yield connect.query(query, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not remove product ${id} : ${err.message}`);
            }
        });
    }
    getFeatures(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT * FROM product_features WHERE product_id = $1;`;
                const result = yield connect.query(query, [id]);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get product features ${id} : ${err.message}`);
            }
        });
    }
    addFeature(feature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `INSERT INTO product_features (product_id, feature) values ($1, $2) returning *;`;
                const result = yield connect.query(query, [
                    feature.product_id,
                    feature.feature,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to get add feature to product ${feature.id} : ${err.message}`);
            }
        });
    }
    removeFeature(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `DELETE from product_features WHERE id = $1 returning *;`;
                const result = yield connect.query(query, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to get add feature to product ${id} : ${err.message}`);
            }
        });
    }
    editFeature(feature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `UPDATE product_features SET feature = $1 WHERE id=$2  returning *;`;
                const result = yield connect.query(query, [feature.feature, feature.id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create product ${feature.id} : ${err.message}`);
            }
        });
    }
}
exports.default = productsModel;
