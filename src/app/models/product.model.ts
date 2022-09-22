import Product from "../types/product.type";
import db from "../database/Connect";
import insertRelation from "../traits/createRelation";
import filterQuery from "../traits/filterProduct";
import Feature from "../types/Feature.type";

class productsModel {
  //create new product
  async create(product: Product): Promise<Product[]> {
    try {
      const connect = await db.connect();
      const query = insertRelation(product);
      const result = await connect.query(query);
      //release connection
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not create product ${product.title} : ${(err as Error).message}`
      );
    }
  }
  //get product by id
  async getProduct(id: string): Promise<Product> {
    try {
      const connect = await db.connect();
      const query = `SELECT  
                        products.id, products.title, products.price, 
                        products.describtion, products.isonSale, products.salePrice, 
                        products.branch, products.images, products.countinstroke,
                        product_features.id, product_features.feature
                          FROM products
                          INNER JOIN product_features
                              ON products.id = product_features.product_id
                          WHERE
                            products.id = $1;`;
      const result = await connect.query(query, [id]);
      connect.release();

      const features: string[] = [];

      result.rows.forEach((data) => {
        features[features.length] = data.feature;
      });
      const product = {
        id: id as string,
        title: result.rows[0].title as string,
        price: result.rows[0].price as number,
        describtion: result.rows[0].describtion as string,
        isonsale: result.rows[0].isonsale as boolean,
        salePrice: result.rows[0].saleprice as number,
        branch: result.rows[0].branch as string,
        countinstroke: result.rows[0].countinstroke as number,
        images: result.rows[0].images as object,
        features: features as string[],
      };

      return product;
    } catch (err) {
      throw new Error(
        `Unable to get product ${id} : ${(err as Error).message}`
      );
    }
  }
  //get all products
  async getAllProducts(
    filter: string,
    branch: string,
    limit: number
  ): Promise<Product[]> {
    try {
      const q = filterQuery(filter, branch);
      const connect = await db.connect();
      const query = `SELECT  * FROM products${q}LIMIT $1;`;
      const result = await connect.query(query, [limit]);
      connect.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products : ${(err as Error).message}`);
    }
  }
  //edit product
  async editProduct(product: Product): Promise<Product> {
    try {
      const connect = await db.connect();
      const query = `UPDATE products SET 
              title = $1 , describtion = $2 , price = $3, isonSale = $4, salePrice = $5 , 
              branch = $6 , images = $7 , countinstroke = $8
              WHERE id=$9  returning *;`;
      const result = await connect.query(query, [
        product.title,
        product.describtion,
        product.price,
        product.isonsale,
        product.salePrice,
        product.branch,
        JSON.stringify(product.images),
        product.countinstroke,
        product.id,
      ]);
      //release connection
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create product ${product.title} : ${(err as Error).message}`
      );
    }
  }
  //remove product
  async remove(id: string): Promise<Product> {
    try {
      const connect = await db.connect();
      const query = `WITH product_features AS (
                DELETE from product_features WHERE product_id = $1 returning *
            )
            delete from products WHERE id=$1 returning *;`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not remove product ${id} : ${(err as Error).message}`
      );
    }
  }
  //get product features
  async getFeatures(id: string): Promise<Feature[]> {
    try {
      const connect = await db.connect();
      const query = `SELECT * FROM product_features WHERE product_id = $1;`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Unable to get product features ${id} : ${(err as Error).message}`
      );
    }
  }
  //add new feature
  async addFeature(feature: Feature): Promise<Feature> {
    try {
      const connect = await db.connect();
      const query = `INSERT INTO product_features (product_id, feature) values ($1, $2) returning *;`;
      const result = await connect.query(query, [
        feature.product_id,
        feature.feature,
      ]);
      //release connection
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to get add feature to product ${feature.id} : ${
          (err as Error).message
        }`
      );
    }
  }
  //remove feature
  async removeFeature(id: string): Promise<Feature> {
    try {
      const connect = await db.connect();
      const query = `DELETE from product_features WHERE id = $1 returning *;`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to get add feature to product ${id} : ${(err as Error).message}`
      );
    }
  }
  //edit feature
  async editFeature(feature: Feature): Promise<Feature> {
    try {
      const connect = await db.connect();
      const query = `UPDATE product_features SET feature = $1 WHERE id=$2  returning *;`;
      const result = await connect.query(query, [feature.feature, feature.id]);
      //release connection
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create product ${feature.id} : ${(err as Error).message}`
      );
    }
  }
  //search product
}

export default productsModel;
