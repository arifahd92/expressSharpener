const express = require("express")
//const bodyParser = require("body-parser")
const app = express()
app.use(express.json())// fetch api
app.use(express.urlencoded())// when submitting data through form and method post
app.use("/", (req, res, next) => {
    console.log("i will always run im on top and every rout will include me  thats why")
    // res.send("<h1>welcome to express.js </h2>")
    next()
    // now next middleware whose path will be included in url will get exicuted if donot pass path then default is slash yaani every app.use will run

})
app.use("/add-product", (req, res) => {
    // it will be triggerd only for those which request will include this path rememmber not exactly match just include
    //in simple word agar req me add-product shamil hai tabhi chalega like add-productandthen any thyng chal jayega 
    res.send("<form action=/product method=POST> <input type=text name=title /> <input type=number name=price /> <button type= submit>add product</button></form>")
})
//NOTE ALWAYS USE SINGLE CODE NOT DOUBLE CODE TO SEND HTML 
app.use("/product", (req, res) => {
    console.log(req.body)
    const { title, price } = req.body
    console.log(title)
    console.log(price)
    console.log("came here")
    res.redirect("/")
})
app.use("/", (req, res) => {
    res.send("<h1>welcome to expressjs</h1>")
})
app.listen(3000, () => {
    console.log("listening at port 3000")
})