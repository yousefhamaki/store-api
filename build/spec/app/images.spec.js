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
const supertest_1 = __importDefault(require("supertest"));
const user_model_1 = __importDefault(require("../../app/models/user.model"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const model = new user_model_1.default();
let image = "";
const fake = "f832131d-7ed8-4c21-af14-88d43b53d603";
const admin = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki56",
    email: "admin@gmail.com",
    password: "Hamaki_26033",
    rank: "admin",
};
describe("upload", function () {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.create(admin);
        const res = yield request.post("/api/user/login").send(admin);
        admin.token = res.body.data.token;
        admin.id = create.id;
    }));
    it("a file", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/images/upload")
            .attach("image", "db-relation.png")
            .set({ Authorization: admin.token });
        image = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(res.body.data.id).toBeDefined;
    }));
});
describe("getImage", function () {
    it("expect getting image by id", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/images/" + image);
        expect(res.status).toEqual(200);
        expect(res.headers["content-type"]).toEqual("image/png");
    }));
    it("expect getting error", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/images/" + fake);
        expect(res.status).toEqual(404);
    }));
    it("expect getting params error", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/images/hnkdf54b-dfffdbdv-dbb");
        expect(res.status).toEqual(412);
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield model.deleteUser(admin.id);
    }));
});
