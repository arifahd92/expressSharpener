const path = require('path');
const cart = require("./models/cart")
const express = require('express');
const bodyParser = require('body-parser');

//const db = require("./connection/database")//when oure mysql used
const sequelize = require("./connection/databaseWithSequelize")

// importing Product and User modal to stablish a relation
const Product = require("./models/product")
const User = require("./models/user")

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//remember one thing jahan v modal imported hai jo bhi waha findByPk findAll create saare method use kar sakte hai
app.use((req, res, next) => {
    console.log("inside middleware")
    User.findByPk(1).then((user) => {
        req.user = user//req.user willl be available for all other middlewae and in routhandler 
        next()
    }).catch((err) => {
        console.log(err)
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//***************using pure mysql*********** */
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

//***********using sequelize*********** */

/*
sequelize.sync().then((result) => {//created schema in modal and sync with that
    //console.log(result)//CREATE TABLE IF NOT EXISTS `products` 
    app.listen(3000, (err) => {
        console.log("listening dynamic-routing at port 3000")

    });
}).catch((err) => {
    console.log(err)
})
*/
//**************************************************************************************************************************************** */


//*************using sequelize relation************ */


// import both modal in which you want to create relation

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })//second argument is configuration this relation teling that
// which user created which product, and onDelete here is used for deleting automatically related product from product table when user is deleted
//constraints:true means mapping using foreign key
//users id (pk) will be used as foreign key in product table, aur yahi use hao constraints true ka 
User.hasMany(Product)
/* this code would create methods and associations that allow you to easily retrieve and manipulate data related to this relationship. For 
example, you could use user.getProducts() to fetch all products associated with a particular user

****method are created using firstone, User.methods are from second relation , product.methods will be created by first one ex-
product.getUser() to retrieve the user associated with a product.
*/

sequelize
    // .sync({ force: true })
    .sync()
    .then((result) => {
        //console.log(result)
        return User.findByPk(1)
    }).then(user => {
        if (!user) {
            return User.create({ name: "arif", email: "arif@123" })//will return a promise 
        }
        return user//it will be wrapped inside a promise and it will look like .... resolve(user), default behaviour of js inside .then return
    }).then((user) => {
        //console.log(user)
        app.listen(3000, (err) => {
            console.log("listening at port 3000")
        })
    }).catch((err) => {
        console.log(err)
    })



