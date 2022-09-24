const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  uploadImage,

} = require("../controllers/books");

router.route("/").get(auth,getAllBooks).post(auth,createBook);
router.route("/:id").get(auth,getBook).put(auth,updateBook).delete(auth,deleteBook);
router.route("/:id").post(auth,uploadImage);


module.exports = router;
