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

  if (!username || !password) {
    setStatus("Completa todos los campos", false);
    return;
  }

  try {
    const res = await fetch(`${apiBase}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error");
    setStatus("Usuario registrado. Haz login.");
    // Limpiar campos
    document.getElementById("regUser").value = "";
    document.getElementById("regPass").value = "";
  } catch (err) {
    setStatus(err.message, false);
  }
};

// Login
document.getElementById("btnLogin").onclick = async () => {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value;

  if (!username || !password) {
    setStatus("Completa todos los campos", false);
    return;
  }

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
    setStatus("Autenticado correctamente");
  } catch (err) {
    setStatus(err.message, false);
  }
};

function setupUI(user) {
  authEl.style.display = "none";
  appEl.style.display = "block";
  document.getElementById("username").innerText = user.username;
  document.getElementById("role").innerText = user.role;
  if (user.role === "admin") {
    document.getElementById("adminActions").style.display = "block";
  } else {
    document.getElementById("adminActions").style.display = "none";
  }
}

// Logout
document.getElementById("btnLogout").onclick = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  authEl.style.display = "block";
  appEl.style.display = "none";
  document.getElementById("productsList").style.display = "none";
  setStatus("Sesión cerrada");
};

// Ir a productos
document.getElementById("btnGoProducts").onclick = async () => {
  document.getElementById("productsList").style.display = "block";
  await loadProducts();
};

// Ir al chat
document.getElementById("btnGoChat").onclick = () => {
  window.location.href = "/chat.html";
};

// Crear producto
document.getElementById("btnCreate").onclick = async () => {
  const name = document.getElementById("pName").value.trim();
  const desc = document.getElementById("pDesc").value.trim();
  const price = parseFloat(document.getElementById("pPrice").value);
  
  if (!name || isNaN(price)) {
    setStatus("Completa nombre y precio", false);
    return;
  }

  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${apiBase}/products`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": "Bearer " + token 
      },
      body: JSON.stringify({ name, description: desc, price })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error");
    setStatus("Producto creado correctamente");
    // Limpiar campos
    document.getElementById("pName").value = "";
    document.getElementById("pDesc").value = "";
    document.getElementById("pPrice").value = "";
    await loadProducts();
  } catch (err) {
    setStatus(err.message, false);
  }
};

async function loadProducts() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
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
      li.innerHTML = `
        <strong>${p.name}</strong> - $${p.price} 
        ${p.description ? `- ${p.description}` : ""}
        ${user.role === "admin" ? `
          <button class="btn-edit" data-id="${p._id}">Editar</button>
          <button class="btn-delete" data-id="${p._id}">Eliminar</button>
        ` : ""}
      `;
      ul.appendChild(li);
    });

    // Event listeners para editar y eliminar
    if (user.role === "admin") {
      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.onclick = async () => {
          if (!confirm("¿Eliminar este producto?")) return;
          await deleteProduct(btn.dataset.id);
        };
      });

      document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.onclick = async () => {
          await editProduct(btn.dataset.id);
        };
      });
    }
  } catch (err) {
    setStatus(err.message, false);
  }
}

async function deleteProduct(id) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${apiBase}/products/${id}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + token }
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Error");
    }
    setStatus("Producto eliminado");
    await loadProducts();
  } catch (err) {
    setStatus(err.message, false);
  }
}

async function editProduct(id) {
  const token = localStorage.getItem("token");
  try {
    // Obtener producto actual
    const res = await fetch(`${apiBase}/products/${id}`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const product = await res.json();
    if (!res.ok) throw new Error(product.message || "Error");

    // Pedir nuevos valores
    const newName = prompt("Nuevo nombre:", product.name);
    if (newName === null) return; // Cancelado
    
    const newPrice = prompt("Nuevo precio:", product.price);
    if (newPrice === null) return;
    
    const newDesc = prompt("Nueva descripción:", product.description || "");
    if (newDesc === null) return;

    // Actualizar
    const updateRes = await fetch(`${apiBase}/products/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token 
      },
      body: JSON.stringify({ 
        name: newName.trim(), 
        price: parseFloat(newPrice), 
        description: newDesc.trim() 
      })
    });
    
    if (!updateRes.ok) {
      const data = await updateRes.json();
      throw new Error(data.message || "Error");
    }
    
    setStatus("Producto actualizado");
    await loadProducts();
  } catch (err) {
    setStatus(err.message, false);
  }
}

// Si ya hay token en localStorage, setear UI
const savedUser = JSON.parse(localStorage.getItem("user") || "null");
if (savedUser) {
  setupUI(savedUser);
}