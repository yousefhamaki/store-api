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
const Branch_mongo_1 = __importDefault(require("../../app/mongo/Branch.mongo"));
const config_1 = __importDefault(require("../../app/config"));
const model = new Branch_mongo_1.default();
const branch = {
    id: "dfwefvcd",
    name: "first branch",
    status: true,
    main: "hgcnhv",
    main_name: "jfhkdfvcdsf",
    main_status: true,
};
if (config_1.default.activeMongo) {
    describe("Testing (Branch cache model) mongo", function () {
        it("it expect new branch created in branch from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.create(branch);
            expect(model.create).toBeDefined;
            expect(create.name).toEqual(branch.name);
        }));
        it("it expect change branch state in branch from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.changeState(branch.id, false);
            expect(model.changeState).toBeDefined;
            expect(create.matchedCount).toEqual(1);
        }));
        it("it expect change branch name in branch from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.changeName(branch.id, "edit branch name");
            expect(model.changeName).toBeDefined;
            expect(create.matchedCount).toEqual(1);
        }));
        it("it expect change branch main_name in branch from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.changeMainName(branch.main, "new name");
            expect(model.changeMain).toBeDefined;
            expect(create.matchedCount).toEqual(1);
        }));
        it("it expect change branch main_state in branch from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.changeMainStatus(branch.main, true);
            expect(model.changeMain).toBeDefined;
            expect(create.matchedCount).toEqual(1);
        }));
        it("it expect change branch main_info in branch from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.changeMain(branch.id, "main_id", "name", false);
            expect(model.changeMain).toBeDefined;
            expect(create.matchedCount).toEqual(1);
        }));
        it("it expect remove branch in branch from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.delete(branch.id);
            expect(model.delete).toBeDefined;
            expect(create.deletedCount).toEqual(1);
        }));
    });
}
