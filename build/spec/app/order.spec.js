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
const product_model_1 = __importDefault(require("../../app/models/product.model"));
const model = new user_model_1.default();
const mainBranchModel = new mainBranch_model_1.default();
const productModel = new product_model_1.default();
const branchModel = new branch_model_1.default();
const request = (0, supertest_1.default)(server_1.default);
const user = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki576",
    email: "user@gmail.com",
    password: "Hamaki_26033",
    rank: "user",
};
const admin = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki56",
    email: "admin@gmail.com",
    password: "Hamaki_26033",
    rank: "admin",
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
    title: "product title2",
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
const order = {
    city: "elmahalla elkopra",
    address: "32 mohammed abotahon street",
    country: "egypt",
    phone: "01094938462",
    postalCode: "+20",
    status: "active",
    products: [],
    user_id: "",
};
const order2 = {
    city: "elmahalla elkopra",
    address: "32 mohammed abotahon street",
    country: "egypt",
    phone: "01094938462",
    postalCode: "+20",
    status: "active",
    products: [],
    user_id: "",
};
const order3 = {
    city: "elmahalla elkopra",
    address: "32 mohammed abotahon street",
    country: "egypt",
    phone: "01094938462",
    postalCode: "+20",
    status: "active",
    products: [],
    user_id: "",
};
describe("POST /api/order/add", function () {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const create2 = yield model.create(user);
        const res2 = yield request.post("/api/user/login").send(user);
        user.token = res2.body.data.token;
        user.id = create2.id;
        const createadmin = yield model.create(admin);
        const res = yield request.post("/api/user/login").send(admin);
        admin.token = res.body.data.token;
        admin.id = createadmin.id;
        const main_branch = yield mainBranchModel.create(mainBranch);
        mainBranch.id = main_branch.id;
        branch.main = mainBranch.id;
        const branch_info = yield branchModel.create(branch);
        branch.id = branch_info.id;
        product.branch = branch_info.id;
        editproduct.branch = branch_info.id;
        const product_info = yield productModel.create(product);
        product.id = product_info[0].id;
        order.products[0] = {
            product_id: product_info[0].id,
            quantity: 15,
        };
        order2.products[0] = {
            product_id: product_info[0].id,
            quantity: 15,
        };
        const product_info2 = yield productModel.create(editproduct);
        editproduct.id = product_info2[0].id;
        order3.products[0] = {
            product_id: product_info2[0].id,
            quantity: 15,
        };
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/order/add")
            .send(order)
            .set({ Authorization: user.token });
        order.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/order/add")
            .send(order2)
            .set({ Authorization: user.token });
        order2.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/order/add")
            .send(order3)
            .set({ Authorization: user.token });
        order3.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/order/add").send(product);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/order/add")
            .send(product)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("POST /api/product/mostselled", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/product/mostselled");
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
});
describe("GET /api/order/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/order/" + order.id)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/order/" + order.id);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
});
describe("GET /api/order/user/:id/completed", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/order/user/" + user.id + "/completed")
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/order/user/" + user.id + "/completed");
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
});
describe("GET /api/order/user/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/order/user/" + user.id)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/order/user/" + user.id);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
});
describe("GET /api/order/admin/active", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/order/admin/active")
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/order/admin/active");
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/order/admin/active")
            .set({ Authorization: user.token });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
describe("DELETE /api/order/remove/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/order/remove/" + order.id)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/order/remove/" + order2.id)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/order/remove/" + order3.id)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield productModel.remove(product.id);
        yield productModel.remove(editproduct.id);
        yield model.deleteUser(user.id);
        yield model.deleteUser(admin.id);
        yield branchModel.remove(branch.id);
        yield mainBranchModel.remove(mainBranch.id);
    }));
});
