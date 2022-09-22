type Product = {
  feature?: string;
  id?: string;
  title: string;
  describtion: string;
  images: string | object;
  isonsale: boolean;
  salePrice: number;
  features: string[];
  price: number;
  product_id?: string;
  branch: string;
  branch_info?: object;
  countinstroke: number;
};

export default Product;
