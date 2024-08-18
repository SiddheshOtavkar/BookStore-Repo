import fs from "fs";
import slugify from "slugify";
import bookModel from "../models/bookModel.js";
import semesterModel from "../models/semesterModel.js"

export const addBookController = async (req, res) => {
    try {
        const { name, description, price, semester, quantity, shipping, owner, upi } =
            req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !owner:
                return res.status(500).send({ error: "Owner Name is Required" });
            case !upi:
                return res.status(500).send({ error: "UPI ID is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !semester:
                return res.status(500).send({ error: "Semester is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is Required and should be less then 1mb" });
        }

        const books = new bookModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            books.photo.data = fs.readFileSync(photo.path);
            books.photo.contentType = photo.type;
        }
        await books.save();
        res.status(201).send({
            success: true,
            message: "Book Added Successfully",
            books,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in adding book",
        });
    }
};

//get all products
export const getBookController = async (req, res) => {
    try {
        const books = await bookModel
            .find({})
            .populate("semester")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            countTotal: books.length,
            message: "All Books",
            books,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting books",
            error: error.message,
        });
    }
};

// get single product
export const getSingleBookController = async (req, res) => {
    try {
        const book = await bookModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("semester");
        res.status(200).send({
            success: true,
            message: "Single Book Fetched",
            book,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getitng single book",
            error,
        });
    }
};


// get photo
export const bookPhotoController = async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.pid).select("photo");
        if (book.photo.data) {
            res.set("Content-type", book.photo.contentType);
            return res.status(200).send(book.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
};

//delete controller
export const deleteBookController = async (req, res) => {
    try {
        await bookModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Book Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting book",
            error,
        });
    }
};

//upate book
export const updateBookController = async (req, res) => {
    try {
        const { name, description, price, semester, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !semester:
                return res.status(500).send({ error: "Semester is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is Required and should be less then 1mb" });
        }

        const books = await bookModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            books.photo.data = fs.readFileSync(photo.path);
            books.photo.contentType = photo.type;
        }
        await books.save();
        res.status(201).send({
            success: true,
            message: "Book Updated Successfully",
            books,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte Book",
        });
    }
};

// filters
export const bookFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.semester = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const books = await bookModel.find(args);
        res.status(200).send({
            success: true,
            books,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While Filtering Books",
            error,
        });
    }
};

// book count
export const bookCountController = async (req, res) => {
    try {
        const total = await bookModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in book count",
            error,
            success: false,
        });
    }
};

// book list base on page
export const bookListController = async (req, res) => {
    try {
        const perPage = 3;
        const page = req.params.page ? req.params.page : 1;
        const books = await bookModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            books,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

// search book
export const searchBookController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await bookModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Book API",
            error,
        });
    }
};

// similar books
export const relatedBookController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const books = await bookModel
            .find({
                semester: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("semester");
        res.status(200).send({
            success: true,
            books,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related book",
            error,
        });
    }
};

// get book by catgory
export const bookCategoryController = async (req, res) => {
    try {
        const semester = await semesterModel.findOne({ slug: req.params.slug });
        const books = await bookModel.find({ semester }).populate("semester");
        res.status(200).send({
            success: true,
            semester,
            books,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error while getting books",
        });
    }
};