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
const product_model_1 = __importDefault(require("../../app/models/product.model"));
const mainBranch_model_1 = __importDefault(require("../../app/models/mainBranch.model"));
const branch_model_1 = __importDefault(require("../../app/models/branch.model"));
const model = new product_model_1.default();
const main = new mainBranch_model_1.default();
const branchmodel = new branch_model_1.default();
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
    salePrice: 15,
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
const product3 = {
    title: "third product",
    describtion: "this is description for the first product",
    price: 21,
    isonsale: true,
    salePrice: 13,
    images: {
        main: "dnakljnbdkdc.png",
        branch: ["djfbdfcds.jpg", "slkhnlvsd.png"],
    },
    features: ["first feature", "second feature", "third feature"],
    countinstroke: 25,
};
const editProduct = {
    title: "edit product",
    describtion: "this is description for the edit product",
    price: 50,
    isonsale: false,
    salePrice: 13,
    images: {
        main: "dnakljnbdkdc.png",
        branch: ["djfbdfcds.jpg", "slkhnlvsd.png"],
    },
    countinstroke: 13,
};
const feature = {
    feature: "first feature",
};
describe("testing (productsModel)", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield main.create(mainbranch);
        branch.main = create.id;
        const create2 = yield branchmodel.create(branch);
        product.branch = create2.id;
        product2.branch = create2.id;
        product3.branch = create2.id;
        editProduct.branch = create2.id;
    }));
    it("expect new product created", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.create(product);
        product.id = create[0].id;
        editProduct.id = create[0].id;
        feature.product_id = create[0].id;
        expect(model.create).toBeDefined;
        expect(create[0].id).toBeDefined;
        expect(create[0].countinstroke).toEqual(product.countinstroke);
    }));
    it("expect new product created", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.create(product2);
        product2.id = create[0].id;
        expect(model.create).toBeDefined;
        expect(create[0].id).toBeDefined;
        expect(create[0].countinstroke).toEqual(product.countinstroke);
    }));
    it("expect new product created", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.create(product3);
        product3.id = create[0].id;
        expect(model.create).toBeDefined;
        expect(create[0].id).toBeDefined;
        expect(create[0].countinstroke).toEqual(product.countinstroke);
    }));
    it("expect getting product by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getProduct(product.id);
        expect(model.getProduct).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.branch).toEqual(product.branch);
    }));
    it("expect getting All products have branch id equal branch created in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllProducts("branch", product.branch, 15);
        expect(model.getAllProducts).toBeDefined;
        expect(create[0].id).toBeDefined;
        expect(create.length).toEqual(3);
    }));
    it("expect getting All products by branch order by price- in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllProducts("branch_price-", product.branch, 15);
        expect(model.getAllProducts).toBeDefined;
        expect(create[0].id).toEqual(product2.id);
        expect(create.length).toEqual(3);
    }));
    it("expect getting All products order by price- in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllProducts("price-", product.branch, 15);
        expect(model.getAllProducts).toBeDefined;
        expect(create[0].id).toEqual(product2.id);
        expect(create.length).toEqual(3);
    }));
    it("expect getting All products order by price+ in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllProducts("price+", product.branch, 15);
        expect(model.getAllProducts).toBeDefined;
        expect(create[0].id).toEqual(product3.id);
        expect(create.length).toEqual(3);
    }));
    it("expect getting All products order by titlea in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllProducts("titlea", product.branch, 15);
        expect(model.getAllProducts).toBeDefined;
        expect(create[0].id).toEqual(product.id);
        expect(create.length).toEqual(3);
    }));
    it("expect getting All products order by titlez in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllProducts("titlez", product.branch, 15);
        expect(model.getAllProducts).toBeDefined;
        expect(create[0].id).toEqual(product3.id);
        expect(create.length).toEqual(3);
    }));
    it("expect getting All products by branch order by price+ in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllProducts("branch_price+", product.branch, 15);
        expect(model.getAllProducts).toBeDefined;
        expect(create[0].id).toEqual(product3.id);
        expect(create.length).toEqual(3);
    }));
    it("expect getting All products is on sale in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllProducts("sale", product.branch, 15);
        expect(model.getAllProducts).toBeDefined;
        expect(create[0].id).toBeDefined;
        expect(create.length).toEqual(2);
    }));
    it("expect getting All products is on sale by sale price + in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllProducts("branch_sale+", product.branch, 15);
        expect(model.getAllProducts).toBeDefined;
        expect(create[0].id).toEqual(product.id);
        expect(create.length).toEqual(2);
    }));
    it("expect getting All products is on sale by sale price - in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAllProducts("branch_sale-", product.branch, 15);
        expect(model.getAllProducts).toBeDefined;
        expect(create[0].id).toEqual(product3.id);
        expect(create.length).toEqual(2);
    }));
    it("expect edit product info", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.editProduct(editProduct);
        expect(model.editProduct).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.countinstroke).toEqual(editProduct.countinstroke);
    }));
    it("expect add new feature", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.addFeature(feature);
        feature.id = create.id;
        expect(model.create).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.feature).toEqual(feature.feature);
    }));
    it("expect add new feature", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getFeatures(product.id);
        expect(model.getFeatures).toBeDefined;
        expect(create.length).toEqual(4);
    }));
    it("expect edit feature", () => __awaiter(void 0, void 0, void 0, function* () {
        feature.feature = "edit feature";
        const create = yield model.editFeature(feature);
        expect(model.create).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.feature).toEqual(feature.feature);
    }));
    it("expect remove feature", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.removeFeature(feature.id);
        expect(model.removeFeature).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.feature).toEqual(feature.feature);
    }));
    it("expect product removed", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.remove(product.id);
        expect(model.remove).toBeDefined;
        expect(create.id).toBeDefined;
    }));
    it("expect product removed", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.remove(product2.id);
        expect(model.remove).toBeDefined;
        expect(create.id).toBeDefined;
    }));
    it("expect product removed", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.remove(product3.id);
        expect(model.remove).toBeDefined;
        expect(create.id).toBeDefined;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield branchmodel.remove(product.branch);
        yield main.remove(branch.main);
    }));
});
