const express = require("express");
const { createBook, getBooks, getBookById } = require("../controllers/bookController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", authenticate, authorize("Admin"), createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
module.exports = router;