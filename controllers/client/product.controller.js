const Product = require("../../models/product-model");

module.exports.product = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "asc" });
  const newProduct = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  console.log(newProduct);

  res.render("client/pages/products/index.pug", {
    pageTitle: "Danh Sách sản Phẩm",
    products: products,
  });
};
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slug, // láy id trên params
      status: "active",
    };

    const product = await Product.findOne(find);

    console.log(product);

    res.render("client/pages/products/detail.pug", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    req.flash("error", `{${req.params.id}} id Sản phẩm không tồn tại`);
    res.redirect(`/products`);
  }
};
