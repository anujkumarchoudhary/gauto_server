const express = require("express");
const router = express.Router();
const { register, login, getAll, deleteUser, loginUser, registerUser, deleteAllUser } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getAll", getAll);
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.delete("/:id", deleteUser);
router.delete("/deleteAll", authMiddleware, deleteAllUser);


module.exports = router;
