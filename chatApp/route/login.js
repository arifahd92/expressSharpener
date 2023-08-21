const express = require("express")
const router = express.Router()
const app = express()
app.use(express.urlencoded())
app.use(express.json())
router.get("/login", (req, res, next) => {
    res.send
        ('<form onsubmit="localStorage.setItem(`username`,document.getElementById(`username`).value)" action="/form" method="POST"><input id="username" type="text" name="username"><br><button type="submit">Login</button></form>')
    //res.redirect("/")


})
router.post("/form", (req, res) => {
    const user = req.body.username
    console.log(user)

    res.redirect("/")
})
module.exports = router