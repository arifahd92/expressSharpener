const express = require("express")
const router = express.Router()
const adminController = require("../controller/adminController")
router.get("/addproduct", adminController.addproduct)

router.post("/product", adminController.printData)
module.exports = router
//when ever it will be used in any file this whole file will be exicuted 
//************* always export route and require and use in app.js with app.use */