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
const user_mongo_1 = __importDefault(require("../../app/mongo/user.mongo"));
const config_1 = __importDefault(require("../../app/config"));
const model = new user_mongo_1.default();
const user = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki",
    email: "yousefhamaki3@gmail.com",
    rank: "user",
    db_id: "adfaefead",
};
const user2 = {
    firstname: "yousef",
    lastname: "hamaki",
    username: "yousef-hamaki",
    email: "yousefhamaki5@gmail.com",
    rank: "user",
    id: "adfaefead",
};
if (config_1.default.activeMongo) {
    describe("Testing (user cache model) mongo", function () {
        it("it expect new user created", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.create(user);
            user.id = create.id;
            expect(model.create).toBeDefined;
            expect(create.id).toBeDefined;
            expect(create.firstname).toBeDefined;
            expect(create.lastname).toBeDefined;
            expect(create.username).toBeDefined;
            expect(create.email).toBeDefined;
        }));
        it("it expect get users from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.getAll(1);
            expect(model.getAll).toBeDefined;
            expect(create.length).toBeGreaterThan(0);
        }));
        it("it expect get user by id from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.getUser(user.db_id);
            expect(model.getUser).toBeDefined;
            expect(create === null || create === void 0 ? void 0 : create.id).toBeDefined;
            expect(create === null || create === void 0 ? void 0 : create.firstname).toEqual(user.firstname);
            expect(create === null || create === void 0 ? void 0 : create.lastname).toEqual(user.lastname);
            expect(create === null || create === void 0 ? void 0 : create.username).toEqual(user.username);
            expect(create === null || create === void 0 ? void 0 : create.email).toEqual(user.email);
        }));
        it("it expect get user by username from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.searchUserName(user.username);
            expect(model.searchUserName).toBeDefined;
            expect(create === null || create === void 0 ? void 0 : create.id).toBeDefined;
            expect(create === null || create === void 0 ? void 0 : create.firstname).toEqual(user.firstname);
            expect(create === null || create === void 0 ? void 0 : create.lastname).toEqual(user.lastname);
            expect(create === null || create === void 0 ? void 0 : create.username).toEqual(user.username);
            expect(create === null || create === void 0 ? void 0 : create.email).toEqual(user.email);
        }));
        it("it expect get user by email from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.searchEmail(user.email);
            expect(model.searchEmail).toBeDefined;
            expect(create === null || create === void 0 ? void 0 : create.id).toBeDefined;
            expect(create === null || create === void 0 ? void 0 : create.firstname).toEqual(user.firstname);
            expect(create === null || create === void 0 ? void 0 : create.lastname).toEqual(user.lastname);
            expect(create === null || create === void 0 ? void 0 : create.username).toEqual(user.username);
            expect(create === null || create === void 0 ? void 0 : create.email).toEqual(user.email);
        }));
        it("it expect get user by username from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.searchUserName("user.username");
            expect(model.searchUserName).toBeDefined;
            expect(create).toBeNull;
        }));
        it("it expect get user by email from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.searchEmail("user.email");
            expect(model.searchEmail).toBeDefined;
            expect(create).toBeNull;
        }));
        it("it expect update user by id from cache", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.updateInfo(user2);
            expect(model.updateInfo).toBeDefined;
            expect(create.matchedCount).toEqual(1);
        }));
        it("it expect user removed", () => __awaiter(this, void 0, void 0, function* () {
            const create = yield model.deleteUser(user.db_id);
            expect(model.deleteUser).toBeDefined;
            expect(create.deletedCount).toEqual(1);
        }));
    });
}
