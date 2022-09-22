import { Router } from "express";
import userRouter from "./api/user.router";
import branchRouter from "./api/branch.router";
import productRouter from "./api/product.router";
import imagesRouter from "./api/images.router";
import orderRouter from "./api/order.router";
import Auth from "../middleware/ValidateToken.middleware";
const router = Router();

router.use("/user", userRouter);
router.use("/branch", branchRouter);
router.use("/product", productRouter);
router.use("/order", Auth, orderRouter);
router.use("/images", imagesRouter);

export default router;
