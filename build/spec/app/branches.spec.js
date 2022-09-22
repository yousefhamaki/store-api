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
const request = (0, supertest_1.default)(server_1.default);
const admin = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki56",
    email: "admin@gmail.com",
    password: "Hamaki_26033",
    rank: "admin",
};
const mainBranch = {
    name: "branch name",
    status: true,
};
const mainBranch3 = {
    name: "branch2 name",
    status: true,
};
const mainBranch2 = {
    name: "branch name",
};
const branch = {
    name: "first branch",
    status: true,
};
describe("POST /api/branch/main/create", function () {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.create(admin);
        const res = yield request.post("/api/user/login").send(admin);
        admin.token = res.body.data.token;
        admin.id = create.id;
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/branch/admin/main/create")
            .send(mainBranch)
            .set({ Authorization: admin.token });
        mainBranch.id = res.body.data.id;
        branch.main = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/branch/admin/main/create")
            .send(mainBranch3)
            .set({ Authorization: admin.token });
        mainBranch3.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `500`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/branch/admin/main/create")
            .send({ name: mainBranch.id, status: "falhellose" })
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(500);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(500);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/branch/admin/main/create")
            .send(mainBranch);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/branch/admin/main/create")
            .send(mainBranch2)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("POST /api/branch/create", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/branch/admin/create")
            .send(branch)
            .set({ Authorization: admin.token });
        branch.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `500`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/branch/admin/create")
            .send({
            name: mainBranch.id,
            status: "falhellose",
            main: "djkskcndsc-dvsdvs",
        })
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(500);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(500);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/branch/admin/create").send(branch);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/branch/admin/create")
            .send({})
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("PUT /api/branch/main/change/name", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/main/change/name")
            .send({ id: mainBranch.id, name: "new name" })
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/main/change/name")
            .send({ id: mainBranch.id, name: "new name" });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/main/change/name")
            .send(mainBranch2)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("PUT /api/branch/menu", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/branch/menu");
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
});
describe("PUT /api/branch/change/name", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/change/name")
            .send({ id: branch.id, name: "new name" })
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/change/name")
            .send({ id: branch.id, name: "new name" });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/change/name")
            .send(mainBranch2)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("PUT /api/branch/change/state", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/change/state")
            .send({ id: branch.id, status: false })
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/change/state")
            .send({ id: branch.id, status: "new name" });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/change/state")
            .send(mainBranch2)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("PUT /api/branch/change/relation", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/change/relation")
            .send({ id: branch.id, main_id: mainBranch3.id })
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/change/relation")
            .send({ id: branch.id, status: "new name" });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/change/relation")
            .send(mainBranch2)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("PUT /api/branch/main/change/state", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/main/change/state")
            .send({ id: mainBranch.id, status: "false" })
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `500`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/main/change/state")
            .send({ id: mainBranch.id, status: "falhellose" })
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(500);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(500);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/main/change/state")
            .send({ id: mainBranch.id, status: false });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/branch/admin/main/change/state")
            .send(mainBranch2)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("DELETE /api/branch/main/create", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/branch/admin/remove/" + branch.id)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/branch/admin/main/remove/" + mainBranch.id)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/branch/admin/main/remove/" + mainBranch3.id)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield model.deleteUser(admin.id);
    }));
});
