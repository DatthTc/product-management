const Product = require("../../models/product-model");
//[GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);

  let filterStatus = [
    {
      name: "Tất Cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt Động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng Hoạt Động",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status == req.query.status
    );
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    filterStatus[index].class = "active";
  }

  // tại sao file js không viết luôn vào controller là vì : Controller tập trung vào logic xử lý yêu cầu và trả về kết quả. nên không thích hợp xử lý logic phức tạp
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const products = await Product.find(find);

  // console.log(products);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh Sách Sản Phẩm ",
    //truyen` data ra ngoai giao dien
    products: products,
    // truyền mảng fillterStatus ra ngoài giao diện
    filterStatus: filterStatus,
  });
};
