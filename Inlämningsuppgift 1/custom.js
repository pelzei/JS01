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
  //------------------ RegExp for e-mail format
  let regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  //----------------- Specific RegExp for å, ä, ö after automatic conversion in form
  let regExSwedishAA = /xn--4ca/;
  let regExSwedishAE = /xn--5ca/;
  let regExSwedishOE = /xn--nda/;

  if (input.value.trim() === "") {
    error.innerText = "Du måste ange en e-postadress";
  } else if (!regEx.test(input.value)) {
    error.innerText("Ange en korrekt e-postadress");
    return false;
  } else if (
    regExSwedishAA.test(input.value) ||
    regExSwedishAE.test(input.value) ||
    regExSwedishOE.test(input.value)
  ) {
    error.innerText = "E-postadressen får inte innehålla åäö";
    input.classList.add("is-invalid");
    return false;
  } else if (regEx.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
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
    let card = document.createElement("div");
    card.setAttribute("id", user.id);
    card.classList.add("card", "p-3", "m-2");

    let innerCard = document.createElement("div");
    innerCard.classList.add("d-flex", "justify-content-between");

    let userInfo = document.createElement("div");
    userInfo.classList.add("d-flex", "flex-column");

    let buttons = document.createElement("div");
    buttons.classList.add("d-flex", "justify-content-between");

    let userName = document.createElement("h3");
    userName.innerText = `${user.firstName} ${user.lastName}`;

    let userEmail = document.createElement("small");
    userEmail.innerText = user.email;

    let buttonChange = document.createElement("button");
    buttonChange.classList.add("btn", "btn-primary", "my-3");
    buttonChange.innerText = "Ändra";
    buttonChange.addEventListener("click", (e) => {
      card.classList.remove("unchanged");
      card.classList.add("changed");
    });

    let buttonDelete = document.createElement("button");
    buttonDelete.classList.add("btn", "btn-danger", "my-3");
    buttonDelete.innerText = "Radera";
    buttonDelete.addEventListener("click", (e) => {
      let thisCard = users.findIndex((user) => user.id == card.id);
      users.splice(thisCard, 1);
      renderUsers();
    });

    userInfo.appendChild(userName);
    userInfo.appendChild(userEmail);
    buttons.appendChild(buttonChange);
    buttons.appendChild(buttonDelete);
    innerCard.appendChild(userInfo);
    innerCard.appendChild(buttons);
    card.appendChild(innerCard);
    output.appendChild(card);
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
