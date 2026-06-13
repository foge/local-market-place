let user = "";

function login() {
  let name = document.getElementById("username").value;

  if (!name) return;

  user = name;

  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function addListing() {
  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let contact = document.getElementById("contact").value;
  let location = document.getElementById("location").value;

  if (!title || !price || !contact) return;

  let div = document.createElement("div");
  div.className = "listing";

  div.innerHTML = `
    <h3>${title}</h3>
    <p>£${price}</p>
    <p>📍 ${location}</p>
    <small>👤 ${user}</small><br>
    <small>${contact}</small>
  `;

  document.getElementById("list").appendChild(div);
}
