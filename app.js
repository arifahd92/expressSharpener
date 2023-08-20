console.log("app.js")
const port = 3000;
const http = require("http")

const express = require("express")
const app = express()
//app.use allowes us to add  middleware it is exicuted foe every incomming requests
app.use((req, res, next) => {
    console.log("inside first middlewarw")
    //untill you will not call next response will not travel to next middle ware
    //next()
})
app.use((req, res, next) => {
    // for every request it will run
    console.log("inside second middlewarw")
    res.send('<h1>hellow from express</h1>')
    // in express we donot have to set header like text/html automatically it will be se
})
console.log("withoutt next i also got called and exicuted at priority of callback of app.use and app.listen")
//const server = http.createServer(app)
app.listen(port, () => {
    console.log(`listening at port ${port}`)
})