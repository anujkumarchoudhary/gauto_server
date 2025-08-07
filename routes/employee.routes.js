const express = require("express");
const router = express.Router();
const { getAll, createEmployee, updateEmployee, deleteEmployee, getSingleEmployee, deleteAllEmployee, getAllBetween } = require("../controllers/employee.controller");

router.get("/getAll", getAll);
router.get("/getAllBetween", getAllBetween);
router.get("/getSingleEmployee/:id", getSingleEmployee);
router.post("/create", createEmployee);
router.patch("/update/:id", updateEmployee);
router.delete("/delete/deleteAll", deleteAllEmployee);
router.delete("/delete/:id", deleteEmployee);

module.exports = router