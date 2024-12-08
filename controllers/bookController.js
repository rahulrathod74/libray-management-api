const Book = require("../models/Book");
exports.createBook = async (req, res) => {
  try {
    const {
      title,
      ISBN,
      summary,
      publicationDate,
      genres,
      copiesAvailable,
      authorId,
    } = req.body;
    const newBook = await Book.create({
      title,
      ISBN,
      summary,
      publicationDate,
      genres,
      copiesAvailable,
      author: authorId,
    });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
