document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 12; 
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const cocktails = data.drinks;
            const totalItems = cocktails.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const paginationElement = document.getElementById('pagination');

            function displayCocktails(page) {
                const startIndex = (page - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const paginatedCocktails = cocktails.slice(startIndex, endIndex);

                const conAlcoholSection = document.getElementById('conAlcoholSection');
                conAlcoholSection.innerHTML = '';

                paginatedCocktails.forEach(cocktail => {
                    const cocktailDiv = document.createElement('div');
                    cocktailDiv.classList.add('cocktail');
                    cocktailDiv.innerHTML = `
                        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                        <div class="back">
                            <p class="ingredients">Ingredientes: ${getIngredients(cocktail)}</p>
                        </div>
                        <h2>${cocktail.strDrink}</h2>
                    `;
                    cocktailDiv.addEventListener('click', function() {
                        this.querySelector('img').classList.toggle('flipped');
                        this.querySelector('.back').classList.toggle('show-ingredients');
                    });
                    conAlcoholSection.appendChild(cocktailDiv);
                });
            
            }

            function getIngredients(cocktail) {
                let ingredients = '';
                for (let i = 1; i <= 15; i++) {
                    const ingredient = cocktail[`strIngredient${i}`];
                    const measure = cocktail[`strMeasure${i}`];
                    if (ingredient) {
                        if (measure) {
                            ingredients += `${ingredient}: ${measure}<br>`;
                        } else {
                            ingredients += `${ingredient}<br>`;
                        }
                    } else {
                        break;
                    }
                }
                return ingredients;
            }

            function setupPagination() {
                paginationElement.innerHTML = '';

                for (let i = 1; i <= totalPages; i++) {
                    const pageLink = document.createElement('a');
                    pageLink.classList.add('page-link');
                    pageLink.textContent = i;
                    pageLink.addEventListener('click', () => {
                        displayCocktails(i);
                    });

                    paginationElement.appendChild(pageLink);
                }
            }

            displayCocktails(1);
            setupPagination();
        })
        .catch(error => console.log('Error al obtener los datos:', error));
});

//CODIGO PARA EL SLIDER//

var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(carousel, 2000); // Cambia la imagen cada 2 segundos
}
