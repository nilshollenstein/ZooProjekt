// Preise für Haupt- und Nebensaison
const seasonPrices = {
  mainSeason: {
    child1: 0,
    child2: 15,
    teen: 24,
    adult: 29,
  },
  offSeason: {
    child1: 0,
    child2: 10,
    teen: 20,
    adult: 25,
  },
};

const ticketCounts = {
  child1: 0,
  child2: 0,
  teen: 0,
  adult: 0,
};

function getSeason() {
  const currentMonth = new Date().getMonth() + 1;
  return currentMonth >= 3 && currentMonth <= 10 ? "mainSeason" : "offSeason";
}

function updatePrices() {
  const season = getSeason();
  const prices = seasonPrices[season];
  document.getElementById("seasonInfo").textContent =
    season === "mainSeason"
      ? "Hauptsaison (März - Oktober)"
      : "Nebensaison (November - Februar)";

  for (const category in prices) {
    const price = prices[category];
    const priceText = price === 0 ? "Gratis" : `${price} CHF`;
    document.getElementById(`price-${category}`).textContent = priceText;
  }

  updateTotals();
}

function updateTotals() {
  const season = getSeason();
  const prices = seasonPrices[season];
  let totalTickets = 0;
  let grandTotal = 0;

  for (const category in ticketCounts) {
    const count = ticketCounts[category];
    const price = prices[category];
    const categoryTotal = count * price;

    document.getElementById(`count-${category}`).textContent = count;
    document.getElementById(
      `total-${category}`
    ).textContent = `${categoryTotal} CHF`;

    totalTickets += count;
    grandTotal += categoryTotal;
  }

  document.getElementById("totalTickets").textContent = totalTickets;
  document.getElementById("grandTotal").textContent = `${grandTotal} CHF`;
}

document.querySelectorAll(".increment").forEach((button) => {
  button.addEventListener("click", (event) => {
    const category = event.target.dataset.category;
    ticketCounts[category]++;
    updateTotals();
  });
});

document.querySelectorAll(".decrement").forEach((button) => {
  button.addEventListener("click", (event) => {
    const category = event.target.dataset.category;
    if (ticketCounts[category] > 0) {
      ticketCounts[category]--;
      updateTotals();
    }
  });
});
// Funktion zur Steuerung der Formularanzeige
function togglePaymentForms() {
  const selectedMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );
  const cardForm = document.getElementById("cardDetailsForm");
  const invoiceForm = document.getElementById("invoiceDetailsForm");

  cardForm.classList.add("hidden");
  invoiceForm.classList.add("hidden");

  if (selectedMethod) {
    if (selectedMethod.value === "card") {
      cardForm.classList.remove("hidden");
    } else if (selectedMethod.value === "invoice") {
      invoiceForm.classList.remove("hidden");
    }
  }
}

// Event-Listener für die Auswahl der Zahlungsmethode
document.querySelectorAll('input[name="paymentMethod"]').forEach((input) => {
  input.addEventListener("change", togglePaymentForms);
});

// Formularvalidierung und Checkout
document.getElementById("paymentForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Standard-Submit verhindern

  const selectedMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );
  if (!selectedMethod) {
    alert("Bitte wählen Sie eine Zahlungsmethode aus.");
    return;
  }

  if (selectedMethod.value === "twint") {
    // Weiterleitung zu Twint
    window.location.href = "https://www.twint.ch";
    return;
  }

  if (selectedMethod.value === "card") {
    // Validierung der Kartendetails
    const cardHolderName = document
      .getElementById("cardHolderName")
      .value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiryDate = document.getElementById("expiryDate").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!cardHolderName) {
      alert("Bitte geben Sie den Namen des Karteninhabers ein.");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Bitte geben Sie eine gültige Kartennummer ein.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      alert("Bitte geben Sie ein gültiges Ablaufdatum ein (MM/YY).");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("Bitte geben Sie einen gültigen CVV ein.");
      return;
    }
  }

  if (selectedMethod.value === "invoice") {
    // Validierung der Rechnungsdetails
    const invoiceName = document.getElementById("invoiceName").value.trim();
    const invoiceAddress = document
      .getElementById("invoiceAddress")
      .value.trim();
    const invoiceEmail = document.getElementById("invoiceEmail").value.trim();

    if (!invoiceName) {
      alert("Bitte geben Sie einen Namen ein.");
      return;
    }

    if (!invoiceAddress) {
      alert("Bitte geben Sie eine Adresse ein.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invoiceEmail)) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
  }

  alert("Checkout erfolgreich! Vielen Dank für Ihren Einkauf.");
});

document.addEventListener("DOMContentLoaded", updatePrices);
