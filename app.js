let siteConfig = DEFAULT_CONFIG;

function renderAll() {
  document.getElementById("brandName").textContent = siteConfig.brandName;
  document.getElementById("brandSubtitle").textContent = siteConfig.brandSubtitle;
  document.getElementById("heroPill").textContent = siteConfig.heroPill;
  document.getElementById("heroTitle").textContent = siteConfig.heroTitle;
  document.getElementById("heroText").textContent = siteConfig.heroText;

  document.getElementById("hero").style.backgroundImage =
    "linear-gradient(115deg, rgba(33,21,13,.9), rgba(206,93,44,.55)), url('" + siteConfig.heroImage + "')";

  renderEbooks();
  renderPlans();
}

function renderEbooks() {
  const grid = document.getElementById("ebookGrid");
  if (!grid) return;

  grid.innerHTML = "";

  siteConfig.ebooks.forEach(function(book, index) {    
    const card = document.createElement("article");
    card.className = "card ebook";

    card.innerHTML =
  '<img src="' + book.image + '" alt="' + book.title + '">' +
  '<span class="tag">E-book PDF</span>' +
  '<h3>' + book.title + '</h3>' +
  '<p>' + book.description + '</p>' +
  '<div class="ebook-info">' +
    '<span>📖 50 recetas</span>' +
    '<span>🎁 Bonus exclusivos</span>' +
    '<span>⭐ Edición Premium</span>' +
  '</div>' +
  '<div class="ebook-actions">' +
'<a class="btn secondary" href="' + book.muestra + '" target="_blank">📖 Ver muestra gratuita</a>' +
'<a class="btn primary" href="' + book.shopify + '" target="_blank">Comprar ahora</a>' +
'</div>';   
    '<a class="btn primary" href="' + book.shopify + '" target="_blank">Comprar ahora</a>' +
  '</div>';
    grid.appendChild(card);
  });
}

function renderPlans() {
  const grid = document.getElementById("plansGrid");
  if (!grid) return;

  grid.innerHTML =
    '<article class="card plan">' +
      '<span class="tag">E-books</span>' +
      '<h3>Compra individual</h3>' +
      '<div class="price">$12.990</div>' +
      '<p>Elegí el e-book que quieras y compralo de forma segura.</p>' +
      '<a class="btn primary" href="' + siteConfig.payments.shopify + '" target="_blank">Ver tienda</a>' +
    '</article>' +

    '<article class="card plan">' +
      '<span class="tag">Mensual</span>' +
      '<h3>Membresía Mensual</h3>' +
      '<div class="price">$9.990</div>' +
      '<p>Acceso premium mensual a e-books, recetas, bonus exclusivos.</p>' +
      '<a class="btn primary" href="' + siteConfig.payments.planMensual + '" target="_blank">Comprar mensual</a>' +
    '</article>' +

    '<article class="card plan featured">' +
      '<span class="tag">Más conveniente</span>' +
      '<h3>Membresía Semestral</h3>' +
      '<div class="price">$39.990</div>' +
      '<p>6 meses de acceso premium con mayor ahorro y contenido exclusivo.</p>' +
      '<a class="btn primary" href="' + siteConfig.payments.planSemestral + '" target="_blank">Comprar semestral</a>' +
    '</article>' +

    '<article class="card plan">' +
      '<span class="tag">Anual</span>' +
      '<h3>Membresía Anual</h3>' +
      '<div class="price">$79.990</div>' +
      '<p>12 meses con acceso a toda la biblioteca y futuras actualizaciones.</p>' +
      '<a class="btn primary" href="' + siteConfig.payments.planAnual + '" target="_blank">Comprar anual</a>' +
    '</article>';
}
document.addEventListener("DOMContentLoaded", renderAll);
function quickAsk(question) {
    document.getElementById("question").value = question;
    askAI();
}
async function askAI() {
  const input = document.getElementById("question");
  const chat = document.getElementById("chat");
  const question = input.value.trim();

  if (!question) return;

  chat.innerHTML += `<div class="msg user">${question}</div>`;

  const res = await fetch("/ask", {    
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  if (!res.ok) {
  const txt = await res.text();
  alert(txt);
  return;
}

const data = await res.json();

chat.innerHTML += `<div class="msg bot">${data.answer}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

const camposPlanificacion = [
  "lunes_desayuno", "lunes_almuerzo", "lunes_merienda", "lunes_cena",
  "martes_desayuno", "martes_almuerzo", "martes_merienda", "martes_cena",
  "miercoles_desayuno", "miercoles_almuerzo", "miercoles_merienda", "miercoles_cena",
  "jueves_desayuno", "jueves_almuerzo", "jueves_merienda", "jueves_cena",
  "viernes_desayuno", "viernes_almuerzo", "viernes_merienda", "viernes_cena",
  "sabado_desayuno", "sabado_almuerzo", "sabado_merienda", "sabado_cena",
  "domingo_desayuno", "domingo_almuerzo", "domingo_merienda", "domingo_cena"
];

function guardarPlanificacion() {
  camposPlanificacion.forEach(id => {
    const input = document.getElementById(id);
    if (input) localStorage.setItem("plan_" + id, input.value);
  });

  alert("Planificación semanal guardada correctamente ✅");
}

function cargarPlanificacion() {
  camposPlanificacion.forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = localStorage.getItem("plan_" + id) || "";
  });
}

function borrarPlanificacion() {
  if (!confirm("¿Querés borrar toda la planificación semanal?")) return;

  camposPlanificacion.forEach(id => {
    localStorage.removeItem("plan_" + id);
    const input = document.getElementById(id);
    if (input) input.value = "";
  });

  alert("Planificación borrada correctamente ✅");
}

document.addEventListener("DOMContentLoaded", cargarPlanificacion);
function obtenerListaCompras() {
  return JSON.parse(localStorage.getItem("listaComprasJB")) || [];
}

function guardarListaCompras(lista) {
  localStorage.setItem("listaComprasJB", JSON.stringify(lista));
}

function mostrarListaCompras() {
  const lista = obtenerListaCompras();
  const contenedor = document.getElementById("listaCompras");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach((producto, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <label>
        <input type="checkbox" ${producto.comprado ? "checked" : ""} onchange="marcarProducto(${index})">
        ${producto.nombre}
      </label>
      <button type="button" onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    contenedor.appendChild(item);
  });
}

function agregarProducto() {
  const input = document.getElementById("nuevoProducto");
  if (!input || !input.value.trim()) return;

  const lista = obtenerListaCompras();
  lista.push({ nombre: input.value.trim(), comprado: false });

  guardarListaCompras(lista);
  input.value = "";
  mostrarListaCompras();
}

function marcarProducto(index) {
  const lista = obtenerListaCompras();
  lista[index].comprado = !lista[index].comprado;
  guardarListaCompras(lista);
  mostrarListaCompras();
}

function eliminarProducto(index) {
  const lista = obtenerListaCompras();
  lista.splice(index, 1);
  guardarListaCompras(lista);
  mostrarListaCompras();
}

function borrarListaCompras() {
  if (!confirm("¿Querés borrar toda la lista de compras?")) return;
  localStorage.removeItem("listaComprasJB");
  mostrarListaCompras();
}

document.addEventListener("DOMContentLoaded", mostrarListaCompras);




