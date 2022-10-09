
const Book = require("../models/Book");
const path = require("path");
const APIFeatures = require('./../utils/ApIfeatures');


// Get all Book
exports.getAllBooks = async (req, res, next) => {
    try {debugger;
      const books = await Book.find();
      res.status(200).json({ data: books });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

// Get single Book
exports.getBook = async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.status(200).json({ data: book });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  


// Create a Book
exports.createBook = async (req, res, next) => {
    try {
      req.body.userId = req.userId
      const books = await Book.create(req.body);
      res.status(200).json({ data: books });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


// Update Book
exports.updateBook = async (req, res, next) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!book) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.status(200).json({ data: book });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// Delete Book
exports.deleteBook = async (req, res, next) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      console.log(book);
      if (!book) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.status(200).json({ data: {} });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// Upload Book Profile
exports.uploadImage = async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ message: "Resource not found" });
      }
      const image = req.files.image;
 
    // Validate Image
    const fileSize = image.size / 1000;
    const fileExt = image.name.split(".")[1];
    if (fileSize > 500) {
      return res
        .status(400)
        .json({ message: "file size must be lower than 500kb" });
    }

    if (!["jpg", "png"].includes(fileExt)) {
      return res
        .status(400)
        .json({ message: "file extension must be jpg or png" });
    }

    const fileName = `${req.params.id}${path.extname(image.name)}`;
    image.mv(`uploads/${fileName}`, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

// update Book profile field
      await Book.findByIdAndUpdate(req.params.id, { image: fileName });
      res.status(200).json({
        data: {
          file: `${req.protocol}://${req.get("host")}/${fileName}`,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

 //pagination
exports.getAllBooks = async (req, res,next) => {
  try {
    const features = new APIFeatures(Book.find(), req.query).paginate();
    const books = await features.query;
    res.status(200).json({
      status: 'success',
      results: books.length,
      data: {
        books
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

