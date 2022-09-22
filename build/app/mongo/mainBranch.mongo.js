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
const mainBranch_schema_1 = __importDefault(require("../schema/mainBranch.schema"));
const Branch_mongo_1 = __importDefault(require("./Branch.mongo"));
const Branch = new Branch_mongo_1.default();
class MainBranchMongo {
    create(info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const branch = new mainBranch_schema_1.default({
                    id: info.id,
                    name: info.name,
                    status: info.status,
                });
                const created = yield branch.save();
                return created;
            }
            catch (err) {
                throw new Error(`unable to cache branch info of ${info.name} : ${err.message}`);
            }
        });
    }
    changeState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const branch = yield mainBranch_schema_1.default
                    .updateOne({ status: state })
                    .where({ id: id });
                yield Branch.changeMainStatus(id, state);
                return branch;
            }
            catch (err) {
                throw new Error(`unable to update cache branch info of ${id} : ${err.message}`);
            }
        });
    }
    changeName(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const branch = yield mainBranch_schema_1.default
                    .updateOne({ name: name })
                    .where({ id: id });
                yield Branch.changeMainName(id, name);
                return branch;
            }
            catch (err) {
                throw new Error(`unable to update cache branch info of ${id} : ${err.message}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const branch = yield mainBranch_schema_1.default.deleteOne({ id: id });
                return branch;
            }
            catch (err) {
                throw new Error(`unable to delete cache branch info of ${id} : ${err.message}`);
            }
        });
    }
}
exports.default = MainBranchMongo;
