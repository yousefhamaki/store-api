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
const mainBranch_model_1 = __importDefault(require("../../app/models/mainBranch.model"));
const model = new mainBranch_model_1.default();
const branch = {
    name: "first branch",
    status: true,
};
const branch2 = {
    name: "edit branch",
    status: false,
};
describe("testing (mainBranch) model", function () {
    it("expect new branch create", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.create(branch);
        branch.id = create.id;
        expect(model.create).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.name).toBeDefined;
        expect(create.status).toBeDefined;
    }));
    it("expect branch state changed to be false", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.changeState(branch.id, branch2.status);
        expect(model.changeState).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.name).toEqual(branch.name);
        expect(create.status).toBeFalse;
    }));
    it("expect branch name changed", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.changeName(branch.id, branch2.name);
        expect(model.changeName).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.name).toEqual(branch2.name);
        expect(create.status).toBeFalse;
    }));
    it("expect get branch info by id", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.getBranch(branch.id);
        expect(model.getBranch).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.name).toEqual(branch2.name);
        expect(create.status).toBeFalse;
    }));
    it("expect get menu info", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.getMenu();
        expect(model.getMenu).toBeDefined;
        expect(create.length).toEqual(0);
        expect(create[0]).toBeUndefined;
    }));
    it("expect branch removed", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.remove(branch.id);
        expect(model.remove).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.name).toEqual(branch2.name);
        expect(create.status).toBeFalse;
    }));
});
