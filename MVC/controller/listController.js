const path = require("path")

const list = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "list.html"))
}
module.exports = { list }