import ProductMongo from "../../app/mongo/product.mongo";
import Product from "../../app/types/product.type";
import config from "../../app/config";

const model = new ProductMongo();

const product = {
  id: "dvsfvd",
  title: "first product",
  describtion: "this description for first product",
  images: {
    main: "fndvkjsdv.png",
    branch: ["fdncvslkdv.png", "dvcndslvkjsdv.png"],
  },
  isonsale: true,
  salePrice: 15,
  price: 20,
  features: ["first feature", "second feature"],
  branch_info: {
    id: "branch_id",
    name: "branch name",
    status: true,
  },
  countinstroke: 150,
} as Product;

const product2 = {
  id: "dvsfvd",
  title: "edit product",
  describtion: "this description for first product",
  images: {
    main: "fndvkjsdv.png",
    branch: ["fdncvslkdv.png", "dvcndslvkjsdv.png"],
  },
  isonsale: true,
  salePrice: 15,
  price: 20,
  features: ["edit feature", "second feature"],
  branch_info: {
    id: "branch_id",
    name: "branch name",
    status: true,
  },
  countinstroke: 150,
} as Product;

if (config.activeMongo) {
  describe("Testing (product cache model) mongo", function () {
    it("it expect new product created in products from cache", async () => {
      const create = await model.create(product);

      expect(model.create).toBeDefined;
      expect(create.title).toEqual(product.title);
    });

    it("it expect get product from cache", async () => {
      const create = await model.getProduct(product.id as string);

      expect(model.getProduct).toBeDefined;
      expect(create?.title).toEqual(product.title);
    });

    it("it expect get product from cache", async () => {
      const create = await model.getAllProducts(0, "null");

      expect(model.getAllProducts).toBeDefined;
      expect(create.length).toEqual(1);
    });

    it("it expect get product from cache", async () => {
      const create = await model.getAllProducts(1, "null");

      expect(model.getAllProducts).toBeDefined;
      expect(create.length).toEqual(0);
    });

    it("it expect get product from cache", async () => {
      const create = await model.getAllProducts(0, "branch_id");

      expect(model.getAllProducts).toBeDefined;
      expect(create.length).toEqual(1);
    });

    it("it expect update product from cache", async () => {
      const create = await model.editProduct(product2);

      expect(model.editProduct).toBeDefined;
      expect(create.matchedCount).toEqual(1);
    });

    it("it expect remove product in products from cache", async () => {
      const create = await model.delete(product.id as string);

      expect(model.delete).toBeDefined;
      expect(create.deletedCount).toEqual(1);
    });
  });
}
