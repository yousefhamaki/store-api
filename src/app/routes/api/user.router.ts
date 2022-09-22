import { Router } from "express";
import userController from "../../controller/user.controller";
import { isAdmin, selfData } from "../../middleware/Authorization.middleware";
import Query from "../../middleware/Query.middleware";
import Auth from "../../middleware/ValidateToken.middleware";
import Requests from "../../requests/userRequests";

const router = Router();
const controller = new userController();
const requests = new Requests();

router.get("/info/:id", Query(requests.checkUuid), controller.getUser); //tested
router.get("/search/email/:email", controller.searchEmail); //tested
router.get("/search/username/:username", controller.searchUserName); //tested
router.post("/create", Query(requests.createUser), controller.create); //tested
router.post("/login", Query(requests.makeLogin), controller.login); //tested
router.put(
  "/change/:id",
  Auth,
  selfData,
  Query(requests.changePass),
  controller.changePass
); //tested
router.put(
  "/change",
  Auth,
  selfData,
  Query(requests.updateUserInfo),
  controller.updateuserinfo
); //tested
router.delete(
  "/delete/:id",
  Query(requests.checkUuid),
  Auth,
  selfData,
  controller.deleteUser
); //tested

//admin routes
router.post(
  "/admin/adduser",
  Auth,
  isAdmin,
  Query(requests.createUser),
  controller.create
); //tested
router.delete(
  "/admin/delete/:id",
  Query(requests.checkUuid),
  Auth,
  isAdmin,
  controller.deleteUser
); //tested
router.get("/admin/getall", Auth, isAdmin, controller.getAll); //tested

export default router;
