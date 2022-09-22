import db from "../database/Connect";
import Image from "../types/image.type";

class imagesModel {
  async upload(content: string, size: number, type: string): Promise<Image> {
    try {
      const connect = await db.connect();
      const query = `INSERT INTO images (content, size, type) values ($1, $2, $3) returning id, size`;
      const result = await connect.query(query, [content, size, type]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to upload this file : ${(err as Error).message}`);
    }
  }

  async getImage(id: string): Promise<Image> {
    try {
      const connect = await db.connect();
      const query = `SELECT * FROM images WHERE id=$1`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get this file : ${(err as Error).message}`);
    }
  }

  async remove(id: string): Promise<Image> {
    try {
      const connect = await db.connect();
      const query = `DELETE FROM images WHERE id=$1 returning *`;
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

export default imagesModel;
