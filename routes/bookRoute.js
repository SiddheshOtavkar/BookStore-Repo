import express from "express";
import {
  addBookController,
  getBookController,
  getSingleBookController,
  bookPhotoController,
  deleteBookController,
  updateBookController,
  bookListController,
  bookCountController,
  bookFiltersController,
  searchBookController,
  relatedBookController,
  bookCategoryController
} from "../controllers/bookController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/add-book",
  requireSignIn,
  isAdmin,
  formidable(),
  addBookController
);

//update routes
router.put(
  "/update-book/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateBookController
);

//get books
router.get("/get-book", getBookController);

//single book
router.get("/get-book/:slug", getSingleBookController);

//get photo
router.get("/book-photo/:pid", bookPhotoController);

//delete product
router.delete("/delete-book/:pid", deleteBookController);

//filter book
router.post("/book-filters", bookFiltersController);

//book count
router.get("/book-count", bookCountController);

//book per page
router.get("/book-list/:page", bookListController);

//search product
router.get("/search/:keyword", searchBookController);

//similar product
router.get("/related-book/:pid/:cid", relatedBookController);

//category wise product
router.get("/book-semester/:slug", bookCategoryController);

export default router;