// Función para obtener la información de la receta
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let getInfo = (recipeName) => {
  fetch(url + recipeName)
    .then((response) => response.json())
    .then((data) => {
      let myDrink = data.drinks[0];
      let count = 1;
      let ingredients = [];
      for (let i in myDrink) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && myDrink[i]) {
          ingredient = myDrink[i];
          if (myDrink[`strMeasure` + count]) {
            measure = myDrink[`strMeasure` + count];
          } else {
            measure = "";
          }
          count += 1;
          ingredients.push(`${measure} ${ingredient}`);
        }
      }
      // Redireccionar a receta.html con los parámetros de la receta
      window.location.href = `receta-sinalcohol.html?name=${encodeURIComponent(myDrink.strDrink)}&image=${myDrink.strDrinkThumb}&instructions=${myDrink.strInstructions}&ingredients=${encodeURIComponent(ingredients.join(','))}`;

    })
    .catch(() => {
      result.innerHTML = `<h3 class="msg">Error: Please enter a valid input</h3>`;
    });
};

// Agregar eventos de clic a los botones "Ver Receta"
document.querySelectorAll('.ver-receta').forEach(button => {
  button.addEventListener('click', function() {
    getInfo(this.dataset.recipe);
  });
});



