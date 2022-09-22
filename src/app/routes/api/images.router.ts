import { Router } from "express";
import multer from "multer";
import imagesController from "../../controller/images.controller";
import { isAdmin } from "../../middleware/Authorization.middleware";
import Query from "../../middleware/Query.middleware";
import Auth from "../../middleware/ValidateToken.middleware";
import Requests from "../../requests/image.Request";

const request = new Requests();
const controller = new imagesController();
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  Auth,
  isAdmin,
  upload.single("image"),
  controller.uploadImage
); // tested
router.get("/:id?", Query(request.get), controller.getImage);

export default router;
