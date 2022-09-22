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
const order_model_1 = __importDefault(require("../../app/models/order.model"));
const product_model_1 = __importDefault(require("../../app/models/product.model"));
const user_model_1 = __importDefault(require("../../app/models/user.model"));
const main = new mainBranch_model_1.default();
const branchmodel = new branch_model_1.default();
const productModel = new product_model_1.default();
const userModel = new user_model_1.default();
const model = new order_model_1.default();
const mainbranch = {
    name: "first branch",
    status: true,
};
const branch = {
    name: "first branch",
    status: true,
};
const product = {
    title: "first product",
    describtion: "this is description for the first product",
    price: 20,
    isonsale: true,
    salePrice: 12,
    images: {
        main: "dnakljnbdkdc.png",
        branch: ["djfbdfcds.jpg", "slkhnlvsd.png"],
    },
    features: ["first feature", "second feature", "third feature"],
    countinstroke: 25,
};
const product2 = {
    title: "second product",
    describtion: "this is description for the first product",
    price: 19,
    isonsale: false,
    salePrice: 13,
    images: {
        main: "dnakljnbdkdc.png",
        branch: ["djfbdfcds.jpg", "slkhnlvsd.png"],
    },
    features: ["first feature", "second feature", "third feature"],
    countinstroke: 25,
};
const user = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki",
    email: "yousefhamaki3@gmail.com",
    password: "hamaki2603",
    rank: "user",
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
describe("testing (orderModel)", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield main.create(mainbranch);
        branch.main = create.id;
        const create2 = yield branchmodel.create(branch);
        product.branch = create2.id;
        product2.branch = create2.id;
        const createProduct = yield productModel.create(product);
        product.id = createProduct[0].id;
        order.products[0] = {
            product_id: createProduct[0].id,
            quantity: 12,
        };
        const createProduct2 = yield productModel.create(product2);
        product2.id = createProduct2[0].id;
        order.products[1] = {
            product_id: createProduct2[0].id,
            quantity: 15,
        };
        const createUser = yield userModel.create(user);
        user.id = createUser.id;
        order.user_id = createUser.id;
    }));
    it("expect new order created", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.create(order);
        order.id = create[0].order_id;
        expect(model.create).toBeDefined;
        expect(create[0].id).toBeDefined;
        expect(create[0].order_id).toBeDefined;
    }));
    it("expect getting user orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getUserOrders(order.user_id);
        expect(model.getUserOrders).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.address).toEqual(order.address);
    }));
    it("expect getting user completed orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.completedOrders(order.user_id);
        expect(model.completedOrders).toBeDefined;
        expect(create[0]).toBeUndefined;
    }));
    it("expect getting active orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getActiveOrders();
        expect(model.getActiveOrders).toBeDefined;
        expect(create[0].status).toEqual("active");
    }));
    it("expect getting all orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllOrders(1);
        expect(model.getAllOrders).toBeDefined;
        expect(create.length).toEqual(1);
    }));
    it("expect getting all orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllOrders(2);
        expect(model.getAllOrders).toBeDefined;
        expect(create.length).toEqual(0);
    }));
    it("expect count rows in orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.countRows("orders");
        expect(model.countRows).toBeDefined;
        expect(create).toEqual(1);
    }));
    it("expect count rows in products", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.countRows("products");
        expect(model.countRows).toBeDefined;
        expect(create).toEqual(2);
    }));
    it("expect count rows in users", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.countRows("users");
        expect(model.countRows).toBeDefined;
        expect(create).toEqual(1);
    }));
    it("expect count rows in branches", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.countRows("branches");
        expect(model.countRows).toBeDefined;
        expect(create).toEqual(1);
    }));
    it("expect count rows in main_branches", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.countRows("main_branches");
        expect(model.countRows).toBeDefined;
        expect(create).toEqual(1);
    }));
    it("expect getting orders by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getOrder(order.id);
        expect(model.getOrder).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.address).toEqual(order.address);
    }));
    it("expect getting most selled by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.mostselled();
        expect(model.mostselled).toBeDefined;
        expect(Number(create[0].totalquantity)).toEqual(15);
    }));
    it("expect order removed", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.removeOrder(order.id);
        expect(model.removeOrder).toBeDefined;
        expect(create.phone).toEqual(order.phone);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield productModel.remove(product.id);
        yield productModel.remove(product2.id);
        yield userModel.deleteUser(user.id);
        yield branchmodel.remove(product.branch);
        yield main.remove(branch.main);
    }));
});
