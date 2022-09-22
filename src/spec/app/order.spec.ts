import supertest from "supertest";
import app from "../../server";
import UserModel from "../../app/models/user.model";
import User from "../../app/types/user.type";
import Branch from "../../app/types/branch.type";
import MainBranchModel from "../../app/models/mainBranch.model";
import BranchModel from "../../app/models/branch.model";
import productsModel from "../../app/models/product.model";
import Product from "../../app/types/product.type";
import Order from "../../app/types/order.type";
import ProductOrder from "../../app/types/products_order";

const model = new UserModel();
const mainBranchModel = new MainBranchModel();
const productModel = new productsModel();
const branchModel = new BranchModel();
const request = supertest(app);

const user = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki576",
  email: "user@gmail.com",
  password: "Hamaki_26033",
  rank: "user",
} as User;

const admin = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki56",
  email: "admin@gmail.com",
  password: "Hamaki_26033",
  rank: "admin",
} as User;

const mainBranch = {
  name: "branch name for product",
  status: true,
} as Branch;

const branch = {
  name: "first branch",
  status: true,
} as Branch;

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
} as Product;

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
} as Product;

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

const order2 = {
  city: "elmahalla elkopra",
  address: "32 mohammed abotahon street",
  country: "egypt",
  phone: "01094938462",
  postalCode: "+20",
  status: "active",
  products: [],
  user_id: "",
} as Order;

const order3 = {
  city: "elmahalla elkopra",
  address: "32 mohammed abotahon street",
  country: "egypt",
  phone: "01094938462",
  postalCode: "+20",
  status: "active",
  products: [],
  user_id: "",
} as Order;

describe("POST /api/order/add", function () {
  beforeAll(async () => {
    const create2 = await model.create(user);
    const res2 = await request.post("/api/user/login").send(user);
    user.token = res2.body.data.token;
    user.id = create2.id;

    const createadmin = await model.create(admin);
    const res = await request.post("/api/user/login").send(admin);
    admin.token = res.body.data.token;
    admin.id = createadmin.id;

    const main_branch = await mainBranchModel.create(mainBranch);
    mainBranch.id = main_branch.id;
    branch.main = mainBranch.id as string;

    const branch_info = await branchModel.create(branch);
    branch.id = branch_info.id;
    product.branch = branch_info.id as string;
    editproduct.branch = branch_info.id as string;

    const product_info = await productModel.create(product);
    product.id = product_info[0].id;
    order.products[0] = {
      product_id: product_info[0].id as string,
      quantity: 15,
    } as ProductOrder;

    order2.products[0] = {
      product_id: product_info[0].id as string,
      quantity: 15,
    } as ProductOrder;

    const product_info2 = await productModel.create(editproduct);
    editproduct.id = product_info2[0].id;
    order3.products[0] = {
      product_id: product_info2[0].id as string,
      quantity: 15,
    } as ProductOrder;
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/order/add")
      .send(order)
      .set({ Authorization: user.token });

    order.id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/order/add")
      .send(order2)
      .set({ Authorization: user.token });

    order2.id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/order/add")
      .send(order3)
      .set({ Authorization: user.token });

    order3.id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.post("/api/order/add").send(product);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/order/add")
      .send(product)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("POST /api/product/mostselled", function () {
  it("returns status code `200`", async () => {
    const res = await request.get("/api/product/mostselled");

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });
});

describe("GET /api/order/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .get("/api/order/" + order.id)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.get("/api/order/" + order.id);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });
});

describe("GET /api/order/user/:id/completed", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .get("/api/order/user/" + user.id + "/completed")
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.get("/api/order/user/" + user.id + "/completed");

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });
});

describe("GET /api/order/user/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .get("/api/order/user/" + user.id)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.get("/api/order/user/" + user.id);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });
});

describe("GET /api/order/admin/active", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .get("/api/order/admin/active")
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.get("/api/order/admin/active");

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });

  it("returns status code `401`", async () => {
    const res = await request
      .get("/api/order/admin/active")
      .set({ Authorization: user.token });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

describe("DELETE /api/order/remove/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/order/remove/" + order.id)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
  });

  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/order/remove/" + order2.id)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
  });

  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/order/remove/" + order3.id)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
  });

  afterAll(async () => {
    await productModel.remove(product.id as string);
    await productModel.remove(editproduct.id as string);
    await model.deleteUser(user.id as string);
    await model.deleteUser(admin.id as string);
    await branchModel.remove(branch.id as string);
    await mainBranchModel.remove(mainBranch.id as string);
  });
});
