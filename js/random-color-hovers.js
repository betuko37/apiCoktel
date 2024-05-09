// Función para generar colores aleatorios en formato hexadecimal
function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  // Selecciona todos los elementos <a> con la clase 'box'
  const links = document.querySelectorAll('.box');
  
  // Agrega un evento 'mouseover' a cada elemento que cambia el color de fondo
  links.forEach(link => {
    link.addEventListener('mouseover', () => {
      const randomColor = getRandomColor();
      link.style.color = randomColor;
    });
  
    // Agrega un evento 'mouseout' a cada elemento que restablece el color original
    link.addEventListener('mouseout', () => {
      link.style.color = '#DBDBDB';
    });
  });
  





 // Función para generar colores aleatorios en formato hexadecimal
function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  // Selecciona todos los elementos con la clase 'r'
  const linkss = document.querySelectorAll('.r');
  
  // Agrega un evento 'mouseover' a cada elemento que cambia el color de texto y fondo
  linkss.forEach(link => {
    link.addEventListener('mouseover', () => {
      const randomColor = getRandomColor();
      link.style.color = "#000";
      link.style.backgroundColor = randomColor;
      link.style.borderColor = randomColor;
    });
  
    // Agrega un evento 'mouseout' a cada elemento que restablece el color original
    link.addEventListener('mouseout', () => {
      link.style.color = '#DBDBDB';
      link.style.backgroundColor = 'transparent';
    });
  });
  
  
