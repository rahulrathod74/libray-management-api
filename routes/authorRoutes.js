const express = require("express");
const { createAuthor, getAllAuthors, getAuthorById } = require("../controllers/authorController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", authenticate, authorize("Admin"), createAuthor);
router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
module.exports = router;