const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {//form is same for both add and edit 
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editting: false

  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //const product = new Product(title, imageUrl, description, price);//created instance to call save method inside save method this will work 
  //as this object

  /*
    product.save().then((result) => {
      console.log(result)
      res.redirect('/');
    }).catch((err) => {
      console.log(err)
    });
    */
  // ******************sequelise*******************
  //  Product.create({
  req.user.createProduct({//relational, kis user ne product create kiya
    title, price, imageUrl, description
  }).then(() => {
    res.redirect('/');
  }).catch((err) => console.log(err))
};



//using sequelize
exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {//getting all product not user specific

    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })

};

exports.getEditProduct = (req, res, next) => {
  // *******************/admin/edit-product/2?edit=true&info=arif,//we will get string type true and if not set edit=true then undefined
  console.log("getEditProduct get called")
  const editMode = req.query.edit
  console.log(req.query)//{edit:"true",info:"arif"}, in case of above commented route, 123 is used for dynamic(that msay be any thing)
  console.log(req.params)//{ productId: '123' }, dynamic routing is set as productIt
  console.log({ editMode })
  if (!editMode) {
    res.redirect("/")
    return
  }
  // Product.findByPk(req.params.productId).then((product) => {
  req.user.getProducts({ where: { id: req.params.productId } }).then((product) => {
    console.log(product)
    res.render('admin/edit-product', {//form is same for both add and edit 
      pageTitle: '',
      path: '/admin/add-product',
      editting: !!editMode,
      product: product[0]
    });
  })


};

/*
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  )

  updatedProduct.save();
  res.redirect('/admin/products')
}

*/

// *****************sequelize*****************
exports.postEditProduct = (req, res, next) => {
  console.log("post edit product get called**************")
  const prodId = req.params.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId).then((product) => {

    product.title = updatedTitle,
      product.price = updatedPrice,
      product.imageUrl = updatedImageUrl,
      product.description = updatedDesc
  })


  res.redirect('/admin/products')
}
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteProductById(prodId);
  res.redirect('/admin/products');
};










