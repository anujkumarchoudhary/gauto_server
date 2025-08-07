const express = require("express")
const router = express.Router()

const { getAllService, createService } = require("../controllers/service.controller")

router.get("/getAll", getAllService)
router.post("/create", createService)


module.exports=router;
