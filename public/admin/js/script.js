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
