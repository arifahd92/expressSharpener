const express = require("express")
const { list } = require("../controller/listController")
const router = express.Router()
router.get("/list", list)
module.exports = router