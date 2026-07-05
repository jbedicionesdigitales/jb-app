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

  chat.innerHTML += <div class="msg user">${question}</div>;

  const res = await fetch("/functions/ask", {    
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

chat.innerHTML += <div class="msg bot">${data.answer}</div>;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

