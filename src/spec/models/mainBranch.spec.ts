import mainBranch from "../../app/models/mainBranch.model";
import MainBranch from "../../app/types/mainBranch.type";

const model = new mainBranch();

const branch = {
  name: "first branch",
  status: true,
} as MainBranch;

const branch2 = {
  name: "edit branch",
  status: false,
} as MainBranch;

describe("testing (mainBranch) model", function () {
  it("expect new branch create", async () => {
    const create = await model.create(branch);
    branch.id = create.id as string;

    expect(model.create).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.name).toBeDefined;
    expect(create.status).toBeDefined;
  });

  it("expect branch state changed to be false", async () => {
    const create = await model.changeState(branch.id as string, branch2.status);

    expect(model.changeState).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.name).toEqual(branch.name);
    expect(create.status).toBeFalse;
  });

  it("expect branch name changed", async () => {
    const create = await model.changeName(branch.id as string, branch2.name);

    expect(model.changeName).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.name).toEqual(branch2.name);
    expect(create.status).toBeFalse;
  });

  it("expect get branch info by id", async () => {
    const create = await model.getBranch(branch.id as string);

    expect(model.getBranch).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.name).toEqual(branch2.name);
    expect(create.status).toBeFalse;
  });

  it("expect get menu info", async () => {
    const create = await model.getMenu();

    expect(model.getMenu).toBeDefined;
    expect(create.length).toEqual(0);
    expect(create[0]).toBeUndefined;
  });

  it("expect branch removed", async () => {
    const create = await model.remove(branch.id as string);

    expect(model.remove).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.name).toEqual(branch2.name);
    expect(create.status).toBeFalse;
  });
});
