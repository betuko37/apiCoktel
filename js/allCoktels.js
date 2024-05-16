document.addEventListener("DOMContentLoaded", function () {
  fetchCategories();
  filterByLetter("a");
  generateAlphabetLinks();
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

async function fetchCategories() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const categories = await fetchCocktails(url);
  if (categories) {
    const categorySelect = document.getElementById('categorySelect');
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.strCategory;
      option.textContent = category.strCategory;
      categorySelect.appendChild(option);
    });

    categorySelect.addEventListener('change', function () {
      const selectedCategory = this.value;
      if (selectedCategory) {
        filterByCategory(selectedCategory);
      } else {
        document.getElementById('cocktailGrid').innerHTML = '';
      }
    });
  }
}

async function searchCocktail() {
  const searchTerm = document.getElementById("searchInput").value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  const cocktails = await fetchCocktails(url);
  if (cocktails) {
    displayCocktails(cocktails);
  }
}

async function filterByLetter(letter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  const cocktails = await fetchCocktails(url);
  if (cocktails) {
    displayCocktails(cocktails);
  }
}

async function filterByCategory(category) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const cocktails = await fetchCocktails(url);
  if (cocktails) {
    displayCocktails(cocktails);
  }
}

function displayCocktails(cocktails) {
  const cocktailGrid = document.getElementById("cocktailGrid");
  const popupContainer = document.querySelector(".popup-container");
  const closeButton = document.getElementById('close-button');
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
    cocktailElement.addEventListener("click", function () {
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
          ingredientImg.style.width = "50px";
          ingredientImg.style.height = "50px";
          ingredientDiv.appendChild(ingredientImg);

          const ingredientText = document.createElement("p");
          ingredientText.textContent = `${ingredientMeasure ? ingredientMeasure : ''} ${ingredientName}`;
          ingredientDiv.appendChild(ingredientText);

          ingredientsList.appendChild(ingredientDiv);
        }
      }

      popupContainer.style.display = "block";
    });

    cocktailGrid.appendChild(cocktailElement);
  });

  // Verificar si closeButton se ha encontrado correctamente
  if (closeButton) {
    // Si closeButton se ha encontrado, añadir un event listener para cerrar la ventana emergente
    closeButton.addEventListener('click', function () {
      popupContainer.style.display = 'none';
    });
  } else {
    console.error('closeButton not found');
  }
}

function generateAlphabetLinks() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphabetLinks = document.getElementById("alphabetLinks");

  alphabet.split("").forEach((letter) => {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = letter.toUpperCase();
    link.classList.add("linkxd");
    link.classList.add("box");
    link.onclick = (event) => {
      event.preventDefault();
      filterByLetter(letter);
    };
    alphabetLinks.appendChild(link);
  });
}

