const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const output = document.querySelector("#output");

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
  });

  let buttonRadera = document.createElement("button");
  buttonRadera.classList.add("btn", "btn-dark");
  buttonRadera.innerText = "Radera";
  buttonRadera.addEventListener("click", () => {
    card.classList.add("deleted");
  });

  innerCard.appendChild(title);
  innerCard.appendChild(buttonKlar);
  innerCard.appendChild(buttonOklar);
  innerCard.appendChild(buttonRadera);
  card.appendChild(innerCard);
  output.appendChild(card);
};

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  createTodo(input.value);
  form.reset();
});
