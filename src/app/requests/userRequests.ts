class Requests {
  createUser: { [key: string]: string } = {
    username: "required",
    firstname: "required",
    lastname: "required",
    email: "required",
    password: "required",
  };

  makeLogin: { [key: string]: string } = {
    email: "required",
    password: "required",
  };

  updateUserInfo: { [key: string]: string } = {
    email: "required",
    username: "required",
    firstname: "required",
    lastname: "required",
    id: "required|string|uuid",
  };

  changePass: { [key: string]: string } = {
    oldpass: "required",
    newpass: "required",
  };

  checkUuid: { [key: string]: string } = {
    id: "required|string|uuid",
  };
}

export default Requests;
