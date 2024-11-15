const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const part = formChangeStatus.getAttribute("data-path");

  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const dataStatusCurrent = button.getAttribute("data-status");
      const dataIdCurrent = button.getAttribute("data-id");

      let statusChange = dataStatusCurrent == "active" ? "inactive" : "active";
      console.log(
        `${dataStatusCurrent}-----${dataIdCurrent}-----change---${statusChange}`
      );

      //form
      const action = part + `/${statusChange}/${dataIdCurrent}?_method=PATCH`;
      formChangeStatus.action = action;

      formChangeStatus.submit();
      //end form
    });
  });
}
