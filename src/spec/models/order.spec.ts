import branchModel from "../../app/models/branch.model";
import mainBranch from "../../app/models/mainBranch.model";
import orderModel from "../../app/models/order.model";
import productsModel from "../../app/models/product.model";
import UserModel from "../../app/models/user.model";
import Branch from "../../app/types/branch.type";
import MainBranch from "../../app/types/mainBranch.type";
import Order from "../../app/types/order.type";
import Product from "../../app/types/product.type";
import ProductOrder from "../../app/types/products_order";
import User from "../../app/types/user.type";

const main = new mainBranch();
const branchmodel = new branchModel();
const productModel = new productsModel();
const userModel = new UserModel();
const model = new orderModel();

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
  salePrice: 12,
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

const user = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki",
  email: "yousefhamaki3@gmail.com",
  password: "hamaki2603",
  rank: "user",
} as User;

const order = {
  city: "elmahalla elkopra",
  address: "32 mohammed abotahon street",
  country: "egypt",
  phone: "01094938462",
  postalCode: "+20",
  status: "active",
  products: [],
  user_id: "",
} as Order;

describe("testing (orderModel)", () => {
  beforeAll(async () => {
    const create = await main.create(mainbranch);
    branch.main = create.id as string;

    const create2 = await branchmodel.create(branch);
    product.branch = create2.id as string;
    product2.branch = create2.id as string;

    const createProduct = await productModel.create(product);
    product.id = createProduct[0].id;
    order.products[0] = {
      product_id: createProduct[0].id as string,
      quantity: 12,
    } as ProductOrder;

    const createProduct2 = await productModel.create(product2);
    product2.id = createProduct2[0].id;
    order.products[1] = {
      product_id: createProduct2[0].id as string,
      quantity: 15,
    } as ProductOrder;

    const createUser = await userModel.create(user);
    user.id = createUser.id as string;
    order.user_id = createUser.id as string;
  });

  it("expect new order created", async () => {
    const create = await model.create(order);
    order.id = create[0].order_id;

    expect(model.create).toBeDefined;
    expect(create[0].id).toBeDefined;
    expect(create[0].order_id).toBeDefined;
  });

  it("expect getting user orders", async () => {
    const create = await model.getUserOrders(order.user_id);

    expect(model.getUserOrders).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.address).toEqual(order.address);
  });

  it("expect getting user completed orders", async () => {
    const create = await model.completedOrders(order.user_id);

    expect(model.completedOrders).toBeDefined;
    expect(create[0]).toBeUndefined;
  });

  it("expect getting active orders", async () => {
    const create = await model.getActiveOrders();

    expect(model.getActiveOrders).toBeDefined;
    expect(create[0].status).toEqual("active");
  });

  it("expect getting all orders", async () => {
    const create = await model.getAllOrders(1);

    expect(model.getAllOrders).toBeDefined;
    expect(create.length).toEqual(1);
  });

  it("expect getting all orders", async () => {
    const create = await model.getAllOrders(2);

    expect(model.getAllOrders).toBeDefined;
    expect(create.length).toEqual(0);
  });

  it("expect count rows in orders", async () => {
    const create = await model.countRows("orders");

    expect(model.countRows).toBeDefined;
    expect(create).toEqual(1);
  });

  it("expect count rows in products", async () => {
    const create = await model.countRows("products");

    expect(model.countRows).toBeDefined;
    expect(create).toEqual(2);
  });

  it("expect count rows in users", async () => {
    const create = await model.countRows("users");

    expect(model.countRows).toBeDefined;
    expect(create).toEqual(1);
  });

  it("expect count rows in branches", async () => {
    const create = await model.countRows("branches");

    expect(model.countRows).toBeDefined;
    expect(create).toEqual(1);
  });

  it("expect count rows in main_branches", async () => {
    const create = await model.countRows("main_branches");

    expect(model.countRows).toBeDefined;
    expect(create).toEqual(1);
  });

  it("expect getting orders by id", async () => {
    const create = await model.getOrder(order.id as string);

    expect(model.getOrder).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.address).toEqual(order.address);
  });

  it("expect getting most selled by id", async () => {
    const create = await model.mostselled();

    expect(model.mostselled).toBeDefined;
    expect(Number(create[0].totalquantity)).toEqual(15);
  });

  it("expect order removed", async () => {
    const create = await model.removeOrder(order.id as string);

    expect(model.removeOrder).toBeDefined;
    expect(create.phone).toEqual(order.phone);
  });

  afterAll(async () => {
    await productModel.remove(product.id as string);
    await productModel.remove(product2.id as string);
    await userModel.deleteUser(user.id as string);
    await branchmodel.remove(product.branch as string);
    await main.remove(branch.main);
  });
});
