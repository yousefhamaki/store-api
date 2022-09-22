import User from "../types/user.type";
import { Request } from "express";

interface ARequest extends Request {
  user?: User;
}

export default ARequest;
