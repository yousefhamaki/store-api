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
class imagesModel {
    upload(content, size, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `INSERT INTO images (content, size, type) values ($1, $2, $3) returning id, size`;
                const result = yield connect.query(query, [content, size, type]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to upload this file : ${err.message}`);
            }
        });
    }
    getImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT * FROM images WHERE id=$1`;
                const result = yield connect.query(query, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to get this file : ${err.message}`);
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `DELETE FROM images WHERE id=$1 returning *`;
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
exports.default = imagesModel;
