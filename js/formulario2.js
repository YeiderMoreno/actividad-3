// Clase para representar un artículo
class Articulo {
    constructor(nombre, descripcion, valor) {
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.valor = valor;
    }
  }
  
  // Función para agregar un artículo a la lista y guardar en el localstorage
  function agregarArticulo() {
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const valor = parseFloat(document.getElementById("valor").value);
  
    if (nombre && descripcion && !isNaN(valor)) {
      const nuevoArticulo = new Articulo(nombre, descripcion, valor);
  
      // Guardar el artículo en el localstorage
      let listaArticulos = JSON.parse(localStorage.getItem("listaArticulos")) || [];
      listaArticulos.push(nuevoArticulo);
      localStorage.setItem("listaArticulos", JSON.stringify(listaArticulos));
  
      // Limpiar los campos de entrada
      document.getElementById("nombre").value = "";
      document.getElementById("descripcion").value = "";
      document.getElementById("valor").value = "";
  
      // Actualizar la lista de artículos en el DOM
      mostrarArticulos();
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  }
  
  // Función para mostrar los artículos almacenados en el localstorage
  function mostrarArticulos() {
    const listaArticulos = JSON.parse(localStorage.getItem("listaArticulos")) || [];
    const tablaArticulos = document.getElementById("tablaArticulos");
    tablaArticulos.innerHTML = `
      <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Valor</th>
        <th></th>
      </tr>
    `;
  
    listaArticulos.forEach((articulo, index) => {
      const fila = document.createElement("tr");
  
      const nombreCelda = document.createElement("td");
      nombreCelda.textContent = articulo.nombre;
      fila.appendChild(nombreCelda);
  
      const descripcionCelda = document.createElement("td");
      descripcionCelda.textContent = articulo.descripcion;
      fila.appendChild(descripcionCelda);
  
      const valorCelda = document.createElement("td");
      valorCelda.textContent = articulo.valor.toFixed(2);
      fila.appendChild(valorCelda);
  
      // Agregar botón para eliminar el artículo
      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.onclick = () => eliminarArticulo(index);
      const botonCelda = document.createElement("td");
      botonCelda.appendChild(eliminarBtn);
      fila.appendChild(botonCelda);
  
      tablaArticulos.appendChild(fila);
    });
  }
  
  // Función para eliminar un artículo de la lista y del localstorage
  function eliminarArticulo(index) {
    const listaArticulos = JSON.parse(localStorage.getItem("listaArticulos")) || [];
    if (index >= 0 && index < listaArticulos.length) {
      listaArticulos.splice(index, 1);
      localStorage.setItem("listaArticulos", JSON.stringify(listaArticulos));
      mostrarArticulos();
    }
  }
  
  // Mostrar los artículos almacenados al cargar la página
  mostrarArticulos();
  