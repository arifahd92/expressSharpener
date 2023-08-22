
//adminRoute ki get post put patch method ki  saari second argument ko isme layenge 
// ex => app.post("/",(req, res)=>{

//})
//(req, res)=>{... isi ki baat kar rahe, this is second argument
const path = require("path")
const addproduct = (req, res) => {
    //res.send('<form action="/product" method="POST"> <input type="text" name="title" /> <input type="number" name="price" /> <button type= "submit">add product</button></form>')
    res.sendFile(path.join(__dirname, "..", "views", "product.html"))
    //directly we can not pass path of file, sendfile acceppts ony absolute path(starting without . ) and abs path looks from starting
    //path .join(__dirname) will point the folder in which it is being used now lift up (views is sibling not child) and then go in views
}
// this add product logic was written inside router's adminRoute file so to reduce that file i wrapped here inside i controller
// and same for print data

const printData = (req, res) => {
    console.log("got submitted")
    console.log(req.body)
    const { title, price } = req.body
    console.log(title)
    console.log(price)
    console.log("came here")
    res.redirect("/addproduct")
}
module.exports = { addproduct, printData }
// these both as an object will be exported, kisi bhi variable me require karo  and then variable.name of function se fxn extract
//example
//const adminController = require("../controller/adminController")
//router.get("/addproduct", adminController.addproduct)