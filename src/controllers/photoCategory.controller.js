import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { UrlImage } from "../utils/ImageBase64toUrl.js";
import PhotoCategory from "../models/PhotoCategory.model.js";
import { deleteImage } from "../utils/deleteImage.js";
import PhotoShayari  from "../models/photoShayari.model.js"





const createPhotoCategory = asyncHandler(async (req, res) => {

    const { title, base64String } = req.body;

    if (!title || !base64String) {
        return res.status(400).json(new ApiError(401, "Title and base64 string are required"));
    }

    const titleAlredyExist = await PhotoCategory.findOne({ where: { title } });

    if (titleAlredyExist) {
        return res.
            status(400)
            .json(new ApiError(400, "The title exists Already"))
    }
    //its a method
    const image_url = UrlImage(req, base64String, "photo_categories")


    const photoCategory = await PhotoCategory.create({
        title,
        image_url
    });

    if (!photoCategory) {
        fs.unlinkSync(image_url)
        return res.status(400).json(new ApiError(401, "All fields are required"));
    }

    return res.status(200)
        .json(new ApiResponse(200, photoCategory, "Category add Successfully"));


})


const updatePhotoCategory = asyncHandler(async (req, res) => {
    const { title, base64String } = req.body;
    const { photoCategoryId } = req.params;


    if (!title && !base64String) {
        return res.
            status(401)
            .json(new ApiError(401, "enter any value of title or image"))
    }
    let url_img;
    if (base64String) {
        url_img = UrlImage(req, base64String, "photo_categories")

    }

    const photoCategory = await PhotoCategory.findOne({ where: { id: photoCategoryId } })

    if (!photoCategory) {
        return res
            .status(400)
            .json(new ApiError(401, "enter any value of title or image"))
    }
    if (title.length > 0) {
        photoCategory.title = title;

    }
    await deleteImage(photoCategory, "photo_categories")


    photoCategory.image_url = url_img;


    await photoCategory.save();

    console.log(photoCategory);

    return res.status(200)
        .json(new ApiResponse(200, photoCategory, "Photo Category updated Successfully"));


})
const deletePhotoCategory = asyncHandler(async (req, res) => {
    const { photoCategoryId } = req.params;

    //find photoCategory by id
    const photoCategory = await PhotoCategory.findOne({ where: { id: photoCategoryId } })

    //check photoCategory have stored or not
    if (!photoCategory) {
        return res
            .status(401)
            .json(new ApiError(401, "Photo Category not found"))
    }

    //delete the image from folder
    deleteImage(photoCategory, "photo_categories")


    //delete Category from table in DB
    const deleteCategory = await PhotoCategory.destroy({
        where: { id: photoCategoryId },
    });

    //check Category deleted or not
    if (!deleteCategory) {
        return res
            .status(401)
            .json(new ApiError(401, "Photo Category not deleted"))
    }

    return res
        .status(200)
        .json(new ApiResponse(200, photoCategory, "Photo Category deleted Successfully"))


})


const showAllPhotoCategory = asyncHandler(async (req, res) => {
    const photoCategories = await PhotoCategory.findAll();
  console.log(photoCategories);
  
  
  if(!photoCategories){
    return res.
      status(401)
      .json(new ApiError(401, "photo categories not fetch"))
  }
  return res.status(200)
  .json(new ApiResponse(200, photoCategories, "photo Category fetch Successfully"));

})

const showphotoShayariByCategory = asyncHandler(async (req, res) => {
    const { photoCategoryId } = req.params;


    if (!photoCategoryId) {
        return res.
            status(401)
            .json(new ApiError(401, "Category not found"))
    }
    

    const photoShayariByCategory = await PhotoShayari.findAll({ where: { photo_category_id: photoCategoryId } })

    if (!photoShayariByCategory) {
        return res
            .status(400)
            .json(new ApiError(401, "Shayari not found"))
    }

    return res.status(200)
        .json(new ApiResponse(200, photoShayariByCategory, "Photo Shayri By Categories fetch Successfully"));


    
})


export {
    createPhotoCategory,
    updatePhotoCategory,
    deletePhotoCategory,
    showAllPhotoCategory,
    showphotoShayariByCategory
}