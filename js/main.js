const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// день первый
// открытие окна авторизации
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");

let login = localStorage.getItem("user");

function toogleModalAuth() {
  // убирает красную рамку после того как закрыть форму
  loginInput.style.borderColor = "";
  modalAuth.classList.toggle("is-open");
}

// когда пользователь авторизован

function authorized() {
  // выход
  function logOut() {
    login = null;
    // обнуление localStorage
    localStorage.removeItem("user");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);

    checkAucth();
  }

  console.log("Авторизован");

  // имя пользователя рядом с кнопкой выход
  userName.textContent = login;

  // когда пользователь авторизован кнопка войти убирается
  buttonAuth.style.display = "none";

  // кнопка выход
  userName.style.display = "inline";
  buttonOut.style.display = "block";
  buttonOut.addEventListener("click", logOut);
}

//когда пользователь не авторизован

function notAuthorized() {
  console.log("Не авторизован");

  function logIn(event) {
    event.preventDefault();

    // если не ввести логин

    if (loginInput.value.trim()) {
      // чтоб не приходилось заного логинится когда обновляем страницу
      localStorage.setItem("user", login);

      toogleModalAuth();
      buttonAuth.removeEventListener("click", toogleModalAuth);
      closeAuth.removeEventListener("click", toogleModalAuth);
      logInForm.removeEventListener("submit", logIn);
      // очищение поля логин
      logInForm.reset();
      checkAucth();
      // иначе граница будет красной
    } else {
      loginInput.style.borderColor = "red";
    }
  }

  buttonAuth.addEventListener("click", toogleModalAuth);
  closeAuth.addEventListener("click", toogleModalAuth);
  logInForm.addEventListener("submit", logIn);
}

function checkAucth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAucth();
