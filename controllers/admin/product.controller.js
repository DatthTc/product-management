// tại sao file js không viết luôn vào controller là vì : Controller tập trung vào logic xử lý yêu cầu và trả về kết quả. nên không thích hợp xử lý logic phức tạp
const Product = require("../../models/product-model");
const systemConfix = require("../../config/system");

const filterStatusHelpers = require("../../helpers/filterStatus.helper");
const searchHelpers = require("../../helpers/searchProduct");
const paginationHelper = require("../../helpers/pagination.helper");

//[GET] /admin/products
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
    .sort({ position: "desc" }) // desc giảm dần
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
//[PATCH]] /admin/products/change-status/:status/:index
module.exports.changeStatus = async (req, res) => {
  //khi truy cập đến route changeStatus thì trong thằng req có biến params lưu trữ các data động
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Thay đổi trạng thái thành công");
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
      req.flash(
        "success",
        `Cập nhật trạng thái của ${ids.length} sản phẩm thành công`
      );
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Cập nhật trạng thái của ${ids.length} sản phẩm thành công`
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", `Đã xóa ${ids.length} sản phẩm thành công`);
      break;
    case "change-position":
      for (const item of ids) {
        console.log(item.split("-"));

        let [id, position] = item.split("-");
        position = parseInt(position);
        // console.log(id);
        // console.log(position);

        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash(
        "success",
        `Đã Đổi vị trí của ${ids.length} sản phẩm thành công`
      );
    default:
      break;
  }
  res.redirect("back");
};

//[DELETE]] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  //khi truy cập đến route changeStatus thì trong thằng req có biến params lưu trữ các data động
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );
  req.flash("success", `Đã Xóa Sản Phẩm có id là {- ${id} }`);
  res.redirect("back");
};
//[get]/admin/products/create  //phương thức đầu
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: "create product ",
  });
};
//[post]/admin/products/create
module.exports.createPost = async (req, res) => {
  //gán lại thôi vì khi gửi form từ client về server thì nó ở dạng string thì convert sang number
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  // position
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  // multer
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`; // file.filename thuộc tính của thằng multer và gán lại cho thằng thumbnail trong server
  }

  // đẩy create lên database
  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfix.prefixAdmin}/products`);
};
//[get]/admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id, // láy id trên params
    };

    const product = await Product.findOne(find);

    console.log(product);

    res.render("admin/pages/products/edit.pug", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
    });
  } catch (error) {
    req.flash("error", `{${req.params.id}} id Sản phẩm không tồn tại`);
    res.redirect(`${systemConfix.prefixAdmin}/products`);
  }
};
//[PATCH]/admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  // multer
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`; // file.filename thuộc tính của thằng multer và gán lại cho thằng thumbnail trong server
  }

  // đẩy create lên database
  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success", "Thay đổi chỉnh sửa sản phẩm thành công");
  } catch (error) {
    req.flash("error", "Chỉnh sửa Thất bại");
  }

  res.redirect("back");
};

//[get]/admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id, // láy id trên params
    };

    const product = await Product.findOne(find);

    console.log(product);

    res.render("admin/pages/products/detail.pug", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    req.flash("error", `{${req.params.id}} id Sản phẩm không tồn tại`);
    res.redirect(`${systemConfix.prefixAdmin}/products`);
  }
};
