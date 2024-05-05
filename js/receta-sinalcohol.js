// Función para obtener parámetros de la URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Obtener parámetros de la URL
var name = getParameterByName('name');
var image = getParameterByName('image');
var instructions = getParameterByName('instructions');
var ingredients = getParameterByName('ingredients').split(',');

// Mostrar los datos en la página
var resultDiv = document.getElementById('result');
resultDiv.innerHTML = '<h2>' + name + '</h2>';
resultDiv.innerHTML += '<img src="' + image + '" alt="' + name + '">';
resultDiv.innerHTML += '<h3>Instrucciones:</h3>';
resultDiv.innerHTML += '<p>' + instructions + '</p>';
resultDiv.innerHTML += '<h3>Ingredientes:</h3>';
var ul = document.createElement('ul');
ingredients.forEach(function(ingredient) {
    var li = document.createElement('li');
    li.textContent = ingredient;
    ul.appendChild(li);
});
resultDiv.appendChild(ul);

