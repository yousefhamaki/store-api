class Requests {
  create: { [key: string]: string } = {
    name: "required",
    status: "required",
  };
  createChild: { [key: string]: string } = {
    name: "required",
    status: "required",
    main: "required",
  };
  changeRelation: { [key: string]: string } = {
    id: "required|string|uuid",
    main_id: "required",
  };
  changeName: { [key: string]: string } = {
    name: "required|string",
    id: "required|string|uuid",
  };
  changeState: { [key: string]: string } = {
    status: "required",
    id: "required|string|uuid",
  };

  checkUuid: { [key: string]: string } = {
    id: "required|string|uuid",
  };
}

export default Requests;
