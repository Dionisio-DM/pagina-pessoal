const cardBtn = document.getElementById("card-btn");
const card = document.querySelector(".card");

const submitForm = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameRegex = /^(?!.*\s{2,})\b[a-zA-ZÀ-ú]+(?:\s[a-zA-ZÀ-ú]+)*\b$/;
const emailRegex = /^(?!\\s*$)[^\s@]+@[^\s@]+\.[^\s@]+$/;

cardBtn.addEventListener("click", () => {
  card.classList.toggle("card-visible");
  cardBtn.classList.toggle("rotate");
});

const confirmField = (input, regex) => {
  if (!regex.test(input.value)) {
    input.classList.remove("success");
    input.classList.add("error");
  } else {
    input.classList.remove("error");
    input.classList.add("success");
  }
};

nameInput.addEventListener("change", () => confirmField(nameInput, nameRegex));

emailInput.addEventListener("change", () =>
  confirmField(emailInput, emailRegex)
);

submitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!emailRegex.test(emailInput.value) || !nameRegex.test(nameInput.value)) {
    alert("Preencha os campos corretamente");
    return;
  }

  const form = e.target;
  const data = new FormData(form);

  nameInput.value = "";
  nameInput.classList.remove("success");
  emailInput.value = "";
  emailInput.classList.remove("success");
  messageInput.value = "";

  fetch("/formulario", {
    method: "POST",
    body: new URLSearchParams(data),
  })
    .then((resp) => resp.json())
    .then((json) => console.log(JSON.stringify(json)))
    .catch((e) => console.log(e));
});
