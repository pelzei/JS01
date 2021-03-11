"use strict";

const form = document.querySelector("#form");
const task = document.querySelector("#task");
const btn = document.querySelector("#btn");
const jsonOutput = document.querySelector("#json-output");

let todos = [];

const getJsonAsync = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  if (res.status !== 200) {
    throw new Error("error");
  }

  const data = await res.json();

  return data;
};

window.addEventListener("load", () => {
  getJsonAsync().then((data) => {
    todos = data;
    jsonOutput.innerHTML = "";

    todos.forEach((todo) => {
      if (!todo.completed) {
        jsonOutput.innerHTML += `
        <div class="card mb-3 undone">
        <div class="card-header">
        Oavklarad uppgift</div>
      <div class="card-body">
        <p class="card-text">${todo.title}</p>
        <button class="btn btn-dark">Radera</button> <button class="btn btn-success">Klar</button> <button class="btn btn-danger">Oklar</button>
      </div>
    </div>`;
      } else {
        jsonOutput.innerHTML += `
        <div class="card mb-3 done">
        <div class="card-header">
        Avklarad uppgift</div>
      <div class="card-body">
        <p class="card-text">${todo.title}</p>
        <button class="btn btn-dark">Radera</button> <button class="btn btn-success">Klar</button> <button class="btn btn-danger">Oklar</button>
      </div>
    </div>`;
      }
    });
  });
});

/*const todos = fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    //console.log("resolved ", response);
    //const data = response.json();
    //console.log(data);
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((err) => {
    console.log(err); //ger oss nästan bara network error
  });*/

const validateText = (id) => {
  const error = task.nextElementSibling;

  if (task.value === "") {
    error.innerText = "Du kan inte lämna fältet tomt";
    task.classList.add("is-unvalid");
    return false;
  } else {
    task.classList.add("is-valid");
    task.classList.remove("is-unvalid");
    return true;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateText();
});
