// tại sao file js không viết luôn vào controller là vì : Controller tập trung vào logic xử lý yêu cầu và trả về kết quả. nên không thích hợp xử lý logic phức tạp
const Product = require("../../models/product-model");

const filterStatusHelpers = require("../../helpers/filterStatus.helper");
const searchHelpers = require("../../helpers/searchProduct");
const paginationHelper = require("../../helpers/pagination.helper");

//[GET] /admin/products
module.exports.cart = async (req, res) => {
  // là hàm filterStatus chứa một chức năng từ helpers được truyền từ filterStatusHelpers
  const filterStatus = filterStatusHelpers(req.query);

  let find = {
    deleted: true,
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

  const countProducts = await Product.countDocuments(find); // count product

  const objectPagination = paginationHelper(
    {
      // nhớ objectPagination là hàm tự định nghĩa
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    countProducts
  );

  // if (req.query.page) {
  //   objectPagination.currentPage = parseInt(req.query.page); // get currentPage
  // }
  // objectPagination.skip = // count product in database
  //   (objectPagination.currentPage - 1) * objectPagination.limitItem;

  // const countProducts = await Product.countDocuments(find); // count product
  // const totalPage = Math.ceil(countProducts / objectPagination.limitItem);
  // objectPagination.totalPage = totalPage;

  //end pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/storage/index.pug", {
    pageTitle: "Danh Sách Sản Phẩm ",
    products: products, //truyen` data ra ngoai giao dien
    filterStatus: filterStatus, // truyền mảng fillterStatus ra ngoài giao diện
    keyword: objectSearh.keyword,
    pagination: objectPagination,
  });
};
//[PATCH]] /admin/products/change-status/:status/:index
module.exports.changeStatus = async (req, res) => {
  //khi truy cập đến route changeStatus thì trong thằng req có biến params lưu trữ các data động
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect("back");
};
//[PATCH]] /admin/products/change-multi/
module.exports.changeMulti = async (req, res) => {
  //khi truy cập đến route changeStatus thì trong thằng req có biến params lưu trữ các data động
  // console.log(req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    default:
      break;
  }
  res.redirect("back");
};
module.exports.updateDeleted = async (req, res) => {
  //khi truy cập đến route changeStatus thì trong thằng req có biến params lưu trữ các data động

  const id = req.params.id;

  await Product.updateOne({ _id: id }, { deleted: false });
  req.flash("success", `Đã Cập Nhật Sản Phẩm có id là {- ${id} } từ storage`);
  res.redirect("back");
};
