const express = require("express");
const router = express.Router();
const { getAll, createCar, updateCar, createInBulk, deleteCar, getAllMakeWise, getAllModelWise, getAllBrandWise, deleteAllCar } = require('../controllers/car.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.get("/getAll", getAll);
router.get("/getAll/make/:make", authMiddleware, authorizeRoles("admin"), getAllMakeWise);
router.get("/getAll/model/:model", authMiddleware, getAllModelWise);
router.get("/getAll/brand/:brand", authMiddleware, getAllBrandWise);
router.post("/create", authMiddleware, authorizeRoles("user"), createCar);
router.put("/update/:id", authMiddleware, authorizeRoles("admin"), updateCar);
router.post("/createInBulk", authMiddleware, createInBulk);
// router.delete("/delete/:id", authMiddleware, deleteCar);
router.delete("/delete/deleteAll", authMiddleware, deleteAllCar);


module.exports = router

