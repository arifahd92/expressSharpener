const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);
// a function to read file, when it will be called it will be called with a callback and that call back will be called fron here
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
// a class to handle data 
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.id = Math.random().toString()
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;

  }
  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    console.log("i m being exicuted")
    getProductsFromFile(cb);
  }

  static fetchById(productId, cb) {
    getProductsFromFile((products) => {
      const specific = products.filter((item) => item.id == productId)
      //console.log(specific)
      console.log("inside model")

      cb(specific)
    })
  }
};
