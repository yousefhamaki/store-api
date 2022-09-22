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
const user_schema_1 = __importDefault(require("../schema/user.schema"));
const config_1 = __importDefault(require("../config"));
class UserMongo {
    create(info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new user_schema_1.default({
                    id: info.db_id,
                    firstname: info.firstname,
                    lastname: info.lastname,
                    username: info.username,
                    email: info.email,
                    rank: info.rank,
                });
                const created = yield user.save();
                return created;
            }
            catch (err) {
                throw new Error(`unable to cache user info of ${info.db_id} : ${err.message}`);
            }
        });
    }
    getAll(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = ((page - 1) * Number(config_1.default.perPage));
                const users = yield user_schema_1.default.find({}).limit(10).skip(skip);
                return users;
            }
            catch (err) {
                throw new Error(`unable to get users info of page ${page} : ${err.message}`);
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.default.findOne({ id: id });
                return user;
            }
            catch (err) {
                throw new Error(`unable to get user info of ${id} : ${err.message}`);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.default.deleteOne({ id: id });
                return user;
            }
            catch (err) {
                throw new Error(`unable to delete cache user info of ${id} : ${err.message}`);
            }
        });
    }
    updateInfo(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield user_schema_1.default.updateOne({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                }).where({ id: user.id });
                return info;
            }
            catch (err) {
                throw new Error(`unable to update user info of ${user.id} : ${err.message}`);
            }
        });
    }
    searchEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.default.findOne({ email: email });
                return user;
            }
            catch (err) {
                throw new Error(`unable to get data of ${email} : ${err.message}`);
            }
        });
    }
    searchUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.default.findOne({ username: username });
                return user;
            }
            catch (err) {
                throw new Error(`unable to get data of ${username} : ${err.message}`);
            }
        });
    }
}
exports.default = UserMongo;
