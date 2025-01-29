import { Router } from "express";
import { 
    createCategory,
    showAllCategory,
    updateCategory,
    deleteCategory
    
} from "../controllers/category.controller.js";
const router = Router()



//routes
router.route("/upload_category").post(createCategory)
router.route("/:categoryId").patch(updateCategory).delete(deleteCategory)
router.route("/").get(showAllCategory)



export default router