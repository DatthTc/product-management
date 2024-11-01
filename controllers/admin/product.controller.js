const Product = require("../../models/product-model");
//[GET] /admin/products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false,
  });
  console.log(products);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh Sách Sản Phẩm ",
    //truyen` data ra ngoai giao dien
    products: products,
  });
};
