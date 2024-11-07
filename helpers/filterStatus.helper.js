module.exports = (hehe) => {
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
  //hehe = req.query (product-controller)
  if (hehe.status) {
    const index = filterStatus.findIndex((item) => item.status == hehe.status);
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    filterStatus[index].class = "active";
  }

  return filterStatus;
};
