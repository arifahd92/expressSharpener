const Product = require('../models/product');
const Cart = require("../models/cart")
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};


exports.getDetail = (req, res, next) => {
  const prodId = req.params.productId//productId is used as dynamic routing thats why here it is used (app.use("/products/:productId",getDetails))
  console.log({ prodId })// now i need "data" of this id so i will go inside model (data related things are handeled inthat like redux) and 
  // will implent logic inside class and then will call
  Product.findById(prodId, (product) => {
    console.log("product inside controller")
    console.log(product)
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: 'All Products',
      path: '/products'
    })
  })

}
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, +product[0].price)
    //console.log(product[0].price)
  })
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
