type User = {
  id?: string;
  db_id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  token?: string;
  rank: string;
};

export default User;
