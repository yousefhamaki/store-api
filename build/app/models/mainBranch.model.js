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
class mainBranch {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `INSERT INTO main_branches (name, status) values ($1, ${data.status}) returning *`;
                const result = yield connect.query(query, [data.name]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to create new branch : ${err.message}`);
            }
        });
    }
    changeState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `UPDATE main_branches SET status=${state} WHERE id=$1 returning *`;
                const result = yield connect.query(query, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to change state of branch (${id}) : ${err.message}`);
            }
        });
    }
    getBranch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT * FROM main_branches WHERE id=$1;`;
                const result = yield connect.query(query, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to get branch info of (${id}) : ${err.message}`);
            }
        });
    }
    getMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT c.id, c.name, c.status,
                    json_agg(
                      json_build_object(
                          'id', i.id,
                          'name', i.name,
                          'status', i.status
                      )
                    ) AS branches
              FROM main_branches AS c
                JOIN branches AS i ON i.main = c.id AND i.status=true AND c.status=true
              GROUP BY c.id, c.name, c.status;`;
                const result = yield connect.query(query);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get menu info : ${err.message}`);
            }
        });
    }
    changeName(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `UPDATE main_branches SET name=$1 WHERE id=$2 returning *`;
                const result = yield connect.query(query, [name, id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to change name of branch (${id}) : ${err.message}`);
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `DELETE FROM main_branches WHERE id=$1 returning *`;
                const result = yield connect.query(query, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to remove branch (${id}) : ${err.message}`);
            }
        });
    }
}
exports.default = mainBranch;
