let user = localStorage.getItem("user");
let mode = "buy";

if (user) {
  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function login() {
  let name = document.getElementById("username").value;
  if (!name) return;

  user = name;
  localStorage.setItem("user", user);

  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function setMode(m) {
  mode = m;
  render();
}

function showAll() {
  mode = "all";
  render();
}

function addListing() {
  let listing = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    contact: document.getElementById("contact").value,
    location: document.getElementById("location").value,
    type: document.getElementById("type").value,
    user: user,
    rating: []
  };

  let data = JSON.parse(localStorage.getItem("listings")) || [];
  data.push(listing);
  localStorage.setItem("listings", JSON.stringify(data));

  render();
}

function rate(index, stars) {
  let data = JSON.parse(localStorage.getItem("listings"));
  data[index].rating.push(stars);
  localStorage.setItem("listings", JSON.stringify(data));
  render();
}

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let data = JSON.parse(localStorage.getItem("listings")) || [];

  data.forEach((item, i) => {

    if (mode !== "all" && item.type !== mode) return;

    let avg = 0;
    if (item.rating.length > 0) {
      avg = item.rating.reduce((a,b)=>a+b,0) / item.rating.length;
    }

    let div = document.createElement("div");
    div.className = "listing";

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>£${item.price}</p>
      <p>📍 ${item.location}</p>
      <p>👤 ${item.user}</p>
      <p>⭐ ${avg.toFixed(1)}</p>

      <button onclick="rate(${i},1)">1⭐</button>
      <button onclick="rate(${i},2)">2⭐</button>
      <button onclick="rate(${i},3)">3⭐</button>
      <button onclick="rate(${i},4)">4⭐</button>
      <button onclick="rate(${i},5)">5⭐</button>
    `;

    list.appendChild(div);
  });
}

render();
