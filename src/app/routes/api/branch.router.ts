import { Router } from "express";
import mainController from "../../controller/mainbranch.controller";
import Auth from "../../middleware/ValidateToken.middleware";
import { isAdmin } from "../../middleware/Authorization.middleware";
import adminRoutes from "./admin/branch.router";

const controller = new mainController();
const router = Router();

/* start user routes */
router.get("/menu", controller.getMenu); // tested
/* end user routes */
/* start admin routes */
router.use("/admin", Auth, isAdmin, adminRoutes);
/* end admin routes */
export default router;
