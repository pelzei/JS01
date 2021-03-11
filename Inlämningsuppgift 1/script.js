"use strict";

const formA = document.querySelector("#formA");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const output = document.querySelector("#output");
let users = [];

const validateText = (id) => {
  const input = document.querySelector("#" + id);
  const error = input.nextElementSibling;

  if (input.value === "") {
    error.innerText = "Du måste ange ett namn";
    input.classList.add("is-invalid");
    return false;
  } else if (input.value.length < 2) {
    error.innerText = "Ditt namn måste bestå av minst två bokstäver";
    input.classList.add("is-invalid");
    return false;
  } else {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  }
};

const validateEmail = (id) => {
  const input = document.querySelector("#" + id);
  const error = input.nextElementSibling;
  let regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (regEx.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    error.innerText = "Ange en giltig e-postadress";
    input.classList.add("is-invalid");
    return false;
  }
};

const validate = () => {
  document.querySelectorAll("input").forEach((input) => {
    if (input.type === "text") {
      validateText(input.id);
      if (!validateText(input.id)) {
        return;
      }
    }
    if (input.type === "email") {
      validateEmail(input.id);
      if (!validateEmail(input.id)) {
        return;
      }
    }
  });
};

const resetForm = () => {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
    input.classList.remove("is-valid");
  });
};

function createUser(firstName, lastName, email) {
  let user = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email,
  };

  users.push(user);
  console.log(users);
}

const renderUsers = () => {
  output.innerHTML = "";
  users.forEach((user) => {
    let template = `
      <div class="user d-flex justify-content-between align-items-center mb-3">
        <div class="text mb-1">
          <h3>${user.firstName} ${user.lastName}</h3>
          <small>${user.email}</small>
        </div>
        <div class="button">
          <button class="btn btn-primary">Ändra</button>
          <button class="btn btn-danger">Radera</button>
        </div>
      </div>
      `;

    output.innerHTML += template;
  });
};

renderUsers();

formA.addEventListener("submit", (e) => {
  e.preventDefault();

  validate();
  //validateText("firstName");
  //validateText("lastName");
  //validateEmail("email");

  if (
    validateText("firstName") &&
    validateText("lastName") &&
    validateEmail("email")
  ) {
    createUser(firstName.value, lastName.value, email.value);
    renderUsers();
    resetForm();
  }
});
