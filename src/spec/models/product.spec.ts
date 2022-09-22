import Product from "../../app/types/product.type";
import productsModel from "../../app/models/product.model";
import mainBranch from "../../app/models/mainBranch.model";
import branchModel from "../../app/models/branch.model";
import Branch from "../../app/types/branch.type";
import MainBranch from "../../app/types/mainBranch.type";
import Feature from "../../app/types/Feature.type";

const model = new productsModel();
const main = new mainBranch();
const branchmodel = new branchModel();

const mainbranch = {
  name: "first branch",
  status: true,
} as MainBranch;

const branch = {
  name: "first branch",
  status: true,
} as Branch;

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
} as Product;

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
} as Product;

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
} as Product;

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
} as Product;

const feature = {
  feature: "first feature",
} as Feature;

describe("testing (productsModel)", () => {
  beforeAll(async () => {
    const create = await main.create(mainbranch);
    branch.main = create.id as string;

    const create2 = await branchmodel.create(branch);
    product.branch = create2.id as string;
    product2.branch = create2.id as string;
    product3.branch = create2.id as string;
    editProduct.branch = create2.id as string;
  });

  it("expect new product created", async () => {
    const create = await model.create(product);
    product.id = create[0].id;
    editProduct.id = create[0].id;
    feature.product_id = create[0].id as string;

    expect(model.create).toBeDefined;
    expect(create[0].id).toBeDefined;
    expect(create[0].countinstroke).toEqual(product.countinstroke);
  });

  it("expect new product created", async () => {
    const create = await model.create(product2);
    product2.id = create[0].id;

    expect(model.create).toBeDefined;
    expect(create[0].id).toBeDefined;
    expect(create[0].countinstroke).toEqual(product.countinstroke);
  });

  it("expect new product created", async () => {
    const create = await model.create(product3);
    product3.id = create[0].id;

    expect(model.create).toBeDefined;
    expect(create[0].id).toBeDefined;
    expect(create[0].countinstroke).toEqual(product.countinstroke);
  });

  it("expect getting product by id", async () => {
    const create = await model.getProduct(product.id as string);

    expect(model.getProduct).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.branch).toEqual(product.branch);
  });

  it("expect getting All products have branch id equal branch created in db", async () => {
    const create = await model.getAllProducts("branch", product.branch, 15);

    expect(model.getAllProducts).toBeDefined;
    expect(create[0].id).toBeDefined;
    expect(create.length).toEqual(3);
  });

  it("expect getting All products by branch order by price- in db", async () => {
    const create = await model.getAllProducts(
      "branch_price-",
      product.branch,
      15
    );

    expect(model.getAllProducts).toBeDefined;
    expect(create[0].id).toEqual(product2.id);
    expect(create.length).toEqual(3);
  });

  it("expect getting All products order by price- in db", async () => {
    const create = await model.getAllProducts("price-", product.branch, 15);

    expect(model.getAllProducts).toBeDefined;
    expect(create[0].id).toEqual(product2.id);
    expect(create.length).toEqual(3);
  });

  it("expect getting All products order by price+ in db", async () => {
    const create = await model.getAllProducts("price+", product.branch, 15);

    expect(model.getAllProducts).toBeDefined;
    expect(create[0].id).toEqual(product3.id);
    expect(create.length).toEqual(3);
  });

  it("expect getting All products order by titlea in db", async () => {
    const create = await model.getAllProducts("titlea", product.branch, 15);

    expect(model.getAllProducts).toBeDefined;
    expect(create[0].id).toEqual(product.id);
    expect(create.length).toEqual(3);
  });

  it("expect getting All products order by titlez in db", async () => {
    const create = await model.getAllProducts("titlez", product.branch, 15);

    expect(model.getAllProducts).toBeDefined;
    expect(create[0].id).toEqual(product3.id);
    expect(create.length).toEqual(3);
  });

  it("expect getting All products by branch order by price+ in db", async () => {
    const create = await model.getAllProducts(
      "branch_price+",
      product.branch,
      15
    );

    expect(model.getAllProducts).toBeDefined;
    expect(create[0].id).toEqual(product3.id);
    expect(create.length).toEqual(3);
  });

  it("expect getting All products is on sale in db", async () => {
    const create = await model.getAllProducts("sale", product.branch, 15);

    expect(model.getAllProducts).toBeDefined;
    expect(create[0].id).toBeDefined;
    expect(create.length).toEqual(2);
  });

  it("expect getting All products is on sale by sale price + in db", async () => {
    const create = await model.getAllProducts(
      "branch_sale+",
      product.branch,
      15
    );

    expect(model.getAllProducts).toBeDefined;
    expect(create[0].id).toEqual(product.id);
    expect(create.length).toEqual(2);
  });

  it("expect getting All products is on sale by sale price - in db", async () => {
    const create = await model.getAllProducts(
      "branch_sale-",
      product.branch,
      15
    );

    expect(model.getAllProducts).toBeDefined;
    expect(create[0].id).toEqual(product3.id);
    expect(create.length).toEqual(2);
  });

  it("expect edit product info", async () => {
    const create = await model.editProduct(editProduct);

    expect(model.editProduct).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.countinstroke).toEqual(editProduct.countinstroke);
  });

  it("expect add new feature", async () => {
    const create = await model.addFeature(feature);
    feature.id = create.id;

    expect(model.create).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.feature).toEqual(feature.feature);
  });

  it("expect add new feature", async () => {
    const create = await model.getFeatures(product.id as string);

    expect(model.getFeatures).toBeDefined;
    expect(create.length).toEqual(4);
  });

  it("expect edit feature", async () => {
    feature.feature = "edit feature";
    const create = await model.editFeature(feature);

    expect(model.create).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.feature).toEqual(feature.feature);
  });

  it("expect remove feature", async () => {
    const create = await model.removeFeature(feature.id as string);

    expect(model.removeFeature).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.feature).toEqual(feature.feature);
  });

  it("expect product removed", async () => {
    const create = await model.remove(product.id as string);

    expect(model.remove).toBeDefined;
    expect(create.id).toBeDefined;
  });

  it("expect product removed", async () => {
    const create = await model.remove(product2.id as string);

    expect(model.remove).toBeDefined;
    expect(create.id).toBeDefined;
  });

  it("expect product removed", async () => {
    const create = await model.remove(product3.id as string);

    expect(model.remove).toBeDefined;
    expect(create.id).toBeDefined;
  });

  afterAll(async () => {
    await branchmodel.remove(product.branch as string);
    await main.remove(branch.main);
  });
});
