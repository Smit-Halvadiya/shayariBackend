import { asyncHandler } from "../utils/asyncHandler.js";
import Category from "../models/category.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { UrlImage } from "../utils/ImageBase64toUrl.js";
import fs from "fs"
import { deleteImage } from "../utils/deleteImage.js";

//hello for github test





// Ensure public/images exists

const createCategory = asyncHandler(async (req, res) => {

  //get title and base64 
  //check validate - empty or not 
  //check to validate title olso available 
  //convert base64 to url
  //check url also available or not  //optional
  //store in database

  const { title, base64String } = req.body;

  if (!title || !base64String) {
    return res.status(400).json({ message: 'Title and base64 string are required' });
  }

  const titleAlredyExist = await Category.findOne({ where: { title } });
  if (titleAlredyExist) {
    return res.
      status(400)
      .json(new ApiError(400, "The title exists Already"))
  }
    //its a method
    const image_url = UrlImage(req, base64String, "categories")


    const category = await Category.create({
      title,
      image_url
    });

    if (!category) {
      fs.unlinkSync(image_url)
      return res.status(400).json({ message: 'All fields are required' });
    }

    return res.status(200)
      .json(new ApiResponse(200, category, "Category add Successfully"));
  
})


//in pending
const updateCategory = asyncHandler(async (req, res) => {
  const {title, base64String } = req.body;
  const {categoryId} = req.params;


  if(!title && !base64String){
    return res.
      status(401)
      .json(new ApiError(401, "enter any value of title or image"))
  }
  let url_img;
  if(base64String){
    url_img = UrlImage(req, base64String, "category")
    
  }

  const category = await Category.findOne({where: {id: categoryId}})

  if(!category){
    return res
    .status(400)
    .json( new ApiError( 401, "enter any value of title or image"))
  }
  if(title.length > 0){
    updateCategory.title = title;
    
  }
  await deleteImage(category, "category")  
  
  
  category.image_url = url_img;
 

  await category.save();

console.log(category);

  return res.status(200)
      .json(new ApiResponse(200, category, "Category updated Successfully"));

})

const deleteCategory = asyncHandler(async (req, res) => {
  const {categoryId} = req.params;
  
  const category = await Category.findOne({ where: { id: categoryId } })
 
  if(!category){
    return res
    .status(401)
    .json( new ApiError(401, "category not found"))
  }

  const deletedImage = deleteImage(category, "category")
  console.log("deletedImages: ",deletedImage);
  
  const deleteCategory = await Category.destroy({
    where: { id: categoryId },
  });
  if(!deleteCategory) {
    return res
    .status(401)
    .json( new ApiError(401, "category not deleted"))
  }
  console.log(deleteCategory);
  
  return res
  .status(200)
  .json(new ApiResponse(200, category, "Category deleted Successfully"))

})


const showAllCategory = asyncHandler(async (req, res) => {
  
  const categories = await Category.findAll();
  console.log(categories);
  
  
  if(!categories){
    return res.
      status(401)
      .json(new ApiError(401, "categories not fetch"))
  }
  return res.status(200)
  .json(new ApiResponse(200, categories, "Category fetch Successfully"));
})

export {
  createCategory,
  updateCategory,
  deleteCategory,
  showAllCategory
}