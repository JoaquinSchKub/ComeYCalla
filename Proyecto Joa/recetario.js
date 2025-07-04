document.addEventListener("DOMContentLoaded", ()=>{
   const renderizarProductos = () => {
    let recetario = JSON.parse(localStorage.getItem("recetario")) || [];
    productosEnCarrito(recetario);

    let seccionProductos = document.getElementById("contenedor-carrito");
    seccionProductos.innerHTML = ""
    
    if (!recetario.length){
        let mensajeCarrito = document.createElement("p");
        mensajeCarrito.classList.add("mensaje");
        mensajeCarrito.textContent = "Aun no tienes recetas guardadas"

        seccionProductos.appendChild(mensajeCarrito);
    }else{
        recetario.forEach((elemento, index) => {
            let tarjetaProducto = document.createElement("article");
            tarjetaProducto.classList.add("producto-carrito");

            let col1 = document.createElement("div")
            col1.classList.add("col-img");

            let imagenProducto = document.createElement("img");
                imagenProducto.src = elemento.image;
                imagenProducto.alt = elemento.name;

            let tituloProducto = document.createElement("h2");
                tituloProducto.textContent = elemento.name;

            col1.appendChild(imagenProducto);
            col1.appendChild(tituloProducto);

            let col2 = document.createElement("div");
            col2.classList.add("col-texto");

            let ingredientes = document.createElement("h3");
                ingredientes.textContent = "Ingredientes";

            let ingredientesProducto = document.createElement("p");
                ingredientesProducto.textContent = elemento.ingredients.join(", ");

            let preparacion = document.createElement("h3");
                preparacion.textContent = "Preparacion"; 
            
            let preparacionProducto = document.createElement("p");
                preparacionProducto.textContent = elemento.instructions.join(" ");

            let btnEliminar = document.createElement("button");
                btnEliminar.classList.add("btn-eliminar-carrito")
                btnEliminar.textContent = "Eliminar"

                btnEliminar.addEventListener("click", () => {
                    eliminarProducto(index)
                });
            
            col2.appendChild (ingredientes);
            col2.appendChild (ingredientesProducto);
            col2.appendChild (preparacion);
            col2.appendChild (preparacionProducto);
            col2.appendChild (btnEliminar);

            tarjetaProducto.appendChild(col1);
            tarjetaProducto.appendChild(col2);

            seccionProductos.appendChild(tarjetaProducto);
        });
        renderizarBotones();
    }

   };

   const renderizarBotones = () => {
    let recetario = JSON.parse(localStorage.getItem("recetario")) || [];
    
    let divAcciones = document.getElementById("acciones-carrito");
    divAcciones.innerHTML = "";

    if (recetario.length){
        let btnVaciar = document.createElement("button")
        btnVaciar.textContent = "Vaciar recetario"

        btnVaciar.addEventListener("click", () => {
            vaciarCarrito();
        })

        let btnFinalizar = document.createElement("button");
        btnFinalizar.textContent ="Comprar recetario PDF"

        btnFinalizar.addEventListener("click", () => {
            let confirmado = confirm("Esta seguro de finalizar la compra ?")
            if (confirmado){
                alert("Gracias por su compra!");
                localStorage.removeItem("recetario");
                window.location.href = "index.html"
            }
        });

        divAcciones.appendChild (btnVaciar);
        divAcciones.appendChild (btnFinalizar);
    };
   };

   const productosEnCarrito = (recetario) => {
    let contadorCarrito = document.getElementById("contador-carrito")
    contadorCarrito.textContent = recetario.length;
   };

   const eliminarProducto = (indice) => {
    let recetario = JSON.parse(localStorage.getItem("recetario")) || [];
    recetario.splice(indice, 1);

    localStorage.setItem("recetario", JSON.stringify(recetario));
    alert("Receta Eliminada");
    renderizarProductos();
   }

   const vaciarCarrito = () => {
    localStorage.removeItem("recetario");
    alert("Vaciando Recetario");
    renderizarProductos()
   };

   renderizarProductos();

});

let lastScrollY = window.scrollY;
  const navbar = document.querySelector("header.navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY < lastScrollY) {
      // Scroll hacia arriba → mostrar navbar
      navbar.style.transform = "translateY(0)";
    } else {
      // Scroll hacia abajo → ocultar navbar
      navbar.style.transform = "translateY(-100%)";
    }
    lastScrollY = window.scrollY;
  });