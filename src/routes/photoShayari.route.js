import { Router } from "express";
import {
  createPhotoShayari,
  updatePhotoShayari,
  deletePhotoShayari,
  showAllPhotoShayari,


} from "../controllers/photoShayari.controller.js";
const router = Router()



//routes
router.route("/:photoCategoryId/upload_photo_shayari").post(createPhotoShayari)
router.route("/:photoShayariId").patch(updatePhotoShayari).delete(deletePhotoShayari)
router.route("/").get(showAllPhotoShayari)
// router.route("/:categoryId").get(shayariByCategory)


export default router