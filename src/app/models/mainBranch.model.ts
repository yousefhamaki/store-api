import MainBranch from "../types/mainBranch.type";
import db from "../database/Connect";

class mainBranch {
  //create new branch
  async create(data: MainBranch): Promise<MainBranch> {
    try {
      const connect = await db.connect();
      const query = `INSERT INTO main_branches (name, status) values ($1, ${data.status}) returning *`;
      const result = await connect.query(query, [data.name]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to create new branch : ${(err as Error).message}`
      );
    }
  }
  // change state of branch
  async changeState(id: string, state: boolean): Promise<MainBranch> {
    try {
      const connect = await db.connect();
      const query = `UPDATE main_branches SET status=${state} WHERE id=$1 returning *`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to change state of branch (${id}) : ${(err as Error).message}`
      );
    }
  }
  //get Branch By id
  async getBranch(id: string): Promise<MainBranch> {
    try {
      const connect = await db.connect();
      const query = `SELECT * FROM main_branches WHERE id=$1;`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to get branch info of (${id}) : ${(err as Error).message}`
      );
    }
  }
  //get menu
  async getMenu(): Promise<MainBranch[]> {
    try {
      const connect = await db.connect();
      const query = `SELECT c.id, c.name, c.status,
                    json_agg(
                      json_build_object(
                          'id', i.id,
                          'name', i.name,
                          'status', i.status
                      )
                    ) AS branches
              FROM main_branches AS c
                JOIN branches AS i ON i.main = c.id AND i.status=true AND c.status=true
              GROUP BY c.id, c.name, c.status;`;
      const result = await connect.query(query);
      //release connection
      connect.release();
      //return result
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get menu info : ${(err as Error).message}`);
    }
  }
  // change state of branch
  async changeName(id: string, name: string): Promise<MainBranch> {
    try {
      const connect = await db.connect();
      const query = `UPDATE main_branches SET name=$1 WHERE id=$2 returning *`;
      const result = await connect.query(query, [name, id]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to change name of branch (${id}) : ${(err as Error).message}`
      );
    }
  }
  //remove branch
  async remove(id: string): Promise<MainBranch> {
    try {
      const connect = await db.connect();
      const query = `DELETE FROM main_branches WHERE id=$1 returning *`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to remove branch (${id}) : ${(err as Error).message}`
      );
    }
  }
}

export default mainBranch;
