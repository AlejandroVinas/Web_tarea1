const apiBase = "/api";
const statusEl = document.getElementById("status");
const appEl = document.getElementById("app");
const authEl = document.getElementById("auth");

function setStatus(msg, ok = true) {
  statusEl.innerText = msg;
  statusEl.style.color = ok ? "green" : "red";
}

// Register
document.getElementById("btnRegister").onclick = async () => {
  const username = document.getElementById("regUser").value.trim();
  const password = document.getElementById("regPass").value;
  const role = document.getElementById("regRole").value;

  try {
    const res = await fetch(`${apiBase}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error");
    setStatus("Usuario registrado. Haz login.");
  } catch (err) {
    setStatus(err.message, false);
  }
};

// Login
document.getElementById("btnLogin").onclick = async () => {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value;

  try {
    const res = await fetch(`${apiBase}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error");
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setupUI(data.user);
    setStatus("Autenticado");
  } catch (err) {
    setStatus(err.message, false);
  }
};

function setupUI(user) {
  authEl.style.display = "none";
  appEl.style.display = "block";
  document.getElementById("username").innerText = user.username;
  document.getElementById("role").innerText = user.role;
  if (user.role === "admin") document.getElementById("adminActions").style.display = "block";
  else document.getElementById("adminActions").style.display = "none";
}

// Logout
document.getElementById("btnLogout").onclick = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  authEl.style.display = "block";
  appEl.style.display = "none";
  setStatus("Sesión cerrada");
};

// Productos
document.getElementById("btnGoProducts").onclick = async () => {
  document.getElementById("productsList").style.display = "block";
  await loadProducts();
};

document.getElementById("btnCreate").onclick = async () => {
  const name = document.getElementById("pName").value.trim();
  const desc = document.getElementById("pDesc").value.trim();
  const price = parseFloat(document.getElementById("pPrice").value);
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${apiBase}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      body: JSON.stringify({ name, description: desc, price })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error");
    setStatus("Producto creado");
    await loadProducts();
  } catch (err) {
    setStatus(err.message, false);
  }
};

async function loadProducts() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${apiBase}/products`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error");
    const ul = document.getElementById("products");
    ul.innerHTML = "";
    data.forEach(p => {
      const li = document.createElement("li");
      li.innerText = `${p.name} - $ ${p.price} - ${p.description || ""}`;
      ul.appendChild(li);
    });
  } catch (err) {
    setStatus(err.message, false);
  }
}

// Si ya hay token en localStorage, setear UI
const savedUser = JSON.parse(localStorage.getItem("user") || "null");
if (savedUser) setupUI(savedUser);
