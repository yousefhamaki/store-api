import mainBranch from "../schema/mainBranch.schema";
import MainBranch from "../types/mainBranch.type";
import branchMongo from "./Branch.mongo";

const Branch = new branchMongo();

class MainBranchMongo {
  async create(info: MainBranch) {
    try {
      const branch = new mainBranch({
        id: info.id,
        name: info.name,
        status: info.status,
      });
      const created = await branch.save();

      return created;
    } catch (err) {
      throw new Error(
        `unable to cache branch info of ${info.name} : ${
          (err as Error).message
        }`
      );
    }
  }

  async changeState(id: string, state: boolean) {
    try {
      const branch = await mainBranch
        .updateOne({ status: state })
        .where({ id: id });

      await Branch.changeMainStatus(id, state);
      return branch;
    } catch (err) {
      throw new Error(
        `unable to update cache branch info of ${id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async changeName(id: string, name: string) {
    try {
      const branch = await mainBranch
        .updateOne({ name: name })
        .where({ id: id });

      await Branch.changeMainName(id, name);
      return branch;
    } catch (err) {
      throw new Error(
        `unable to update cache branch info of ${id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async delete(
    id: string
  ): Promise<{ deletedCount: number; acknowledged: boolean }> {
    try {
      const branch = await mainBranch.deleteOne({ id: id });
      return branch;
    } catch (err) {
      throw new Error(
        `unable to delete cache branch info of ${id} : ${
          (err as Error).message
        }`
      );
    }
  }
}

export default MainBranchMongo;
