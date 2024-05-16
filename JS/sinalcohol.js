async function fetchNonAlcoholicCocktails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function fetchCocktailDetails(id) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks[0] || null;
  } catch (error) {
    console.error("Error fetching cocktail details:", error);
    return null;
  }
}

async function filterByNonAlcoholic() {
  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
  const cocktails = await fetchNonAlcoholicCocktails(url);
  if (cocktails.length > 0) {
    displayCocktails(cocktails);
  } else {
    console.log("No se encontraron cócteles sin alcohol");
  }
}

function displayCocktails(cocktails) {
  const closeButton = document.getElementById("close-button");
  const cocktailGrid = document.getElementById("cocktailGrid");
  cocktailGrid.innerHTML = "";
  const popupContainer = document.querySelector(".popup-container");

  cocktails.forEach((cocktail) => {
    const cocktailElement = document.createElement("div");
    cocktailElement.classList.add("cocktail");
    cocktailElement.classList.add("r");
    cocktailElement.innerHTML = `
            <div class="coktail1">
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
            </div>
            <div class="coktail2">
                <h3>${cocktail.strDrink}</h3>
            </div>
        `;
    cocktailElement.addEventListener("click", async function () {
      const cocktailDetails = await fetchCocktailDetails(cocktail.idDrink);
      if (cocktailDetails) {
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

        for (let i = 1; i <= 15; i++) {
          const ingredientName = cocktailDetails[`strIngredient${i}`];
          const ingredientMeasure = cocktailDetails[`strMeasure${i}`];
          if (ingredientName && ingredientMeasure) {
            const ingredientDiv = document.createElement("div");
            ingredientDiv.classList.add("ingredient");

            const ingredientImg = document.createElement("img");
            ingredientImg.src = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
            ingredientImg.alt = ingredientName;
            ingredientImg.style.width = "50px";
            ingredientImg.style.height = "50px";
            ingredientDiv.appendChild(ingredientImg);

            const ingredientText = document.createElement("p");
            ingredientText.textContent = `${ingredientMeasure} de ${ingredientName}`;
            ingredientDiv.appendChild(ingredientText);

            ingredientsList.appendChild(ingredientDiv);
          }
        }

        popupContainer.style.display = "block";
      } else {
        console.error("No se encontraron detalles del cóctel");
      }
    });

    cocktailGrid.appendChild(cocktailElement);
  });

  // Verificar si closeButton se ha encontrado correctamente
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      popupContainer.style.display = "none";
    });
  } else {
    console.error("closeButton not found");
  }
}


document.addEventListener("DOMContentLoaded", function () {
  filterByNonAlcoholic();
});

