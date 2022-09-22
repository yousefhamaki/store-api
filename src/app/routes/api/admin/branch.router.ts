import { Router } from "express";
import mainController from "../../../controller/mainbranch.controller";
import Query from "../../../middleware/Query.middleware";
import Requests from "../../../requests/branchRequests";
import BranchController from "../../../controller/branch.controller";

const controller = new mainController();
const branch = new BranchController();
const requests = new Requests();
const router = Router();

//main branch
router.post("/main/create", Query(requests.create), controller.create); //tested
router.put(
  "/main/change/name",
  Query(requests.changeName),
  controller.changeName
); //tested
router.put(
  "/main/change/state",
  Query(requests.changeState),
  controller.changeState
); //tested
router.delete("/main/remove/:id", Query(requests.checkUuid), controller.delete); //tested

//branch
router.post("/create", Query(requests.createChild), branch.create); //tested
router.put("/change/state", Query(requests.changeState), branch.changeState); //tested
router.put("/change/name", Query(requests.changeName), branch.changeName); //tested
router.put(
  "/change/relation",
  Query(requests.changeRelation),
  branch.changeRelation
); //tested
router.delete("/remove/:id", Query(requests.checkUuid), branch.delete); //tested

export default router;
