const path = require("path")
const contact = (req, res) => {
    console.log("contact")
    res.sendFile(path.join(__dirname, "..", "views", "contact.html"))
}
module.exports = { contact }