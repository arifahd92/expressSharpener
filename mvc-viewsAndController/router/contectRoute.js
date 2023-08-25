const express = require("express")
const { contact } = require("../controller/contactController")
const router = express.Router()
router.get("/contact", contact)
module.exports = router