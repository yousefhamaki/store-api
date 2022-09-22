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
const branch_model_1 = __importDefault(require("../../app/models/branch.model"));
const mainBranch_model_1 = __importDefault(require("../../app/models/mainBranch.model"));
const main = new mainBranch_model_1.default();
const model = new branch_model_1.default();
const mainbranch = {
    name: "first main branch",
    status: true,
};
const mainbranch2 = {
    name: "second main branch",
    status: true,
};
const branch = {
    name: "first branch",
    status: true,
};
const branchAdded = {
    name: "second branch",
    status: true,
};
const branch2 = {
    name: "edit branch",
    status: false,
};
describe("testing (branch) model", function () {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const create = yield main.create(mainbranch);
        branch.main = create.id;
        branchAdded.main = create.id;
        const create2 = yield main.create(mainbranch2);
        mainbranch2.id = create2.id;
    }));
    it("expect new branch create", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.create(branch);
        branch.id = create.id;
        expect(model.create).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.main).toBeDefined;
        expect(create.name).toBeDefined;
        expect(create.status).toBeDefined;
    }));
    it("expect new branch create", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.create(branchAdded);
        branchAdded.id = create.id;
        expect(model.create).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.main).toBeDefined;
        expect(create.name).toBeDefined;
        expect(create.status).toBeDefined;
    }));
    it("expect branch relation changed", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.changeRelation(branch.id, mainbranch2.id);
        expect(model.changeName).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.main).toEqual(mainbranch2.id);
        expect(create.name).toBeDefined;
        expect(create.status).toBeFalse;
    }));
    it("expect get menu info", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield main.getMenu();
        expect(main.getMenu).toBeDefined;
        expect(create.length).toEqual(2);
        expect(create[0].branches).toBeDefined;
    }));
    it("expect branch state changed to be false", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.changeState(branch.id, branch2.status);
        expect(model.changeState).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.main).toBeDefined;
        expect(create.name).toEqual(branch.name);
        expect(create.status).toBeFalse;
    }));
    it("expect get menu info after change state to false", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield main.getMenu();
        expect(main.getMenu).toBeDefined;
        expect(create.length).toEqual(1);
        expect(create[0].branches).toBeDefined;
    }));
    it("expect branch name changed", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.changeName(branch.id, branch2.name);
        expect(model.changeName).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.main).toBeDefined;
        expect(create.name).toEqual(branch2.name);
        expect(create.status).toBeFalse;
    }));
    it("expect branch removed", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.remove(branch.id);
        expect(model.remove).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.main).toBeDefined;
        expect(create.name).toEqual(branch2.name);
        expect(create.status).toBeFalse;
    }));
    it("expect branch removed", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.remove(branchAdded.id);
        expect(model.remove).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.main).toBeDefined;
        expect(create.name).toEqual(branchAdded.name);
        expect(create.status).toBeFalse;
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield main.remove(branch.main);
        yield main.remove(mainbranch2.id);
    }));
});
