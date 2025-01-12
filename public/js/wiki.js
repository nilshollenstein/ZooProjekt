async function fetchAnimals() {
  const response = await fetch("../data/animals.json"); // Angepasster Pfad
  return response.json();
}

// Funktion zum Anzeigen der Tierdaten
async function showAnimalData(animalKey) {
  const animals = await fetchAnimals();

  const animalDataContainer = document.getElementById("animal-data");
  const nameElement = document.getElementById("animal-name");
  const imageElement = document.getElementById("animal-image");
  const descriptionElement = document.getElementById("animal-description");
  const habitatElement = document.getElementById("animal-habitat");
  const dietElement = document.getElementById("animal-diet");
  const sizeElement = document.getElementById("animal-size");
  const weightElement = document.getElementById("animal-weight");
  const lifespanElement = document.getElementById("animal-lifespan");
  const statusElement = document.getElementById("animal-status");

  if (animals[animalKey]) {
    const animal = animals[animalKey];

    nameElement.textContent = `${animal.name}`;
    imageElement.src = animal.image;
    imageElement.alt = `${animal.name} Bild`;
    imageElement.style.display = "block";
    descriptionElement.textContent = `Beschreibung: ${animal.description}`;
    habitatElement.textContent = `Lebensraum: ${animal.habitat}`;
    dietElement.textContent = `Nahrung: ${animal.diet}`;
    sizeElement.textContent = `Größe: ${animal.size}`;
    weightElement.textContent = `Gewicht: ${animal.weight}`;
    lifespanElement.textContent = `Lebensspanne: ${animal.lifespan}`;
    statusElement.textContent = `Gefährdungsstatus: ${animal.status}`;

    document.title = `${animal.name} - Tier-Wiki`;

    animalDataContainer.style.display = "block";
  } else {
    nameElement.textContent = "Tier nicht gefunden!";
    imageElement.style.display = "none";
    descriptionElement.textContent = "";
    habitatElement.textContent = "";
    dietElement.textContent = "";
    sizeElement.textContent = "";
    weightElement.textContent = "";
    lifespanElement.textContent = "";
    statusElement.textContent = "";
    animalDataContainer.style.display = "block";

    document.title = "Tier-Wiki";
  }
}
