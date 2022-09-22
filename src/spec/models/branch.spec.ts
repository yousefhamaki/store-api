import Branch from "../../app/types/branch.type";
import branchModel from "../../app/models/branch.model";
import mainBranch from "../../app/models/mainBranch.model";
import MainBranch from "../../app/types/mainBranch.type";

const main = new mainBranch();
const model = new branchModel();

const mainbranch = {
  name: "first main branch",
  status: true,
} as MainBranch;

const mainbranch2 = {
  name: "second main branch",
  status: true,
} as MainBranch;

const branch = {
  name: "first branch",
  status: true,
} as Branch;

const branchAdded = {
  name: "second branch",
  status: true,
} as Branch;

const branch2 = {
  name: "edit branch",
  status: false,
} as Branch;

describe("testing (branch) model", function () {
  beforeAll(async () => {
    const create = await main.create(mainbranch);
    branch.main = create.id as string;
    branchAdded.main = create.id as string;

    const create2 = await main.create(mainbranch2);
    mainbranch2.id = create2.id as string;
  });
  it("expect new branch create", async () => {
    const create = await model.create(branch);
    branch.id = create.id as string;

    expect(model.create).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.main).toBeDefined;
    expect(create.name).toBeDefined;
    expect(create.status).toBeDefined;
  });

  it("expect new branch create", async () => {
    const create = await model.create(branchAdded);
    branchAdded.id = create.id as string;

    expect(model.create).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.main).toBeDefined;
    expect(create.name).toBeDefined;
    expect(create.status).toBeDefined;
  });

  it("expect branch relation changed", async () => {
    const create = await model.changeRelation(
      branch.id as string,
      mainbranch2.id as string
    );

    expect(model.changeName).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.main).toEqual(mainbranch2.id as string);
    expect(create.name).toBeDefined;
    expect(create.status).toBeFalse;
  });

  it("expect get menu info", async () => {
    const create = await main.getMenu();

    expect(main.getMenu).toBeDefined;
    expect(create.length).toEqual(2);
    expect(create[0].branches).toBeDefined;
  });

  it("expect branch state changed to be false", async () => {
    const create = await model.changeState(branch.id as string, branch2.status);

    expect(model.changeState).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.main).toBeDefined;
    expect(create.name).toEqual(branch.name);
    expect(create.status).toBeFalse;
  });

  it("expect get menu info after change state to false", async () => {
    const create = await main.getMenu();

    expect(main.getMenu).toBeDefined;
    expect(create.length).toEqual(1);
    expect(create[0].branches).toBeDefined;
  });

  it("expect branch name changed", async () => {
    const create = await model.changeName(branch.id as string, branch2.name);

    expect(model.changeName).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.main).toBeDefined;
    expect(create.name).toEqual(branch2.name);
    expect(create.status).toBeFalse;
  });

  it("expect branch removed", async () => {
    const create = await model.remove(branch.id as string);

    expect(model.remove).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.main).toBeDefined;
    expect(create.name).toEqual(branch2.name);
    expect(create.status).toBeFalse;
  });

  it("expect branch removed", async () => {
    const create = await model.remove(branchAdded.id as string);

    expect(model.remove).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.main).toBeDefined;
    expect(create.name).toEqual(branchAdded.name);
    expect(create.status).toBeFalse;
  });

  afterAll(async () => {
    await main.remove(branch.main);
    await main.remove(mainbranch2.id as string);
  });
});
