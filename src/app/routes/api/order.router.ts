import { Router } from "express";
import orderController from "../../controller/order.controller";
import Requests from "../../requests/orderRequest";
import Query from "../../middleware/Query.middleware";
import { isAdmin, selfData } from "../../middleware/Authorization.middleware";

const router = Router();
const controller = new orderController();
const requests = new Requests();

router.post("/add", Query(requests.createOrder), controller.create); //tested
router.get(
  "/user/:id",
  Query(requests.checkUuid),
  selfData,
  controller.getUserOrders
); //tested
router.get(
  "/user/:id/completed",
  Query(requests.checkUuid),
  selfData,
  controller.getCompletedOrders
); //tested
router.get("/admin/active", isAdmin, controller.getActiveOrders); //tested
router.put(
  "/admin/update/state",
  isAdmin,
  Query(requests.updateState),
  controller.getActiveOrders
); //tested
router.get("/:id", Query(requests.checkUuid), controller.getOrder); //tested
router.delete("/remove/:id", Query(requests.checkUuid), controller.delete); //tested

export default router;
