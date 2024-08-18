import semesterModel from "../models/semesterModel.js";
import slugify from "slugify";

// Add Semester
export const addSemesterController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }
        const existingSemester = await semesterModel.findOne({ name });
        if (existingSemester) {
            return res.status(200).send({
                success: true,
                message: "Semester Already added",
            });
        }
        const semester = await new semesterModel({
            name,
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success: true,
            message: "Semester Added",
            semester,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Semester",
        });
    }
};

//update category
export const updateSemesterController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const semester = await semesterModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            messsage: "Semester Updated Successfully",
            semester,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating semester",
        });
    }
};

// get all semester
export const allSemesterController = async (req, res) => {
    try {
        const semester = await semesterModel.find({});
        res.status(200).send({
            success: true,
            message: "All Semester List",
            semester,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all semesters",
        });
    }
};

// single category
export const singleSemesterController = async (req, res) => {
    try {
        const semester = await semesterModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get Single Semester SUccessfully",
            semester,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Semester",
        });
    }
};

//delete category
export const deleteSemesterController = async (req, res) => {
    try {
        const { id } = req.params;
        await semesterModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Semester Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting semester",
            error,
        });
    }
};