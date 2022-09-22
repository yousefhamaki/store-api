import mainBranch from "../../app/mongo/mainBranch.mongo";
import MainBranch from "../../app/types/mainBranch.type";
import config from "../../app/config";
const model = new mainBranch();

const branch = {
  id: "dfwefvcd",
  name: "first branch",
  status: true,
} as MainBranch;

if (config.activeMongo) {
  describe("Testing (mainBranch cache model) mongo", function () {
    it("it expect new branch created in main branch from cache", async () => {
      const create = await model.create(branch);

      expect(model.create).toBeDefined;
      expect(create.name).toEqual(branch.name);
    });

    it("it expect change branch state in main branch from cache", async () => {
      const create = await model.changeState(branch.id as string, false);

      expect(model.changeState).toBeDefined;
      expect(create.matchedCount).toEqual(1);
    });

    it("it expect change branch name in main branch from cache", async () => {
      const create = await model.changeName(
        branch.id as string,
        "edit branch name"
      );

      expect(model.changeName).toBeDefined;
      expect(create.matchedCount).toEqual(1);
    });

    it("it expect remove branch in main branch from cache", async () => {
      const create = await model.delete(branch.id as string);

      expect(model.delete).toBeDefined;
      expect(create.deletedCount).toEqual(1);
    });
  });
}
