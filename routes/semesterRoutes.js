import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    addSemesterController,
    updateSemesterController,
    allSemesterController,
    singleSemesterController,
    deleteSemesterController
} from "../controllers/semesterController.js";

const router = express.Router();

//routes

//add semester
router.post("/add-semester", requireSignIn, isAdmin, addSemesterController);

//update semester
router.put(
    "/update-semester/:id",
    requireSignIn,
    isAdmin,
    updateSemesterController
);

//getAll semester
router.get("/get-semester", allSemesterController);

//single category
router.get("/single-semester/:slug", singleSemesterController);

//delete category
router.delete(
    "/delete-semester/:id",
    requireSignIn,
    isAdmin,
    deleteSemesterController
);

export default router;
