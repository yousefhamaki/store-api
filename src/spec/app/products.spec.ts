import supertest from "supertest";
import app from "../../server";
import UserModel from "../../app/models/user.model";
import User from "../../app/types/user.type";
import Branch from "../../app/types/branch.type";
import MainBranchModel from "../../app/models/mainBranch.model";
import BranchModel from "../../app/models/branch.model";
import Product from "../../app/types/product.type";
import Feature from "../../app/types/Feature.type";

const model = new UserModel();
const mainBranchModel = new MainBranchModel();
const branchModel = new BranchModel();
const request = supertest(app);

const admin = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki56",
  email: "admin@gmail.com",
  password: "Hamaki_26033",
  rank: "admin",
} as User;

const user = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki576",
  email: "user@gmail.com",
  password: "Hamaki_26033",
  rank: "user",
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
} as Product;

const feature = {
  feature: "update feature",
} as Feature;

describe("POST /api/product/admin/create", function () {
  beforeAll(async () => {
    const create = await model.create(admin);
    const res = await request.post("/api/user/login").send(admin);

    admin.token = res.body.data.token;
    admin.id = create.id;

    const create2 = await model.create(user);
    const res2 = await request.post("/api/user/login").send(user);
    user.token = res2.body.data.token;
    user.id = create2.id;

    const main_branch = await mainBranchModel.create(mainBranch);
    mainBranch.id = main_branch.id;
    branch.main = mainBranch.id as string;

    const branch_info = await branchModel.create(branch);
    branch.id = branch_info.id;
    product.branch = branch_info.id as string;
    editproduct.branch = branch_info.id as string;
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/admin/create")
      .send(product)
      .set({ Authorization: admin.token });

    product.id = res.body.data.id;
    feature.product_id = res.body.data.id;
    editproduct.id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .post("/api/product/admin/create")
      .send(product)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });

  it("returns status code `401`", async () => {
    const res = await request.post("/api/product/admin/create").send(product);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/product/admin/create")
      .send(admin)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("GET /api/product/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request.get("/api/product/" + product.id);

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `500`", async () => {
    const res = await request.get("/api/product/" + user.id);

    expect(res.status).toEqual(500);
    expect(typeof res.body).toBe("object");
  });

  // it("returns status code `500`", async () => {
  //   const res = await request.get("/api/product/fwgf-gfsgvf");

  //   expect(res.status).toEqual(500);
  //   expect(typeof res.body).toBe("object");
  // });
});

describe("GET /api/product/:id/features", function () {
  it("returns status code `200`", async () => {
    const res = await request.get("/api/product/" + product.id + "/features");

    feature.id = res.body.data[0].id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request.get("/api/product/" + user.id + "/features");

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
    expect(res.body.data.length).toEqual(0);
  });
});

describe("PUT /api/product/admin/add/feature", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/product/admin/add/feature")
      .send({ product_id: product.id, feature: "add new feature" })
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/product/admin/add/feature")
      .send({})
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/product/admin/add/feature")
      .send({})
      .set({ Authorization: user.token });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });

  it("returns status code `401`", async () => {
    const res = await request.put("/api/product/admin/add/feature").send({});

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

describe("POST /api/product/getall", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "branch", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "titlez", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "titlea", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "price+", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "price-", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "branch_price-", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "branch_price+", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "sale", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "branch_sale+", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "branch_sale-", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "random", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "fgdgds", branch: branch.id, limit: 15 });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `500`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ filter: "branch", branch: mainBranch.id, limit: 15 });

    expect(res.status).toEqual(500);
    expect(typeof res.body).toBe("object");
  });

  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ branch: branch.id, limit: 15 });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });

  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/product/getall")
      .send({ branch: branch.id });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });

  it("returns status code `412`", async () => {
    const res = await request.post("/api/product/getall").send({ limit: 15 });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("PUT /api/product/admin/edit/product", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/product/admin/edit/product")
      .send(editproduct)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/product/admin/edit/product")
      .send({})
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/product/admin/edit/product")
      .send(editproduct)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/product/admin/edit/product")
      .send(editproduct);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

describe("PUT /api/product/admin/edit/feature", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/product/admin/edit/feature")
      .send(feature)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/product/admin/edit/feature")
      .send({})
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/product/admin/edit/feature")
      .send(editproduct)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/product/admin/edit/feature")
      .send(editproduct);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

describe("DELETE /api/product/admin/feature/remove/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/product/admin/feature/remove/" + feature.id)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
  });
});

describe("DELETE /api/product/admin/remove/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/product/admin/remove/" + product.id)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
  });

  afterAll(async () => {
    await model.deleteUser(admin.id as string);
    await model.deleteUser(user.id as string);
    await branchModel.remove(branch.id as string);
    await mainBranchModel.remove(mainBranch.id as string);
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
