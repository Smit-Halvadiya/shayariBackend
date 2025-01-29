import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import PhotoShayari from "../models/photoShayari.model.js"
import { UrlImage } from "../utils/ImageBase64toUrl.js";
import { deleteImage } from "../utils/deleteImage.js";





const createPhotoShayari = asyncHandler(async (req, res) => {
    const { photoCategoryId } = req.params;
    const { base64String } = req.body;

    if (!photoCategoryId) {
        return res.
            status(401)
            .json(new ApiError(401, "photo categoryId not found"))
    }

    if (!base64String) {
        return res.
            status(401)
            .json(new ApiError(401, "image field are empty"))
    }
    const image_url = UrlImage(req, base64String, "photo_shayaries")
    const photoShayariexist = await PhotoShayari.findOne({ where: { image_url, photo_category_id: photoCategoryId} })

    if (photoShayariexist) {
        return res.
            status(401)
            .json(new ApiError(401, "Photo Shayari alredy exist"))
    }
    const photoShayari = await PhotoShayari.create({
        image_url,
        photo_category_id: photoCategoryId
    });

    if (!photoShayari) {
        
        return res
            .status(400)
            .json(new ApiError(400, "Photo Shayari not added"));
    }
    return res.status(200)
        .json(new ApiResponse(200, photoShayari, "Photo Shayri add Successfully"));


})
const updatePhotoShayari = asyncHandler(async (req, res) => {
    const { base64String } = req.body
    const { photoShayariId } = req.params;


    if (!base64String) {
        return res.
            status(401)
            .json(new ApiError(401, "enter any value of image"))
    }
    let url_img;
    if (base64String) {
        url_img = UrlImage(req, base64String, "photo_shayaries")

    }

    const photoShayari = await PhotoShayari.findOne({ where: { id: photoShayariId } })

    if (!photoShayari) {
        return res
            .status(400)
            .json(new ApiError(401, "enter any value of image"))
    }
    
    await deleteImage(photoShayari, "photo_shayaries")


    photoShayari.image_url = url_img;


    await photoShayari.save();

   
    return res.status(200)
        .json(new ApiResponse(200, photoShayari, "Photo Shayari updated Successfully"));



})
const deletePhotoShayari = asyncHandler(async (req, res) => {
    const { photoShayariId } = req.params;

    //find photoShayari by id
    const photoShayari = await PhotoShayari.findOne({ where: { id: photoShayariId } })

    //check photoShayari have stored or not
    if (!photoShayari) {
        return res
            .status(401)
            .json(new ApiError(401, "Photo Shayari not found"))
    }

    //delete the image from folder
    deleteImage(photoShayari, "photo_shayaries")


    //delete Shayari from table in DB
    const deleteShayari = await PhotoShayari.destroy({
        where: { id: photoShayariId },
    });

    //check Shayari deleted or not
    if (!deleteShayari) {
        return res
            .status(401)
            .json(new ApiError(401, "Photo Shayari not deleted"))
    }

    return res
        .status(200)
        .json(new ApiResponse(200, photoShayari, "Photo Shayari deleted Successfully"))



})
const showAllPhotoShayari = asyncHandler(async (req, res) => {

    const photoShayaries = await PhotoShayari.findAll();

  if(!photoShayaries){
    return res.
      status(401)
      .json(new ApiError(401, "photo Shayaries not fetch"))
  }
  return res.status(200)
  .json(new ApiResponse(200, photoShayaries, "photo Shayaries fetch Successfully"));

})



export {
    createPhotoShayari,
    updatePhotoShayari,
    deletePhotoShayari,
    showAllPhotoShayari,

}