import { Router } from "express";
import { 
    createPhotoCategory,
  updatePhotoCategory,
  deletePhotoCategory,
  showAllPhotoCategory,
  showphotoShayariByCategory
    
} from "../controllers/photoCategory.controller.js";
const router = Router()



//routes
router.route("/upload_photo_category").post(createPhotoCategory)
router.route("/:photoCategoryId").patch(updatePhotoCategory).delete(deletePhotoCategory)
router.route("/").get(showAllPhotoCategory)
router.route("/:photoCategoryId/photo_shayari_By_Category").get(showphotoShayariByCategory)


export default router