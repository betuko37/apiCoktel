document.addEventListener("DOMContentLoaded", function () {
  // FILTRA LAS BEBIDAS POR CATEGORÍA AL CARGAR EL DOCUMENTO
  filterByCategory("Ordinary Drink");
});

async function fetchCocktails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function filterByCategory(category) {
  // CONSTRUYE LA URL CON LA CATEGORÍA ESPECIFICADA
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  // OBTIENE LAS BEBIDAS QUE CORRESPONDEN A LA CATEGORÍA
  const cocktails = await fetchCocktails(url);
  if (cocktails) {
    // MUESTRA LAS BEBIDAS FILTRADAS
    displayCocktails(cocktails);
  }
}

function displayCocktails(cocktails) {
  const cocktailGrid = document.getElementById("cocktailGrid");
  const popupContainer = document.querySelector(".popup-container");
  const closeButton = document.getElementById("close-button");
  cocktailGrid.innerHTML = "";

  cocktails.forEach((cocktail) => {
    const cocktailElement = document.createElement("div");
    cocktailElement.classList.add("cocktail");
    cocktailElement.classList.add("r");
    cocktailElement.innerHTML = `
                <div class="cocktail1">
                    <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                </div>
                <div class="cocktail2">
                    <h3>${cocktail.strDrink}</h3>
                </div>
            `;
    cocktailElement.addEventListener("click", async function () {
      // AL HACER CLIC EN UNA BEBIDA, OBTIENE LOS DETALLES DE LA BEBIDA
      const cocktailDetails = await fetchCocktailDetails(cocktail.idDrink);
      if (cocktailDetails) {
        // MUESTRA LOS DETALLES DE LA BEBIDA EN UN POPUP
        document.getElementById("popup-title").textContent =
          cocktailDetails.strDrink;
        document.getElementById("popup-image").src =
          cocktailDetails.strDrinkThumb;
        document.getElementById(
          "popup-category"
        ).textContent = `Categoría: ${cocktailDetails.strCategory}`;
        document.getElementById(
          "popup-instructions"
        ).textContent = `Instrucciones: ${cocktailDetails.strInstructions}`;

        const ingredientsList = document.getElementById("popup-ingredients");
        ingredientsList.innerHTML = "";

        // RECORRE LOS INGREDIENTES Y LAS MEDIDAS
        for (let i = 1; i <= 15; i++) {
          const ingredientName = cocktailDetails[`strIngredient${i}`];
          const ingredientMeasure = cocktailDetails[`strMeasure${i}`];
          if (ingredientName) {
            // CREA ELEMENTOS PARA MOSTRAR LOS INGREDIENTES Y LAS MEDIDAS
            const ingredientDiv = document.createElement("div");
            ingredientDiv.classList.add("ingredient");

            const ingredientImg = document.createElement("img");
            ingredientImg.src = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
            ingredientImg.alt = ingredientName;
            ingredientImg.style.width = "50px";
            ingredientImg.style.height = "50px";
            ingredientDiv.appendChild(ingredientImg);

            const ingredientText = document.createElement("p");
            ingredientText.textContent = ingredientMeasure
              ? `${ingredientName} - ${ingredientMeasure}`
              : ingredientName;
            ingredientDiv.appendChild(ingredientText);

            ingredientsList.appendChild(ingredientDiv);
          }
        }

        // MUESTRA EL POPUP CON LOS DETALLES DE LA BEBIDA
        popupContainer.style.display = "block";
      }
    });
    cocktailGrid.appendChild(cocktailElement);
  });

  closeButton.addEventListener("click", function () {
    // CIERRA EL POPUP AL HACER CLIC EN EL BOTÓN DE CERRAR
    popupContainer.style.display = "none";
  });
}

async function fetchCocktailDetails(id) {
  // OBTIENE LOS DETALLES DE UNA BEBIDA ESPECÍFICA POR SU ID
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks[0];
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
