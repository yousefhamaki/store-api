class Requests {
  createOrder: { [key: string]: string } = {
    products: "required|array",
    address: "required|string",
    city: "required|string",
    country: "required|string",
    postalCode: "required|string",
    phone: "required|number",
  };

  checkUuid: { [key: string]: string } = {
    id: "required|string|uuid",
  };

  updateState: { [key: string]: string } = {
    id: "required|string|uuid",
    state: "required|string",
  };
}

export default Requests;
