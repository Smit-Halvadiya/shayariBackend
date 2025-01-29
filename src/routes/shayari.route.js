import { Router } from "express";
import {
    createShayari,
    updateShayari,
    deleteShayari,
    showAllShayari,
    shayariByCategory


} from "../controllers/shayari.controller.js";
const router = Router()



//routes
router.route("/:categoryId/upload_shayari").post(createShayari)
router.route("/:shayariId").patch(updateShayari).delete(deleteShayari)
router.route("/").get(showAllShayari)
router.route("/:categoryId").get(shayariByCategory)


export default router