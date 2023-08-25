
//data management of controllers product will be done here with help of class 
const path = require('path');

const p = path.dirname(process.mainModule.filename);//app.js level pe aaye isase
const q = path.join(p, "data", "messages.json")//data folder k andar message.txt ko refer kiye(q is refering to that)
//const q = path.join("data", "messages.txt")// ye v same hi kaam kar raha as above line code
const fs = require("fs")

//const products = [];//isko eleminate kar rahe json file se
// imp in class this is refers an object which have only property as key not methods
module.exports = class Product {
    constructor(t) {
        this.title = t;
    }
    //inside this class "this" will be {title:t} 
    save() {
        // products.push(this);
        const data = JSON.stringify(this)
        let products = []
        fs.readFile(q, "utf8", (err, data) => {
            if (!err) {
                products = JSON.parse(data)
            }
            products.push(this)

            fs.writeFile(q, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })

        // console.log(data)

    }


    static fetchAll(callback) {
        fs.readFile(q, "utf8", (err, data) => {
            if (err) {
                console.log(err.message);
                callback([]);
            } else {
                try {
                    console.log({ data })
                    const productFromFile = JSON.parse(data);
                    console.log(productFromFile)
                    callback(productFromFile);
                } catch (parseError) {
                    console.log("Error parsing JSON:", parseError);
                    callback([]);
                }
            }
        });
    }
}