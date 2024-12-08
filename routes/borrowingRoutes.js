const express = require("express");
const { borrowBook, getBorrowingHistory, returnBook } = require("../controllers/borrowingController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", authenticate, authorize("Member"), borrowBook);
router.get("/my", authenticate, authorize("Member"), getBorrowingHistory);
router.put("/:id/return", authenticate, authorize("Admin", "Member"), returnBook);
module.exports = router;