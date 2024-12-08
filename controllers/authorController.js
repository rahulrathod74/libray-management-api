const Author = require("../models/Auth");
exports.createAuthor = async (req, res) => {
  try {
    const { name, biography, dateOfBirth, nationality } = req.body;
    const newAuthor = await Author.create({
      name,
      biography,
      dateOfBirth,
      nationality,
    });
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate("books");
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate("books");
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
