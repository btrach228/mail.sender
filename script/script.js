document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append("image", formImage.files[0]);

    if (error === 0) {
      form.classList.add("_sending");
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
      } else {
        alert("Error");
        form.classList.remove("_sending");
      }
    } else {
      alert("Type requare fields");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formRequare = document.querySelectorAll("._requare");

    for (let i = 0; i < formRequare.length; i++) {
      const input = formRequare[i];
      formRemoveError(input);
      if (input.classList.contains("_email")) {
        if (emailValue(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  //  Функция для теста имейла
  function emailValue(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,8})+$/.test(input.value);
  }

  //Получаем инпут файл в переменную
  const formImage = document.getElementById("formImage");
  //Получаем див для превью в переменную
  const filePreview = document.getElementById("file_preview");

  //Слушаем изминения в инпуте
  formImage.addEventListener("change", function () {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    //проверяем тип файла
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("You can upload only: JPEG , PNG , GIF");
      formImage.value = "";
      return;
    }
    //проверям размер файла
    if (file.size > 2 * 1024 * 1024) {
      alert("Max size is 2 mb");
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      filePreview.innerHTML = `<img src="${e.target.result}" alt="photo">`;
    };
    reader.onerror = function (e) {
      alert("Something wring , try again !");
    };

    reader.readAsDataURL(file);
  }
});
