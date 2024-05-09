// JavaScript para el carrusel
const carrusel = document.querySelector(".carrusel");
const btnIzquierda = document.querySelector(".btn-izquierda");
const btnDerecha = document.querySelector(".btn-derecha");

document.getElementById("tragos").addEventListener("click", function () {
  window.location.href = "pages/tragos.html";
});

btnIzquierda.addEventListener("click", () => {
  carrusel.scrollLeft -= 300;
});

btnDerecha.addEventListener("click", () => {
  carrusel.scrollLeft += 300;
});

async function fetchRandomCocktails() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v2/1/popular.php"
  );
  const data = await response.json();
  return data.drinks;
}

async function updateCarouselWithRandomCocktails() {
  const carousel = document.getElementById("carousel");
  const popupContainer = document.querySelector(".popup-container");
  const closeButton = document.getElementById("close-button");

  carousel.innerHTML = "";
  const cocktails = await fetchRandomCocktails();
  cocktails.forEach(async (cocktail) => {
    const cocktailElement = document.createElement("div");
    cocktailElement.classList.add("elemento");

    const imagenContainer = document.createElement("div");
    imagenContainer.classList.add("imagen-container");

    const img = document.createElement("img");
    img.src = cocktail.strDrinkThumb;
    img.alt = cocktail.strDrink;

    const name = document.createElement("div");
    name.classList.add("nombre");
    name.textContent = cocktail.strDrink;

    // Añadir evento de clic para mostrar el contenedor emergente con información detallada
    cocktailElement.addEventListener("click", async function () {
      document.getElementById("popup-title").textContent = cocktail.strDrink;
      document.getElementById("popup-image").src = cocktail.strDrinkThumb;
      document.getElementById(
        "popup-category"
      ).textContent = `Categoría: ${cocktail.strCategory}`;
      document.getElementById(
        "popup-instructions"
      ).textContent = `Instrucciones: ${cocktail.strInstructions}`;

      const ingredientsList = document.getElementById("popup-ingredients");
      ingredientsList.innerHTML = "";

      for (let i = 1; i <= 15; i++) {
        const ingredientName = cocktail[`strIngredient${i}`];
        const ingredientMeasure = cocktail[`strMeasure${i}`];
        if (ingredientName) {
          const ingredientDiv = document.createElement("div");
          ingredientDiv.classList.add("ingredient");

          const ingredientImg = document.createElement("img");
          ingredientImg.src = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
          ingredientImg.alt = ingredientName;
          ingredientImg.style.width = "50px"; // Ajustar el ancho de la imagen a 50px
          ingredientImg.style.height = "50px"; // Ajustar el alto de la imagen a 50px
          ingredientDiv.appendChild(ingredientImg);

          const ingredientText = document.createElement("p");
          ingredientText.textContent = `${ingredientMeasure} de ${ingredientName}`;
          ingredientDiv.appendChild(ingredientText);

          ingredientsList.appendChild(ingredientDiv);
        }
      }

      popupContainer.style.display = "block";
    });

    imagenContainer.appendChild(img);
    cocktailElement.appendChild(imagenContainer);
    cocktailElement.appendChild(name);

    carousel.appendChild(cocktailElement);
  });

  // Cerrar el contenedor emergente al hacer clic en el botón de cerrar
  closeButton.addEventListener("click", () => {
    popupContainer.style.display = "none";
  });
}

updateCarouselWithRandomCocktails();
