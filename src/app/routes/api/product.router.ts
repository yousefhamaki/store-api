import { Router } from "express";
import ProductController from "../../controller/product.controller";
import { isAdmin } from "../../middleware/Authorization.middleware";
import Auth from "../../middleware/ValidateToken.middleware";
import Query from "../../middleware/Query.middleware";
import Requests from "../../requests/productRequest";
import adminRoutes from "./admin/product.router";
import orderController from "../../controller/order.controller";

const router = Router();
const requests = new Requests();
const controller = new ProductController();
const order = new orderController();

router.post("/getall", Query(requests.getProducts), controller.getAllProducts); //tested
router.get("/mostselled", order.mostselled); //tested
router.get("/:id", Query(requests.checkUuid), controller.getProduct); //tested
router.get("/:id/features", Query(requests.checkUuid), controller.getFeatures); //tested
/* start admin routes */
router.use("/admin", Auth, isAdmin, adminRoutes);
/* end admin routes */
export default router;
