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
const checkPass_1 = __importDefault(require("../traits/checkPass"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_mongo_1 = __importDefault(require("../mongo/user.mongo"));
const model = new user_model_1.default();
const cache = new user_mongo_1.default();
class userController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validpass = yield (0, checkPass_1.default)(req.body.password);
            if (validpass.length < 3) {
                return res.status(505).json({
                    status: "validation failed",
                    message: "password is not valid",
                    data: {
                        type: "password",
                        info: validpass,
                    },
                });
            }
            try {
                req.body.rank = "user";
                if (req.user !== undefined) {
                    if (req.user.rank) {
                        req.body.rank = "admin";
                    }
                }
                const create = yield model.create(req.body);
                if (config_1.default.activeMongo) {
                    create.db_id = create.id;
                    const user = yield cache.create(create);
                    return res.json({
                        status: "success",
                        message: "User created successfully",
                        data: user,
                    });
                }
                return res.json({
                    status: "success",
                    message: "User created successfully",
                    data: create,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield model.makeAuth(email, password);
                if (!user) {
                    return res.status(401).json({
                        status: "failed",
                        message: "email or password is not correct",
                    });
                }
                const token = jsonwebtoken_1.default.sign({ user }, config_1.default.secretToken);
                return res.status(200).json({
                    status: "success",
                    message: "user is login successfully",
                    data: Object.assign(Object.assign({}, user), { token: "Bearer " + token }),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users;
                const page = Number(req.params.page) | 1;
                if (config_1.default.activeMongo) {
                    users = yield cache.getAll(page);
                }
                else {
                    users = yield model.getAll();
                }
                return res.json({
                    status: "success",
                    data: users,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user;
                if (config_1.default.activeMongo) {
                    user = yield cache.getUser(req.params.id);
                }
                else {
                    user = yield model.getUser(req.params.id);
                }
                if (!user) {
                    return res.json({
                        status: "failed",
                        message: "user isn't defined",
                    });
                }
                return res.json({
                    status: "success",
                    data: user,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateuserinfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const change = yield model.updateUser(req.body);
                if (config_1.default.activeMongo) {
                    yield cache.updateInfo(req.body);
                }
                return res.json({
                    status: "success",
                    message: "Your info is updated successfully",
                    data: Object.assign({}, change),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteInfo = yield model.deleteUser(req.params.id);
                if (config_1.default.activeMongo) {
                    yield cache.deleteUser(req.params.id);
                }
                return res.json({
                    status: "success",
                    message: "User is deleted successfully",
                    data: Object.assign({}, deleteInfo),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    changePass(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update = yield model.changePass((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.body.oldpass, req.body.newpass);
                if (update) {
                    return res.json({
                        status: "success",
                        message: "your password was changed successfully",
                    });
                }
                else {
                    throw new Error("old password is not correct");
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    searchEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let status;
                let message;
                let email;
                if (config_1.default.activeMongo) {
                    email = yield cache.searchEmail(req.params.email);
                }
                else {
                    email = yield model.searchEmail(req.params.email);
                }
                if (email === null || email === void 0 ? void 0 : email.email) {
                    status = "failed";
                    message = "email is already exist";
                }
                else {
                    status = "success";
                    message = "successful email";
                }
                return res.json({
                    status: status,
                    message: message,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    searchUserName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let status;
                let message;
                let username;
                if (config_1.default.activeMongo) {
                    username = yield cache.searchUserName(req.params.username);
                }
                else {
                    username = yield model.searchUserName(req.params.username);
                }
                if (username === null || username === void 0 ? void 0 : username.username) {
                    status = "failed";
                    message = "Username is already exist";
                }
                else {
                    status = "success";
                    message = "Successful username";
                }
                return res.json({
                    status: status,
                    message: message,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = userController;
