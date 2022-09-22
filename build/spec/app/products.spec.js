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
const mainBranch_model_1 = __importDefault(require("../../app/models/mainBranch.model"));
const branch_model_1 = __importDefault(require("../../app/models/branch.model"));
const model = new user_model_1.default();
const mainBranchModel = new mainBranch_model_1.default();
const branchModel = new branch_model_1.default();
const request = (0, supertest_1.default)(server_1.default);
const admin = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki56",
    email: "admin@gmail.com",
    password: "Hamaki_26033",
    rank: "admin",
};
const user = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki576",
    email: "user@gmail.com",
    password: "Hamaki_26033",
    rank: "user",
};
const mainBranch = {
    name: "branch name for product",
    status: true,
};
const branch = {
    name: "first branch",
    status: true,
};
const product = {
    title: "product title",
    describtion: "product description",
    price: 50,
    isonsale: true,
    salePrice: 32,
    images: {
        main: "dnslnc-nslccx",
        branch: ["gjhgjh-lkn,b-kjb", "gvbj-khbvjhvb-lkjhkn", "jvj-jhkj-kbjk"],
    },
    features: ["first feature", "second feature", "third feature"],
    countinstroke: 50,
};
const editproduct = {
    title: "product title",
    describtion: "product description",
    price: 55,
    isonsale: false,
    salePrice: 32,
    images: {
        main: "dnslnc-nslccx",
        branch: ["gjhgjh-lkn,b-kjb", "gvbj-khbvjhvb-lkjhkn", "jvj-jhkj-kbjk"],
    },
    features: ["first feature", "second feature", "third feature"],
    countinstroke: 50,
};
const feature = {
    feature: "update feature",
};
describe("POST /api/product/admin/create", function () {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const create = yield model.create(admin);
        const res = yield request.post("/api/user/login").send(admin);
        admin.token = res.body.data.token;
        admin.id = create.id;
        const create2 = yield model.create(user);
        const res2 = yield request.post("/api/user/login").send(user);
        user.token = res2.body.data.token;
        user.id = create2.id;
        const main_branch = yield mainBranchModel.create(mainBranch);
        mainBranch.id = main_branch.id;
        branch.main = mainBranch.id;
        const branch_info = yield branchModel.create(branch);
        branch.id = branch_info.id;
        product.branch = branch_info.id;
        editproduct.branch = branch_info.id;
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/admin/create")
            .send(product)
            .set({ Authorization: admin.token });
        product.id = res.body.data.id;
        feature.product_id = res.body.data.id;
        editproduct.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/admin/create")
            .send(product)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/product/admin/create").send(product);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/admin/create")
            .send(admin)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("GET /api/product/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/product/" + product.id);
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `500`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/product/" + user.id);
        expect(res.status).toEqual(500);
        expect(typeof res.body).toBe("object");
    }));
});
describe("GET /api/product/:id/features", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/product/" + product.id + "/features");
        feature.id = res.body.data[0].id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/product/" + user.id + "/features");
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
        expect(res.body.data.length).toEqual(0);
    }));
});
describe("PUT /api/product/admin/add/feature", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/add/feature")
            .send({ product_id: product.id, feature: "add new feature" })
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/add/feature")
            .send({})
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/add/feature")
            .send({})
            .set({ Authorization: user.token });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.put("/api/product/admin/add/feature").send({});
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
describe("POST /api/product/getall", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "branch", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "titlez", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "titlea", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "price+", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "price-", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "branch_price-", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "branch_price+", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "sale", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "branch_sale+", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "branch_sale-", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "random", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "fgdgds", branch: branch.id, limit: 15 });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `500`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ filter: "branch", branch: mainBranch.id, limit: 15 });
        expect(res.status).toEqual(500);
        expect(typeof res.body).toBe("object");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ branch: branch.id, limit: 15 });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/getall")
            .send({ branch: branch.id });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/product/getall").send({ limit: 15 });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("PUT /api/product/admin/edit/product", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/edit/product")
            .send(editproduct)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/edit/product")
            .send({})
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/edit/product")
            .send(editproduct)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/edit/product")
            .send(editproduct);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
describe("PUT /api/product/admin/edit/feature", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/edit/feature")
            .send(feature)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/edit/feature")
            .send({})
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/edit/feature")
            .send(editproduct)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/product/admin/edit/feature")
            .send(editproduct);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
describe("DELETE /api/product/admin/feature/remove/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/product/admin/feature/remove/" + feature.id)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
    }));
});
describe("DELETE /api/product/admin/remove/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/product/admin/remove/" + product.id)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield model.deleteUser(admin.id);
        yield model.deleteUser(user.id);
        yield branchModel.remove(branch.id);
        yield mainBranchModel.remove(mainBranch.id);
    }));
});
