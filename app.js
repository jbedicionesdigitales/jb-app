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
    '<a class="btn secondary" href="ebook.html?id=' + index + '">Ver contenido</a>' +    
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
      '<div class="price">$13.500</div>' +
      '<p>Elegí el e-book que quieras y compralo de forma segura.</p>' +
      '<a class="btn primary" href="' + siteConfig.payments.shopify + '" target="_blank">Ver tienda</a>' +
    '</article>' +

    '<article class="card plan">' +
      '<span class="tag">Mensual</span>' +
      '<h3>Membresía Mensual</h3>' +
      '<div class="price">$9.990/mes</div>' +
      '<p>Acceso premium mensual a e-books, recetas, bonus e IA Chef JB.</p>' +
      '<a class="btn primary" href="' + siteConfig.payments.planMensual + '" target="_blank">Comprar mensual</a>' +
    '</article>' +

    '<article class="card plan featured">' +
      '<span class="tag">Más conveniente</span>' +
      '<h3>Membresía Anual</h3>' +
      '<div class="price">$89.990/año</div>' +
      '<p>12 meses de acceso premium con mayor ahorro y contenido exclusivo.</p>' +
      '<a class="btn primary" href="' + siteConfig.payments.planAnual + '" target="_blank">Comprar anual</a>' +
    '</article>' +

    '<article class="card plan">' +
      '<span class="tag">De por vida</span>' +
      '<h3>Membresía Vitalicia</h3>' +
      '<div class="price">$129.990</div>' +
      '<p>Pago único con acceso permanente a la biblioteca y futuras actualizaciones.</p>' +
      '<a class="btn primary" href="' + siteConfig.payments.planVitalicio + '" target="_blank">Comprar vitalicia</a>' +
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

[15:24, 5/7/2026] Venta Ebooks en Alta Calidad: <h2 id="planificador">📅 Planificador Semanal JB</h2>

<section class="card">

  <p>Organizá tus comidas de toda la semana utilizando las recetas de tus e-books.</p>

  <table class="planner">
    <tr>
      <th>Día</th>
      <th>Plan de comidas</th>
    </tr>

    <tr><td>Lunes</td><td><input type="text" id="lunes"></td></tr>
    <tr><td>Martes</td><td><input type="text" id="martes"></td></tr>
    <tr><td>Miércoles</td><td><input type="text" id="miercoles"></td></tr>
    <tr><td>Jueves</td><td><input type="text" id="jueves"></td></tr>
    <tr><td>Viernes</td><td><input type="text" id="viernes"></td></tr>
    <tr><td>Sábado</td><td><input type="text" id="sabado"></td></tr>
    <tr><td>Domingo</td><td><input type="text" id="domingo"></td></tr>

  </table>

  <button class="btn primary">Guardar planificación</button>

</section>
[15:27, 5/7/2026] Venta Ebooks en Alta Calidad: function guardarPlanificacion() {
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  dias.forEach(dia => {
    const input = document.getElementById(dia);
    if (input) {
      localStorage.setItem("plan_" + dia, input.value);
    }
  });

  alert("Planificación guardada correctamente ✅");
}

function cargarPlanificacion() {
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  dias.forEach(dia => {
    const input = document.getElementById(dia);
    if (input) {
      input.value = localStorage.getItem("plan_" + dia) || "";
    }
  });
}

document.addEventListener("DOMContentLoaded", cargarPlanificacion);
