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
const mainBranch_mongo_1 = __importDefault(require("../mongo/mainBranch.mongo"));
const mainBranch_model_1 = __importDefault(require("../models/mainBranch.model"));
const cache = new mainBranch_mongo_1.default();
const model = new mainBranch_model_1.default();
class mainController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.create(req.body);
                if (config_1.default.activeMongo) {
                    yield cache.create(modelResult);
                }
                return res.json({
                    status: "success",
                    message: "Main Branch created successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    changeName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.changeName(req.body.id, req.body.name);
                if (config_1.default.activeMongo) {
                    yield cache.changeName(req.body.id, req.body.name);
                }
                return res.json({
                    status: "success",
                    message: "Main Branch updated successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getMenu(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield model.getMenu();
                return res.json({
                    status: "success",
                    data: data,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    changeState(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.changeState(req.body.id, req.body.status);
                if (config_1.default.activeMongo) {
                    yield cache.changeState(req.body.id, req.body.status);
                }
                return res.json({
                    status: "success",
                    message: "Main Branch updated successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.remove(req.params.id);
                if (config_1.default.activeMongo) {
                    yield cache.delete(req.params.id);
                }
                return res.json({
                    status: "success",
                    message: "Main Branch removed successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = mainController;
