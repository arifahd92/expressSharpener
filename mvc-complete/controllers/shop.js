const Product = require('../models/product');
const Cart = require("../models/cart")


//router.get('/products', shopController.getProducts);
/*
exports.getProducts = (req, res, next) => {

  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }
  );
};*/
//from data base
exports.getProducts = async (req, res, next) => {
  const promiseData = Product.fetchAll()//returning a promise
  const [products, info] = await promiseData
  // console.log(products)
  console.log("get product being exicuted")
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  });

}

exports.getDetail = async (req, res, next) => {
  const prodId = req.params.productId//productId is used as dynamic routing thats why here it is used (app.use("/products/:productId",getDetails))
  console.log({ prodId })// now i need "data" of this id so i will go inside model (data related things are handeled inthat like redux) and 
  // will implent logic inside class and then will call
  const promiseData = Product.findById(prodId)
  const [product, info] = await promiseData

  res.render('shop/product-detail', {
    product: product[0],
    pageTitle: 'All Products',
    path: '/products'
  })

  /*prodId, (product) => {
  console.log("get setail is being exicuted")

  console.log(product)
  res.render('shop/product-detail', {
    product: product[0],
    pageTitle: 'All Products',
    path: '/products'
  })
}*/


}
//router.get('/', shopController.getIndex);
exports.getIndex = (req, res, next) => {
  const promiseData = Product.fetchAll()
  promiseData.then((result) => {
    console.log(result[0])
    res.render('shop/index', {
      prods: result[0],
      pageTitle: 'Shop',
      path: '/'
    });
  })
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
