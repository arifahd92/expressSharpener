const express = require("express")
const path = require("path")
const app = express()

const port = 3000
app.use(express.urlencoded())
//if you get undefined value think about above line
const adminRoute = require("./router/adminRoute")
const listRoute = require("./router/listRoute")
const contactRoute = require("./router/contectRoute")
app.use(express.static(path.join(__dirname, "public")))
// in node you cannot access a file directly  ab kahi pe v koi file(it may be js file css txt any file) access karenge to ho jayega basharte
// file public me honi chahiye aur path public se relative hona chahiye
app.use(adminRoute)
app.use(listRoute)
app.use(contactRoute)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "homePage.html"))
})
// when request will not go inside any middleware wil go inside this
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "error.html"))
})
app.listen(port, (err) => {
    if (err) {
        console.log(err.message)
    }
    console.log("listening at port " + port)
})