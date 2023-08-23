
//data management of controllers product will be done here
//const fs = require("fs")
const express = require("expree")
const products = [];

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        products.push(this);
        // fs.appendFile("product", this)
    }

    static fetchAll() {
        return products;
    }
}