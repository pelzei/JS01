const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const output = document.querySelector("#output");
const output2 = document.querySelector("#invalid-feedback");

let todos = [];

const fetchTodos = () => {
  fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then((res) => res.json())
    .then((data) => {
      todos = data;
      console.log(todos);
      listTodos();
    });
};

fetchTodos();

const listTodos = () => {
  output.innerHTML = "";
  todos.forEach((todo) => {
    newTodo(todo);
  });
};

const newTodo = (todo) => {
  let card = document.createElement("div");
  card.setAttribute("id", todo.id);
  card.classList.add("card", "p-3", "my-2");

  if (!todo.completed) {
    card.classList.add("undone");
  } else {
    card.classList.add("done");
  }

  let innerCard = document.createElement("div");
  innerCard.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );

  let title = document.createElement("p");
  title.innerText = todo.title;

  let buttonOklar = document.createElement("button");
  buttonOklar.classList.add("btn", "btn-danger");
  buttonOklar.innerText = "Oklar";
  buttonOklar.addEventListener("click", () => {
    card.classList.remove("done");
    card.classList.add("undone");
  });

  let buttonKlar = document.createElement("button");
  buttonKlar.classList.add("btn", "btn-success");
  buttonKlar.innerText = "Klar";
  buttonKlar.addEventListener("click", () => {
    card.classList.remove("undone");
    card.classList.add("done");
    todo.completed = !todo.completed;
  });

  let buttonRadera = document.createElement("button");
  buttonRadera.classList.add("btn", "btn-dark");
  buttonRadera.innerText = "Radera";
  buttonRadera.addEventListener("click", (e) => {
    //console.log(card.id);
    let thisCard = todos.findIndex((todo) => todo.id == card.id);
    //console.log(thisCard);
    todos.splice(thisCard, 1);
    //console.log(todos);
    listTodos();
  });
  innerCard.appendChild(title);
  innerCard.appendChild(buttonKlar);
  innerCard.appendChild(buttonOklar);
  innerCard.appendChild(buttonRadera);
  card.appendChild(innerCard);
  output.appendChild(card);
};

console.log(todos);

const createTodo = (title) => {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let newTodo = {
        ...data,
        id: Date.now().toString(),
      };
      console.log(newTodo);
      todos.unshift(newTodo);
      listTodos();
    });
};

const validateText = (id) => {
  const input = document.querySelector("#todoInput");
  const error = document.querySelector("#error");

  if (input.value == "") {
    error.innerText = "Du kan inte lägga till en tom uppgift";
    input.classList.add("is-invalid");
    return false;
  } else {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    createTodo(input.value);
    form.reset();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateText(input.value);
});
