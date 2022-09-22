import Product from "../types/product.type";

const insertRelation = (product: Product): string => {
  let result = `WITH products as (
      INSERT INTO products(title, describtion, price, isonSale, salePrice, branch, images, countinstroke)
      VALUES ('${product.title}', '${product.describtion}',
       '${product.price}', '${product.isonsale}', '${product.salePrice}', 
       '${product.branch}', '${JSON.stringify(product.images)}', '${
    product.countinstroke
  }') returning *)
      INSERT INTO product_features(product_id, feature) 
      VALUES  `;

  const returning = ` returning feature, (select id from products), (select title from products),
                    (select describtion from products), (select price from products),
                    (select branch from products), (select images from products), 
                    (select countinstroke from products);`;
  const features = product.features;

  for (let x = 0; x < features.length; x++) {
    let plus = "";
    if (x === features.length - 1) {
      plus = `((select products.id from products), '${features[x]}')`;
    } else {
      plus = `((select products.id from products),'${features[x]}'), `;
    }
    result = result + plus;
  }
  result = result + returning;
  return result;
};

export default insertRelation;
