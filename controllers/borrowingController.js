const Book = require("../models/Book");
const Borrowing = require("../models/BorrowingTransaction");
// Borrow a Book (Member only)
const borrowBook = async (req, res) => {
  const { bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book || book.copiesAvailable <= 0) {
      return res.status(400).json({ message: "Book not available for borrowing" });
    }
    const transaction = await Borrowing.create({
      book: bookId,
      member: req.user.id,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Due in 14 days
    });
    book.copiesAvailable -= 1;
    await book.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Return a Book
const returnBook = async (req, res) => {
  try {
    const transaction = await Borrowing.findById(req.params.id).populate("book");
    if (!transaction || transaction.status !== "Borrowed") {
      return res.status(400).json({ message: "Invalid transaction or book already returned" });
    }
    transaction.returnDate = new Date();
    transaction.status = "Returned";
    await transaction.save();
    const book = await Book.findById(transaction.book._id);
    book.copiesAvailable += 1;
    await book.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get All Borrowing Transactions (Admin only)
const getBorrowings = async (req, res) => {
  try {
    const transactions = await Borrowing.find()
      .populate("book")
      .populate("member", "name email");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Borrowing History (Member only)
const getMyBorrowings = async (req, res) => {
  try {
    const transactions = await Borrowing.find({ member: req.user.id }).populate("book");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  borrowBook,
  returnBook,
  getBorrowings,
  getMyBorrowings,
};





















