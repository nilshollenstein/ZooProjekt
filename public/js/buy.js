document.addEventListener("DOMContentLoaded", () => {
  const ticketCounts = {
    child1: 0,
    child2: 0,
    adult: 0,
  };

  const ticketPrices = {
    child1: 0,
    child2: 10,
    adult: 20,
  };

  const updateTotals = () => {
    let totalTickets = 0;
    let grandTotal = 0;

    for (const category in ticketCounts) {
      const count = ticketCounts[category];
      const price = ticketPrices[category];
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
  };

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

  document.querySelectorAll('input[name="paymentMethod"]').forEach((input) => {
    input.addEventListener("change", () => {
      document
        .querySelectorAll(".hidden")
        .forEach((form) => form.classList.add("hidden"));

      const selectedMethod = document.querySelector(
        'input[name="paymentMethod"]:checked'
      ).value;
      if (selectedMethod === "creditCard") {
        document.getElementById("creditCardForm").classList.remove("hidden");
      }
    });
  });

  document.getElementById("paymentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Zahlung bestätigt! Vielen Dank für Ihren Kauf.");
    window.location.href = "/";
  });
});
