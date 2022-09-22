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
const server_1 = __importDefault(require("../../server"));
const user_model_1 = __importDefault(require("../../app/models/user.model"));
const model = new user_model_1.default();
const user = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki",
    email: "yousefhamaki4@gmail.com",
    password: "Hamaki_26033",
};
const admin = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki56",
    email: "admin@gmail.com",
    password: "Hamaki_26033",
    rank: "admin",
};
const anotherUser = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki2",
    email: "yousefhamaki9@gmail.com",
    password: "Hamaki_26033",
};
const adminUser = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki15",
    email: "admin2@gmail.com",
    password: "Hamaki_26033",
};
const user2 = {
    firstname: "yousef",
    lastname: "hamaki2",
    password: "Hamaki_26033",
};
const user3 = {
    email: "yousefhamaki7@gmail.com",
    password: "Hamaki_26033",
};
const newInfo = {
    firstname: "jo",
    lastname: "hamaki",
    username: "yousefhamaki",
    email: "yousefhamaki10@gmail.com",
    password: "Hamaki_26033",
};
const newInfo2 = {
    firstname: "jo",
};
const passinfo = {
    oldpass: "Hamaki_26033",
    newpass: "Hamaki_2604",
};
const request = (0, supertest_1.default)(server_1.default);
describe("POST /api/user/create", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/create").send(anotherUser);
        anotherUser.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/create").send(user);
        user.id = res.body.data.id;
        newInfo.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/create").send(user2);
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("POST /api/user/create (admin users)", function () {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.create(admin);
        const res = yield request.post("/api/user/login").send(admin);
        admin.token = res.body.data.token;
        admin.id = create.id;
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/user/admin/adduser")
            .send(adminUser)
            .set({ Authorization: admin.token });
        adminUser.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login").send(adminUser);
        adminUser.token = res.body.data.token;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/user/admin/adduser")
            .send(user2)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/admin/adduser").send(user3);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/user/admin/adduser")
            .send(user3)
            .set({ Authorization: "user.token" });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.message).toBeDefined;
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield model.deleteUser(admin.id);
    }));
});
describe("POST /api/user/login", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login").send(user);
        user.token = res.body.data.token;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login").send(anotherUser);
        anotherUser.token = res.body.data.token;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login").send(user2);
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login").send(user3);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("POST /api/user/admin/getall", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/user/admin/getall?page=1")
            .set({ Authorization: adminUser.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/user/admin/getall?page=1")
            .set({ Authorization: user.token });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(typeof res.body.message).toBeDefined;
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/user/admin/getall?page=1");
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
});
describe("put /api/user/change", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change")
            .send(newInfo)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
        expect(res.body.data.firstname).toBe(newInfo.firstname);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        newInfo2.id = newInfo.id;
        const res = yield request
            .put("/api/user/change")
            .send(newInfo2)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change")
            .send(newInfo)
            .set({ Authorization: adminUser.token });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(typeof res.body.message).toBeDefined;
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.put("/api/user/change").send(newInfo);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
});
describe("put /api/user/search/email/:email", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/user/search/email/" + user.email);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/user/search/email/" + newInfo.email);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("put /api/user/search/username/:username", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/user/search/username/" + user.username);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/user/search/username/" + newInfo.username);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("POST /api/user/info/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/user/info/" + user.id);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
});
describe("put /api/user/change/:id", function () {
    it("returns status code `200` and password changed", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change/" + user.id)
            .send(passinfo)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401` and authorization erroe", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change/" + user.id)
            .send(passinfo)
            .set({ Authorization: anotherUser.token });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.message).toBeDefined;
    }));
    it("returns status code `500`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change/" + user.id)
            .send(passinfo)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(500);
        expect(typeof res.body).toBe("object");
    }));
});
describe("DELETE /api/user/delete/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete(`/api/user/delete/${user.id}`)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete(`/api/user/admin/delete/${anotherUser.id}`)
            .set({ Authorization: adminUser.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete(`/api/user/delete/${adminUser.id}`)
            .set({ Authorization: adminUser.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/user/delete/25adad")
            .set({ Authorization: user.token + "sdwamdk" });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete(`/api/user/delete/${adminUser.id}`)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
