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

  siteConfig.ebooks.forEach(function(book) {
    const card = document.createElement("article");
    card.className = "card ebook";

    card.innerHTML =
      '<img src="' + book.image + '" alt="' + book.title + '">' +
      '<span class="tag">E-book PDF</span>' +
      '<h3>' + book.title + '</h3>' +
      '<p>' + book.description + '</p>' +
      '<a class="btn primary" href="' + book.shopify + '" target="_blank">Comprar ahora</a>';

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

    '<article class="card plan featured">' +
      '<span class="tag">Membresía</span>' +
      '<h3>Plan mensual</h3>' +
      '<div class="price">$8.999/mes</div>' +
      '<p>Acceso premium a recetas, bonus y contenido exclusivo.</p>' +
      '<a class="btn primary" href="' + siteConfig.planMensual + '" target="_blank">Comprar membresía</a>' +
    '</article>';
}

document.addEventListener("DOMContentLoaded", renderAll);
