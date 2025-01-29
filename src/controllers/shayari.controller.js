import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import Shayari from "../models/shayari.model.js"




// Ensure public/images exists

const createShayari = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { content } = req.body;

  if (!categoryId) {
    return res.
      status(401)
      .json(new ApiError(401, "category not found"))
  }

  if (!content) {
    return res.
      status(401)
      .json(new ApiError(401, "content are empty"))
  }

  const shayariexist = await Shayari.findOne({ where: { content } })

  if (shayariexist) {
    return res.
      status(401)
      .json(new ApiError(401, "shayari alredy exist"))
  }
  const shayri = await Shayari.create({
    content,
    category_id: categoryId
  });

  if (!shayri) {
    return res
      .status(400)
      .json(new ApiError(400, "shayari not added"));
  }
  return res.status(200)
    .json(new ApiResponse(200, shayri, "shayri add Successfully"));

})

const updateShayari = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { shayariId } = req.params;


  if (!shayariId) {
    return res.
      status(401)
      .json(new ApiError(401, "shayri not found"))
  }
  if (!content) {
    return res.
      status(401)
      .json(new ApiError(401, "content are empty! please write somethig else"))
  }

  const shayariexist = await Shayari.findOne({ where: { content } })

  if (shayariexist) {
    return res.
      status(401)
      .json(new ApiError(401, "shayari alredy exist"))
  }

  const updateShayari = await Shayari.findOne({ where: { id: shayariId } })


  updateShayari.content = content;

  await updateShayari.save();

  return res.status(200)
    .json(new ApiResponse(200, updateShayari, "Category updated Successfully"));

})

const deleteShayari = asyncHandler(async (req, res) => {

  const { shayariId } = req.params;

  if (!shayariId) {
    return res
      .status(401)
      .json(new ApiError(401, "shayari not found"))
  }
  const shayari = await Shayari.findOne({ where: { id: shayariId } })

  if (!shayari) {
    return res
      .status(401)
      .json(new ApiError(401, "shayari not found"))
  }

  const deleteShayari = await Shayari.destroy({
    where: { id: shayariId },
  });
  if (!deleteShayari) {
    return res
      .status(401)
      .json(new ApiError(401, "shayari not deleted"))
  }


  return res
    .status(200)
    .json(new ApiResponse(200, shayari, "shayari deleted Successfully"))


})


const showAllShayari = asyncHandler(async (req, res) => {

  const shayaries = await Shayari.findAll();
  // console.log(shayaries);


  if (!shayaries) {
    return res.
      status(401)
      .json(new ApiError(401, "shayaries not fetch"))
  }
  return res.status(200)
    .json(new ApiResponse(200, shayaries, "shayaries fetch Successfully"));
})

const shayariByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;


  if (!categoryId) {
    return res
      .status(401)
      .json(new ApiError(401, "category not found"))
  }
  const shayari = await Shayari.findAll(
    {
      where: {
        category_id: categoryId
      }
    })

  if (!shayari) {
    return res
      .status(401)
      .json(new ApiError(401, "shayari not found"))
  }




  return res
    .status(200)
    .json(new ApiResponse(200, shayari, "shayari fetch Successfully"))


})


export {
  createShayari,
  updateShayari,
  deleteShayari,
  showAllShayari,
  shayariByCategory
}