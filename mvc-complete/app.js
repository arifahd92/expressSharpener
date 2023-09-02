const path = require('path');
const cart = require("./models/cart")
const express = require('express');
const bodyParser = require('body-parser');

//const db = require("./connection/database")
const sequelize = require("./connection/databaseWithSequelize")
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/*
db.execute('SELECT * FROM products').then((result) => {
    //console.log(result)
    //result will be an array of two arrays firstone will be our data and second will be schema array 
    result[0].map((item) => {
        console.log(item.title)
    })
}).catch((err) => {
    console.log(err)
})
*/
//********************** */

sequelize.sync().then((result) => {//created schema in modal and sync with that
    //console.log(result)//CREATE TABLE IF NOT EXISTS `products` 
    app.listen(3000, (err) => {
        console.log("listening dynamic-routing at port 3000")

    });
}).catch((err) => {
    console.log(err)
})
