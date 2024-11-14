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

  if (req.query.status) {
    find.status = req.query.status; // gán status vào hàm find = cái status mà ng dùng nhập vào
  }

  //funtion in searh
  const objectSearh = searchHelpers(req.query);
  if (objectSearh.keyword) {
    find.title = objectSearh.regex;
  }
  //end searh

  //pagination : Phân Trang
  let objectPagination = {
    currentPage: 1,
    limitItem: 4,
  };
  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page); // get currentPage
  }
  objectPagination.skip = // count product in database
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  const countProducts = await Product.countDocuments(find); // count product
  const totalPage = Math.ceil(countProducts / objectPagination.limitItem);
  objectPagination.totalPage = totalPage;

  //end pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh Sách Sản Phẩm ",
    products: products, //truyen` data ra ngoai giao dien
    filterStatus: filterStatus, // truyền mảng fillterStatus ra ngoài giao diện
    keyword: objectSearh.keyword,
    pagination: objectPagination,
  });
};
