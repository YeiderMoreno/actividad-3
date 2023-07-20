document.addEventListener("DOMContentLoaded", function() {
  // Obtener referencias a los elementos del DOM
  var itemInput = document.getElementById("item");
  var agregarButton = document.getElementById("agregar");
  var listaArticulos = document.getElementById("lista-articulos");

  // Obtener la lista de artículos desde el localStorage (si existe)
  var articulos = JSON.parse(localStorage.getItem("articulos")) || [];

  // Función para renderizar la lista de artículos en el DOM
  function renderizarArticulos() {
    listaArticulos.innerHTML = "";

    articulos.forEach(function(articulo) {
      var itemContainer = document.createElement("div");
      itemContainer.classList.add("articulo");

      var itemText = document.createElement("span");
      itemText.textContent = articulo;

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", function() {
        // Eliminar el artículo de la lista
        var index = articulos.indexOf(articulo);
        if (index !== -1) {
          articulos.splice(index, 1);
          // Actualizar la lista en el localStorage
          localStorage.setItem("articulos", JSON.stringify(articulos));
          // Volver a renderizar la lista en el DOM
          renderizarArticulos();
        }
      });

      itemContainer.appendChild(itemText);
      itemContainer.appendChild(deleteButton);

      listaArticulos.appendChild(itemContainer);
    });
  }

  // Manejador de evento para el botón "Agregar"
  agregarButton.addEventListener("click", function() {
    var itemValue = itemInput.value.trim();

    if (itemValue !== "") {
      // Agregar el artículo a la lista
      var nuevosArticulos = itemValue.split(",");
      articulos = articulos.concat(nuevosArticulos.map(item => item.trim()));
      // Actualizar la lista en el localStorage
      localStorage.setItem("articulos", JSON.stringify(articulos));
      // Limpiar el campo de entrada
      itemInput.value = "";
      // Volver a renderizar la lista en el DOM
      renderizarArticulos();
    }
  });

  // Renderizar la lista de artículos inicial
  renderizarArticulos();
});