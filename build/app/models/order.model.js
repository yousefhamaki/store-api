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
const Connect_1 = __importDefault(require("../database/Connect"));
const orderQuery_1 = __importDefault(require("../traits/orderQuery"));
const resetOrder_1 = __importDefault(require("../traits/resetOrder"));
class orderModel {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = (0, orderQuery_1.default)(order);
                const result = yield connect.query(query);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not create order : ${err.message}`);
            }
        });
    }
    getUserOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT  
                      array_to_json(array_agg(products.*)) as products, 
                      orders.user_id, products_order.product_id,
                      orders.country, orders.address, orders.phone,
                      orders.postalCode, orders.status,
                      products_order.order_id  
                        FROM products
                        INNER JOIN products_order
                            ON products.id = products_order.product_id
                        INNER JOIN orders
                            ON orders.id = products_order.order_id
                        WHERE
                            orders.user_id = $1
                        AND
                            status='active'
                        GROUP BY
                            orders.user_id, products_order.product_id, products_order.order_id, orders.id
                        ORDER BY orders.id ASC;`;
                const result = yield connect.query(query, [user_id]);
                connect.release();
                if (result.rows.length > 0) {
                    return (0, resetOrder_1.default)(result.rows);
                }
                else {
                    return result.rows[0];
                }
            }
            catch (err) {
                throw new Error(`Unable to get orders of this user ${user_id} : ${err.message}`);
            }
        });
    }
    getOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT  
                      array_to_json(array_agg(products.*)) as products, 
                      orders.user_id, products_order.product_id,
                      orders.country, orders.address, orders.phone,
                      orders.postalCode, orders.status,
                      products_order.order_id  
                        FROM products
                        INNER JOIN products_order
                            ON products.id = products_order.product_id
                        INNER JOIN orders
                            ON orders.id = products_order.order_id
                        WHERE
                            orders.id = $1
                        GROUP BY
                            orders.user_id, products_order.product_id, products_order.order_id, orders.id
                        ORDER BY orders.id ASC;`;
                const result = yield connect.query(query, [id]);
                connect.release();
                if (result.rows.length > 0) {
                    return (0, resetOrder_1.default)(result.rows);
                }
                else {
                    return result.rows[0];
                }
            }
            catch (err) {
                throw new Error(`Could not get order ${id} : ${err.message}`);
            }
        });
    }
    completedOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT id, country, address, phone,postalCode, status, city
                      FROM orders
                      WHERE
                        user_id = $1
                      AND
                          status='complete'
                      ORDER BY id ASC;`;
                const result = yield connect.query(query, [user_id]);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get orders of this user ${user_id} : ${err.message}`);
            }
        });
    }
    getActiveOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT  
                      id, country, address, phone,postalCode, status, city
                        FROM orders
                        WHERE
                            status='active'
                        ORDER BY id ASC;`;
                const result = yield connect.query(query);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get active orders  : ${err.message}`);
            }
        });
    }
    removeOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `WITH products_order AS (
                DELETE from products_order WHERE order_id = $1 returning *
            )
            DELETE from orders WHERE id=$1 returning *;`;
                const result = yield connect.query(query, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not remove order : ${err.message}`);
            }
        });
    }
    mostselled() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT products_order.product_id, SUM(products_order.quantity) AS TotalQuantity,
                  products.title, products.images, products.price, products.isonsale,
                  products.branch, products.saleprice, branches.name AS branchName
                  from products_order
                  INNER JOIN products
                  ON products_order.product_id = products.id
                  INNER JOIN branches
                  ON branches.id = products.branch AND branches.status=true
                  GROUP BY products_order.product_id, products.id, branches.id
                  ORDER BY SUM(products_order.quantity) DESC
                  LIMIT 5;`;
                const result = yield connect.query(query);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get most products saled  : ${err.message}`);
            }
        });
    }
    getAllOrders(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const perPage = config_1.default.perPage;
                const skip = (page - 1) * perPage;
                const connect = yield Connect_1.default.connect();
                const query = `SELECT id, country, address, phone,postalCode, status, city
                    FROM orders ORDER BY id ASC LIMIT $1 OFFSET $2;`;
                const result = yield connect.query(query, [perPage, skip]);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get orders  : ${err.message}`);
            }
        });
    }
    countRows(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT count(*) FROM ${tableName};`;
                const result = yield connect.query(query);
                connect.release();
                return Number(result.rows[0].count);
            }
            catch (err) {
                throw new Error(`Unable to get orders  : ${err.message}`);
            }
        });
    }
    changeState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `UPDATE orders SET status=$1 WHERE id=$2 returning *;`;
                const result = yield connect.query(query, [state, id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to change order state  : ${err.message}`);
            }
        });
    }
}
exports.default = orderModel;
