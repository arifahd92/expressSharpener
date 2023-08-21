const express = require("express")
//const fs = require("fs")
const app = express()
app.use(express.urlencoded())
app.use(express.json())
const messageRouter = require("./route/data")
const loginRouter = require("./route/login")



app.use(messageRouter)
app.use(loginRouter)

/*
//wrapped in data route
app.post("/postdata", (req, res) => {
    console.log(req.body)
    const data = req.body.username + " " + req.body.message + ""
    fs.appendFile('messages.txt', data, (err) => {
        if (err) {
            console.error(err);
        }
        res.redirect("/")
    })
})
app.get("/", (req, res) => {

    // res.send('<form action="/postdata" method="POST"> <input type="text" name="userAndMessage"> <button type="submit">send</button></form>')
    fs.readFile('messages.txt', (err, data) => {
        if (err) {
            console.log(err);
            data = "cannot find any chat"
        }
        res.send(`${data}<form action="/postdata" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
        <input type="text" id="message" name="message" placeholder="message">
        <input type="hidden" id="username" name="username">
        <button type="submit">SEND</button>
        </form>`);
    });

})
*/
app.listen(3000, () => {
    console.log("listening at port 3000")
})