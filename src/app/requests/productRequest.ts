class productRequests {
  create: { [key: string]: string } = {
    title: "required",
    describtion: "required",
    price: "required|number",
    salePrice: "required|number",
    isonsale: "required",
    branch: "required|string",
    images: "required|object",
    countinstroke: "required|number",
    features: "required|array",
  };

  editProduct: { [key: string]: string } = {
    id: "required|string|uuid",
    title: "required",
    describtion: "required",
    price: "required|number",
    salePrice: "required|number",
    isonsale: "required",
    branch: "required|string",
    images: "required|object",
    countinstroke: "required|number",
    features: "required|array",
  };

  getProducts: { [key: string]: string } = {
    filter: "required",
    branch: "required",
    limit: "required",
  };

  addFeature: { [key: string]: string } = {
    product_id: "required|string|uuid",
    feature: "required",
  };

  editFeature: { [key: string]: string } = {
    product_id: "required|string|uuid",
    id: "required|string|uuid",
    feature: "required",
  };

  checkUuid: { [key: string]: string } = {
    id: "required|string|uuid",
  };
}

export default productRequests;
