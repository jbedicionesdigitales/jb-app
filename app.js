let siteConfig = JSON.parse(localStorage.getItem("JB_CONFIG") || "null") || DEFAULT_CONFIG;

function saveConfig() {
  localStorage.setItem("JB_CONFIG", JSON.stringify(siteConfig));
  renderAll();
}

function renderAll() {
  document.getElementById("brandName").textContent = siteConfig.brandName;
  document.getElementById("brandSubtitle").textContent = siteConfig.brandSubtitle;
  document.getElementById("heroPill").textContent = siteConfig.heroPill;
  document.getElementById("heroTitle").textContent = siteConfig.heroTitle;
  document.getElementById("heroText").textContent = siteConfig.heroText;
  document.getElementById("hero").style.backgroundImage =
    linear-gradient(115deg, rgba(33,21,13,.9), rgba(206,93,44,.55)), url('${siteConfig.heroImage}');

  renderEbooks();
  renderPlans();
  fillAdmin();
}

function renderEbooks() {
  const grid = document.getElementById("ebookGrid");
  if (!grid) return;

  grid.innerHTML = "";

  siteConfig.ebooks.forEach(book => {
    const article = document.createElement("article");
    article.className = "card ebook";

    article.innerHTML = `
      <img src="${book.image}" onerror="this.src='imagenes/placeholder.svg'" alt="${book.title}">
      <span class="tag">E-book PDF</span>
      <h3>${book.title}</h3>
      <p>${book.description}</p>
      <a class="btn primary" href="${book.shopify}" target="_blank">Comprar ahora</a>
    `;

    grid.appendChild(article);
  });
}

function renderPlans() {
  const p = siteConfig.payments || {};

  const grid = document.getElementById("plansGrid");
  if (!grid) return;

  grid.innerHTML = `
    <article class="card plan">
      <span class="tag">Venta directa</span>
      <h3>Comprar e-books</h3>
      <div class="price">$13.500</div>
      <p>Precio editable para venta individual.</p>
      <a class="btn primary" href="${p.shopify || '#'}" target="_blank">Comprar en Shopify</a>
    </article>

    <article class="card plan featured">
      <span class="tag">Recomendado</span>
      <h3>Membresía Premium</h3>
      <div class="price">$8.999/mes</div>
      <p>Acceso a contenido exclusivo, recursos y novedades.</p>
      <a class="btn primary" href="${siteConfig.planMensual || '#'}" target="_blank">Comprar membresía</a>
    </article>

    <article class="card plan">
      <span class="tag">Pago alternativo</span>
      <h3>Mercado Pago</h3>
      <p>Link editable para cobros por Mercado Pago.</p>
      <a class="btn primary" href="${p.mercadoPago || '#'}" target="_blank">Pagar con Mercado Pago</a>
    </article>

    <article class="card plan">
      <span class="tag">Hotmart</span>
      <h3>Pago internacional</h3>
      <p>Link editable para Hotmart.</p>
      <a class="btn primary" href="${p.hotmart || '#'}" target="_blank">Comprar en Hotmart</a>
    </article>
  `;
}

function fillAdmin() {
  document.getElementById("editBrandName").value = siteConfig.brandName || "";
  document.getElementById("editBrandSubtitle").value = siteConfig.brandSubtitle || "";
  document.getElementById("editHeroTitle").value = siteConfig.heroTitle || "";
  document.getElementById("editHeroText").value = siteConfig.heroText || "";
  document.getElementById("editHeroPill").value = siteConfig.heroPill || "";
  document.getElementById("editHeroImage").value = siteConfig.heroImage || "";

  document.getElementById("editShopify").value = siteConfig.payments?.shopify || "";
  document.getElementById("editMercadoPago").value = siteConfig.payments?.mercadoPago || "";
  document.getElementById("editHotmart").value = siteConfig.payments?.hotmart || "";

  const editor = document.getElementById("ebookEditor");
  if (!editor) return;

  editor.innerHTML = "";

  siteConfig.ebooks.forEach((book, index) => {
    const box = document.createElement("div");
    box.className = "ebook-edit";

    box.innerHTML = `
      <h4>E-book ${index + 1}</h4>
      <label>Título</label>
      <input id="ebookTitle${index}" value="${book.title || ""}">
      <label>Descripción</label>
      <input id="ebookDesc${index}" value="${book.description || ""}">
      <label>Imagen</label>
      <input id="ebookImage${index}" value="${book.image || ""}">
      <label>PDF</label>
      <input id="ebookPdf${index}" value="${book.pdf || ""}">
      <label>Link Shopify / Compra</label>
      <input id="ebookShopify${index}" value="${book.shopify || ""}">
    `;

    editor.appendChild(box);
  });
}

function saveMain() {
  siteConfig.brandName = document.getElementById("editBrandName").value;
  siteConfig.brandSubtitle = document.getElementById("editBrandSubtitle").value;
  siteConfig.heroTitle = document.getElementById("editHeroTitle").value;
  siteConfig.heroText = document.getElementById("editHeroText").value;
  siteConfig.heroPill = document.getElementById("editHeroPill").value;
  siteConfig.heroImage = document.getElementById("editHeroImage").value;
  saveConfig();
  alert("Cambios guardados");
}

function savePayments() {
  siteConfig.payments = {
    shopify: document.getElementById("editShopify").value,
    mercadoPago: document.getElementById("editMercadoPago").value,
    hotmart: document.getElementById("editHotmart").value
  };
  saveConfig();
  alert("Pagos guardados");
}

function saveEbooks() {
  siteConfig.ebooks = siteConfig.ebooks.map((book, index) => ({
    title: document.getElementById(ebookTitle${index}).value,
    description: document.getElementById(ebookDesc${index}).value,
    image: document.getElementById(ebookImage${index}).value,
    pdf: document.getElementById(ebookPdf${index}).value,
    shopify: document.getElementById(ebookShopify${index}).value
  }));

  saveConfig();
  alert("E-books guardados");
}

function exportConfig() {
  document.getElementById("exportBox").value =
    "const DEFAULT_CONFIG = " + JSON.stringify(siteConfig, null, 2) + ";";
}

document.addEventListener("DOMContentLoaded", renderAll);
