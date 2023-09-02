

//inside modal we declare a class with its properties and methods
//in case of sequelize we just have to create class and schema methods are inbuilt

/*
const fs = require('fs');
const path = require('path');

const db = require("../connection/database")
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);
// a function to read file, when it will be called it will be called with a callback and that call back will be called fron here
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {//file donot exist
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
// **********************a class to handle data ***********************
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    // this.id = Math.random().toString()//fs module me required not in sql
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;

  }
  /*
  save() {//it is not static so it will be called via instance object of class only 
    getProductsFromFile(products => {
      products.push(this);//save wil refer to the object that instance will call this
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }
  */

//save method for for sql
/*
save() {
  console.log(this)
  return db.execute('insert into products (title,price,description,imageUrl) values(?,?,?,?)',
    [this.title, this.price, this.description, this.imageUrl])
}
*/

/*
  static fetchAll(cb) {
    console.log("i m being exicuted")
    getProductsFromFile(cb);
  }
*/
//using mysql
/*
static fetchAll() {
  return db.execute('SELECT * FROM products')
}
*/
/*
static findById(productId, cb) {
  getProductsFromFile((products) => {
    const specific = products.filter((item) => item.id == productId)
    //console.log(specific)
    console.log("inside model")

    cb(specific)
  })
}
*/
//using mysql
/*
static findById(prodId) {

  console.log("find by id method called")
  return db.execute(`select * from products where id=${prodId}`)//returning a promise that contains data 

}
};
*/



//****************************8 */ going tto use Sequlize****************************************


//define schema
const Sequelize = require("sequelize")//class will be  returned by this,it will be used here for type 

const sequelize = require("../connection/databaseWithSequelize")

const Product = sequelize.define('product', {//product is table name it will be pluaralised
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }, description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
module.exports = Product