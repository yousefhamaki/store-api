import Branch from "../types/branch.type";
import db from "../database/Connect";

class branch {
  //create new branch
  async create(data: Branch): Promise<Branch> {
    try {
      const connect = await db.connect();
      const query = `INSERT INTO branches (name, status, main) values ($1, ${data.status}, $2) returning *`;
      const result = await connect.query(query, [data.name, data.main]);
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
  //change relation
  async changeRelation(id: string, relation: string): Promise<Branch> {
    try {
      const connect = await db.connect();
      const query = `UPDATE branches SET main=$1 WHERE id=$2 returning *`;
      const result = await connect.query(query, [relation, id]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to change relation of branch (${id}) : ${
          (err as Error).message
        }`
      );
    }
  }
  // change state of branch
  async changeState(id: string, state: boolean): Promise<Branch> {
    try {
      const connect = await db.connect();
      const query = `UPDATE branches SET status=${state} WHERE id=$1 returning *`;
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
  //get branch by id
  async getBranch(id: string): Promise<Branch> {
    try {
      const connect = await db.connect();
      const query = `SELECT * FROM branches WHERE id=$1;`;
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
  // change state of branch
  async changeName(id: string, name: string): Promise<Branch> {
    try {
      const connect = await db.connect();
      const query = `UPDATE branches SET name=$1 WHERE id=$2 returning *`;
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
  async remove(id: string): Promise<Branch> {
    try {
      const connect = await db.connect();
      const query = `DELETE FROM branches WHERE id=$1 returning *`;
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

export default branch;
