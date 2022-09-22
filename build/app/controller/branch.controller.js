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
const branch_model_1 = __importDefault(require("../models/branch.model"));
const mainBranch_model_1 = __importDefault(require("../models/mainBranch.model"));
const Branch_mongo_1 = __importDefault(require("../mongo/Branch.mongo"));
const model = new branch_model_1.default();
const Main = new mainBranch_model_1.default();
const cache = new Branch_mongo_1.default();
class BranchController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.create(req.body);
                if (config_1.default.activeMongo) {
                    const info = yield Main.getBranch(req.body.main);
                    modelResult.main_name = info.name;
                    modelResult.main_status = info.status;
                    yield cache.create(modelResult);
                }
                return res.json({
                    status: "success",
                    message: "Branch created successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    changeRelation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.changeRelation(req.body.id, req.body.main_id);
                if (config_1.default.activeMongo) {
                    const info = yield Main.getBranch(req.body.main_id);
                    yield cache.changeMain(req.params.id, req.params.main_id, info.name, info.status);
                }
                return res.json({
                    status: "success",
                    message: "Relation updated successfully",
                    data: modelResult,
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
                const modelResult = yield model.changeState(req.params.id, req.body.status);
                if (config_1.default.activeMongo) {
                    yield cache.changeState(req.params.id, req.body.status);
                }
                return res.json({
                    status: "success",
                    message: "State updated successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    changeName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelResult = yield model.changeName(req.params.id, req.body.name);
                if (config_1.default.activeMongo) {
                    yield cache.changeName(req.params.id, req.body.name);
                }
                return res.json({
                    status: "success",
                    message: "Name updated successfully",
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
                    message: "Branch deleted successfully",
                    data: modelResult,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = BranchController;
