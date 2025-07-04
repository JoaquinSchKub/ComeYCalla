document.addEventListener("DOMContentLoaded", ()=>{
    let recetario = JSON.parse(localStorage.getItem("recetario")) || [];

    const renderizarProducto = () => {
        url = "https://dummyjson.com/recipes?limit=10";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                let contenedorProductos = document.getElementById("menu");

                for (const producto of data.recipes){
                    let tarjetaProducto = document.createElement("article");
                    tarjetaProducto.classList.add("menu-item");

                    let imagenProducto = document.createElement("img");
                    imagenProducto.src = producto.image;
                    imagenProducto.alt = producto.name;

                    let tituloProducto = document.createElement("h3");
                    tituloProducto.textContent = producto.name

                    let dificultadProducto = document.createElement("p");
                    dificultadProducto.textContent = `dificultad: ${producto.difficulty}`

                    let btnAgregar = document.createElement("button")

                    let ingredientesProducto = producto.ingredients

                    let preparacionProducto = producto.instructions

                    btnAgregar.textContent = "Guardar Receta"

                        btnAgregar.addEventListener("click", () => {
                            alert(`${producto.name} guardado en recetario`);
                            agregarProducto(producto);
                            actualizarAgregados();
                        });

                    tarjetaProducto.appendChild (imagenProducto);
                    tarjetaProducto.appendChild (tituloProducto);
                    tarjetaProducto.appendChild (dificultadProducto);
                    tarjetaProducto.appendChild (btnAgregar);

                    contenedorProductos.appendChild(tarjetaProducto);
                }
            })
            .catch((err) =>console.error("Error: ", err));
    };

    const agregarProducto = (producto) => {
        recetario.push(producto);
        localStorage.setItem("recetario", JSON.stringify(recetario));
    };

    const actualizarAgregados = () => {
        const contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = recetario.length; 
    };

    renderizarProducto();
    actualizarAgregados();

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
