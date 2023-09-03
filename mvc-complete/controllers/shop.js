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
/*
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
*/
//**************************** */
//with sequelize
exports.getProducts = async (req, res, next) => {
  //Product.findAll().then((products) => {
  req.user.getProducts().then((products) => {//replaced with user specific products
    // console.log(products[0].dataValues)
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })

}


//router.get("/products/:productId", shopController.getDetail)

exports.getDetail = async (req, res, next) => {
  const prodId = req.params.productId//productId is used as dynamic routing thats why here it is used (app.use("/products/:productId",getDetails))
  console.log({ prodId })// now i need "data" of this id so i will go inside model (data related things are handeled inthat like redux) and 
  // will implent logic inside class and then will call
  const promiseData = Product.findByPk(prodId)
  const product = await promiseData

  res.render('shop/product-detail', {
    product: product,
    pageTitle: 'All Products',
    path: '/products'
  })

  // *******************this was throu fs 

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

//************************************* using sql only */

/*
exports.getIndex = (req, res, next) => {
  const promiseData = Product.findAll()
  promiseData.then((result) => {
    console.log(result)
    res.render('shop/index', {
      prods: result[0],
      pageTitle: 'Shop',
      path: '/'
    });
  })
};
*/
//******************************using sequalise */
/*
exports.getIndex = (req, res, next) => {
  const promiseData = Product.findAll()
  promiseData.then((result) => {
    // console.log(result)
    res.render('shop/index', {
      prods: result,
      pageTitle: 'Shop',
      path: '/'
    });
  })
}
*/
//relational sequelize
exports.getIndex = (req, res, next) => {
  const promiseData = req.user.getProducts()//only those products that belongs to this user (findAll method  get replacedby getProducts and 
  //create method replaced by createProduct  )
  promiseData.then((result) => {
    // console.log(result)
    res.render('shop/index', {
      prods: result,
      pageTitle: 'Shop',
      path: '/'
    });
  })
}







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
