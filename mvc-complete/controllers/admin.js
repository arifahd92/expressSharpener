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
  const product = new Product(title, imageUrl, description, price);//created instance to call save method inside save method this will work as this object

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

exports.getEditProduct = (req, res, next) => {
  console.log("getEdit get called")
  // /admin/edit-product/123?edit=true&info=arif,//we will get string tye true and if not set edit=true then undefined
  const editMode = req.query.edit
  console.log(req.query)//{edit:"true",info:"arif"}, in case of above commented route, 123 is used for dynamic(that msay be any thing)
  console.log(req.params)//{ productId: '123' }, dynamic routing is set as productIt
  console.log({ editMode })
  if (!editMode) {
    res.redirect("/")
    return
  }
  Product.findByPk(req.params.productId, (product) => {
    console.log(product[0].price)
    res.render('admin/edit-product', {//form is same for both add and edit 
      pageTitle: 'edit Product',
      path: '/admin/add-product',
      editting: !!editMode,
      product: product[0]
    });
  })
};
//using sequelize
exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {

    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })

};
