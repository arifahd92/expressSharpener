const fs = require('fs');
const path = require('path');


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);



module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch the previous cart;     
        fs.readFile(p, (err, fileContent) => {

            let cart = { products: [], totalPrice: 0 }//initially, dont declare outside read file other wise it may  not update
            if (!err) {
                try {
                    cart = JSON.parse(fileContent)//cart get updated with existing element
                } catch (err) {

                }
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)//found index of an item whose id is equal to arg id
            const existingProduct = cart.products[existingProductIndex]// extracted  item(an object)and if not present undefined
            console.log({ existingProduct })

            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct }//assigned  existingProduct to updatedProduct
                updatedProduct.qty = updatedProduct.qty + 1;
                // cart.products = [...cart.products];//it looks redundant
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err)
            })

        })
        //analyze the cart => find existing product
        //add new product/ increase quantity
    }




}