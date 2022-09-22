import config from "../config";
import Schema from "../schema/product.schema";
import Product from "../types/product.type";

class ProductMongo {
  async create(product: Product) {
    try {
      const productInfo = new Schema(product);
      const create = await productInfo.save();

      return create;
    } catch (err) {
      throw new Error(
        `unable to cache product info of ${product.id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async getProduct(id: string) {
    try {
      const product = await Schema.findOne({ id: id });

      return product;
    } catch (err) {
      throw new Error(
        `unable to get product info of ${id} : ${(err as Error).message}`
      );
    }
  }

  async getAllProducts(skip: number, filter: string) {
    try {
      let product;
      if (filter === "null") {
        product = await Schema.find({}).limit(config.perPage).skip(skip);
      } else {
        product = await Schema.find({
          "branch_info.id": filter,
        })
          .limit(config.perPage)
          .skip(skip);
      }
      return product;
    } catch (err) {
      throw new Error(
        `unable to get products info : ${(err as Error).message}`
      );
    }
  }

  async editProduct(product: Product) {
    try {
      const data = await Schema.updateOne(product).where({ id: product.id });

      return data;
    } catch (err) {
      throw new Error(
        `unable to update product info of ${product.id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async delete(
    id: string
  ): Promise<{ deletedCount: number; acknowledged: boolean }> {
    try {
      const user = await Schema.deleteOne({ id: id });
      return user;
    } catch (err) {
      throw new Error(
        `unable to delete cache product info of ${id} : ${
          (err as Error).message
        }`
      );
    }
  }
}

export default ProductMongo;
