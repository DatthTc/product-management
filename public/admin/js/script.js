// button-status
const buttonStatus = document.querySelectorAll("[button-status]");
// new URL cần để dùng các hàm hỗ trợ như searchParam bên dưới
const url = new URL(window.location.href);

if (buttonStatus.length > 0) {
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      //getAttribute : để lấy giá trị của thuộc tính
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}

// end button-status
// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  const url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}
// End Form Search

//Pagination
const buttonPagination = document.querySelectorAll("[button-paginationHEHE]");

if (buttonPagination) {
  const url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-paginationHEHE");
      console.log(page);

      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}

//end Pagination
//CheckBox
const checkBoxMulti = document.querySelector("[checkbox-multi]");

if (checkBoxMulti) {
  const inputCheckAll = checkBoxMulti.querySelector("input[name='checkAll']");
  const inputCheckID = checkBoxMulti.querySelectorAll("input[name='checkId']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputCheckID.forEach((hehe) => {
        hehe.checked = true;
      });
    } else {
      inputCheckID.forEach((hehe) => {
        hehe.checked = false;
      });
    }
  });

  inputCheckID.forEach((hehe) => {
    hehe.addEventListener("click", () => {
      const countChecked = checkBoxMulti.querySelectorAll(
        "input[name='checkId']:checked"
      ).length;
      if (countChecked == inputCheckID.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

//end CheckBox

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkBoxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkBoxMulti.querySelectorAll(
      "input[name='checkId']:checked"
    );
    //delete all
    const typeChange = e.target.elements.type.value;

    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này?");

      if (!isConfirm) {
        return;
      }
    }
    // end delete all
    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIDS = document.querySelector("input[name='ids']");

      inputsChecked.forEach((hehe) => {
        const id = hehe.value;
        // thay đổi (change) vị trí (position)
        if (typeChange == "change-position") {
          const position = hehe
            .closest("tr")
            .querySelector("input[name='position']").value;

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id); //Thêm giá trị id vào cuối mảng ids. push chỉ dành cho mảng
        }
      });
      // thay đổi (change) vị trí (position)
      console.log(ids.join(", ")); //Nối các phần tử trong mảng ids lại với nhau bằng dấu phẩy, tạo thành một chuỗi.
      inputIDS.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("bạn phải Click vào Sản Phẩm muốn cập nhật Trạng Thái");
    }
  });
}
// end form-change-multi

// delete-products
const deleteProducts = document.querySelectorAll("[button-delete-id]");
if (deleteProducts.length > 0) {
  const formDeleteItem = document.querySelector("#form-change-id");
  const dataPath = formDeleteItem.getAttribute("data-path");
  deleteProducts.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("bạn có chắc muốn xóa sản phẩm này?");

      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${dataPath}/${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
// end delete-products

// update-deleted /storage
const UpdateDeleted = document.querySelectorAll("[button-update-deleted]");

if (UpdateDeleted.length > 0) {
  const formUpdateId = document.querySelector("#form-update-id");
  const path = formUpdateId.getAttribute("data-path");
  UpdateDeleted.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("bạn có chắc muốn update lại sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        // HTTP method: HTTP chỉ định một số phương thức tiêu chuẩn như:
        // --------------- GET, POST, PUT, DELETE, PATCH, v.v..
        const action = `${path}/${id}?_method=DELETE`;
        formUpdateId.action = action;
        formUpdateId.submit();
      }
      console.log(isConfirm);
    });
  });
}

// end update-deleted

// show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}

// end show alert
// uploadPreview

const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  // const closeButton = uploadImage.querySelector("[close-button]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });

  // if (closeButton) {
  //   closeButton.addEventListener("click", (hehe) => {
  //     console.log(hehe);

  //     if (hehe) {
  //       uploadImageInput.value = "";
  //       uploadImagePreview.src = "";
  //     }
  //   });
  // }
}
// end uploadPreview
