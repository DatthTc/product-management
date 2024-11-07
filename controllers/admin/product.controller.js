// tại sao file js không viết luôn vào controller là vì : Controller tập trung vào logic xử lý yêu cầu và trả về kết quả. nên không thích hợp xử lý logic phức tạp
const Product = require("../../models/product-model");
//[GET] /admin/products

const filterStatusHelpers = require("../../helpers/filterStatus.helper");
const searchHelpers = require("../../helpers/searchProduct");

module.exports.index = async (req, res) => {
  // là hàm filterStatus chứa một chức năng từ helpers được truyền từ filterStatusHelpers
  const filterStatus = filterStatusHelpers(req.query);

  let find = {
    deleted: false,
  };
  // gán status vào hàm find = cái status mà ng dùng nhập vào
  if (req.query.status) {
    find.status = req.query.status;
  }
  const objectSearh = searchHelpers(req.query);
  if (objectSearh.keyword) {
    find.title = objectSearh.regex;
  }

  const products = await Product.find(find);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh Sách Sản Phẩm ",
    //truyen` data ra ngoai giao dien
    products: products,
    // truyền mảng fillterStatus ra ngoài giao diện
    filterStatus: filterStatus,
    keyword: objectSearh.keyword,
  });
};
