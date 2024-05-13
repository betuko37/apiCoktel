// Manejar el envío del formulario
document.getElementById('complaint-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
    
    // Obtener el texto de la queja o recomendación
    var complaintText = document.getElementById('complaint-text').value;
    
    // Mostrar la queja o recomendación ingresada
    displayComplaint(complaintText);
    
    // Limpiar el campo de texto después de enviar la queja o recomendación
    document.getElementById('complaint-text').value = '';
  });
  
  // Función para mostrar la queja o recomendación ingresada
  function displayComplaint(complaintText) {
    // Crear un elemento de lista para mostrar la queja o recomendación
    var listItem = document.createElement('li');
    listItem.textContent = complaintText;
    
    // Agregar la queja o recomendación a la lista de quejas y recomendaciones
    document.getElementById('complaints-list').appendChild(listItem);
  }
  