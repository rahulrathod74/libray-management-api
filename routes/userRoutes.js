const express = require("express");
const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/", authenticate, authorize("Admin"), getUsers);
router.get("/:id", authenticate, authorize("Admin", "Member"), getUserById);
router.put("/:id", authenticate, authorize("Admin", "Member"), updateUser);
router.delete("/:id", authenticate, authorize("Admin"), deleteUser);
module.exports = router;