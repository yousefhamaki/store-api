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
const user_model_1 = __importDefault(require("../../app/models/user.model"));
const model = new user_model_1.default();
const user = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki",
    email: "yousefhamaki3@gmail.com",
    password: "hamaki2603",
    rank: "user",
};
const user2 = {
    firstname: "yousef",
    lastname: "elsayed",
    username: "yousefhamaki",
    email: "yousefhamaki22@gmail.com",
    password: "hamaki2604",
};
describe("Testing user model", function () {
    it("it expect new user created", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.create(user);
        user.id = create.id;
        user2.id = create.id;
        expect(model.create).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.firstname).toBeDefined;
        expect(create.lastname).toBeDefined;
        expect(create.username).toBeDefined;
        expect(create.email).toBeDefined;
    }));
    it("expect (getAll users) return object contains users", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.getAll();
        expect(model.getAll).toBeDefined;
        expect(create).toBeDefined;
    }));
    it("expect (updateUser) return object contains users", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.updateUser(user2);
        expect(model.getUser).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.firstname).toBeDefined;
        expect(create.lastname).toBeDefined;
        expect(create.username).toBeDefined;
        expect(create.email).toBeDefined;
    }));
    it("expect (searchEmail) return object contains email of user", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.searchEmail(user2.email);
        expect(model.searchEmail).toBeDefined;
        expect(create.email).toBeDefined;
    }));
    it("expect (searchEmail) return object contains email of user", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.searchEmail("user2.email");
        expect(model.searchEmail).toBeDefined;
        expect(create).toBeUndefined;
    }));
    it("expect (searchUserName) return object contains username of user", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.searchUserName(user2.username);
        expect(model.searchUserName).toBeDefined;
        expect(create.username).toBeDefined;
    }));
    it("expect (searchUserName) return undefined", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.searchUserName("jkbjgjy");
        expect(model.searchUserName).toBeDefined;
        expect(create).toBeUndefined;
    }));
    it("expect (makeAuth) return boolean (true)", () => __awaiter(this, void 0, void 0, function* () {
        const auth = yield model.makeAuth(user.email, user.password);
        expect(model.makeAuth).toBeDefined;
        expect(auth).toBeDefined;
    }));
    it("expect (changePass) return boolean (true)", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.changePass(user.id, user.password, user2.password);
        expect(model.changePass).toBeDefined;
        expect(create).toBeTrue;
    }));
    it("expect (changePass) return boolean (false)", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.changePass(user.id, user.password, user2.password);
        expect(model.changePass).toBeDefined;
        expect(create).toBeFalse;
    }));
    it("expect (getuser) return object contains users", () => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.getUser(user.id);
        expect(model.getUser).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.firstname).toBeDefined;
        expect(create.lastname).toBeDefined;
        expect(create.username).toBeDefined;
        expect(create.email).toBeDefined;
    }));
    it("it expect user removed", () => __awaiter(this, void 0, void 0, function* () {
        const remove = yield model.deleteUser(user.id);
        expect(model.deleteUser).toBeDefined;
        expect(remove.firstname).toBeDefined;
        expect(remove.lastname).toBeDefined;
        expect(remove.username).toBeDefined;
        expect(remove.email).toBeDefined;
    }));
});
