import { Router } from "express";
import ProductController from "../../../controller/product.controller";
import Query from "../../../middleware/Query.middleware";
import Requests from "../../../requests/productRequest";

const requests = new Requests();
const controller = new ProductController();
const router = Router();

router.post("/create", Query(requests.create), controller.create); //tested
router.put(
  "/edit/product",
  Query(requests.editProduct),
  controller.editProduct
); //tested
router.put(
  "/edit/feature",
  Query(requests.editFeature),
  controller.editFeature
); //tested
router.put("/add/feature", Query(requests.addFeature), controller.addFeature); //tested

router.delete("/remove/:id", Query(requests.checkUuid), controller.delete); //tested
router.delete(
  "/feature/remove/:id",
  Query(requests.checkUuid),
  controller.delete
); //tested

export default router;
