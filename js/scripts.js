const BIENVENIDA = "¡Bienvenido a mi lista de compras!";
const DESPEDIDA = "¡Gracias por usar la lista de compras! ¡Hasta luego!";
let productos = [];  // Variable global para almacenar los productos

function iniciar() {
    // Función principal que inicia el programa
    mostrarMensaje(BIENVENIDA);
    obtenerDecision();
}

function obtenerDecision() {
    // Función para obtener la decisión del usuario
    let mensajeDiv = document.querySelector("#mensaje");
    mensajeDiv.innerHTML = `
        <p>Ingresa 1 para comenzar o 2 para terminar:</p>
        <input type="number" id="decisionInput" min="1" max="2">
        <button onclick="procesarDecision()">Aceptar</button>
    `;
}

function procesarDecision() {
    /*
    Función para obtener la decisión del usuario.
 *  Muestra un input para que el usuario ingrese 1 para comenzar o 2 para terminar.
     */
    let decisionInput = document.querySelector("#decisionInput").value;
    let decision = parseInt(decisionInput);

    if (isNaN(decision) || (decision !== 1 && decision !== 2)) {
        alert("Por favor, ingresa una decisión válida (1 o 2).");
        obtenerDecision();
    } else {
        listarCompras(decision);
    }
}

function listarCompras(decision) {
    // Función para listar las compras
    if (decision === 2) {
        mostrarListaFinalizada();
        mostrarMensaje(DESPEDIDA);
        return;
    }

    productos = obtenerProductos();
    agregarProducto();
}

function agregarProducto() {
    /**
    Procesa la decisión ingresada por el usuario.
    Si la decisión es válida, procede a listar las compras; de lo contrario, vuelve a pedir la decisión.
    */
    let mensajeDiv = document.querySelector("#mensaje");
    mensajeDiv.innerHTML = `
        <p>Ingresa tu producto al listado:</p>
        <input type="text" id="productoInput">
        <button onclick="procesarProducto()">Agregar</button>
    `;
}

function procesarProducto() {
    /**
    Procesa el producto ingresado por el usuario.
    Si el producto es válido, lo añade a la lista de productos y actualiza la lista mostrada.
    */
    let productoInput = document.querySelector("#productoInput").value;

    if (productoInput !== null && productoInput !== "") {
        productos.push(productoInput);
        guardarProductos(productos);
        actualizarLista(productos);
        obtenerDecisionContinuar();
    } else {
        alert("Por favor, ingresa un producto válido.");
        agregarProducto();
    }
}

function obtenerDecisionContinuar() {
    /*
    Muestra opciones para que el usuario decida si quiere continuar agregando productos.
    */
    let mensajeDiv = document.querySelector("#mensaje");
    mensajeDiv.innerHTML = `
        <p>¿Desea continuar agregando productos?</p>
        <button onclick="continuar()">Sí</button>
        <button onclick="terminar()">No</button>
    `;
}

function continuar() {
    /**
    Función para continuar agregando productos.
    Llama a la función para agregar productos.
    */
    agregarProducto();
}

function terminar() {
    /*
    Función para terminar de agregar productos.
    Llama a la función para mostrar la lista de productos.
    y muestra un mensaje de despedida
    */
    mostrarListaFinalizada();
    mostrarMensaje(DESPEDIDA);
}

function mostrarListaFinalizada() {
    /**
    Muestra la lista finalizada de productos almacenados.
    Recupera los productos del almacenamiento local y actualiza la lista mostrada.
    */
    actualizarLista(productos);
}

function mostrarMensaje(mensaje) {
    let mensajeDiv = document.querySelector("#mensaje");
    mensajeDiv.textContent = mensaje;
}

function actualizarLista(productos) {
    //Actualiza la lista de compras mostrada en la página.
    let listaCompras = document.querySelector("#listaCompras");
    listaCompras.innerHTML = ""; 

    productos.forEach(function(producto, index) {
        let li = document.createElement("li");
        li.textContent = producto;
        
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-eliminar";
        btnEliminar.onclick = function() {
            eliminarProducto(index);
        };
        
        li.appendChild(btnEliminar);
        listaCompras.appendChild(li);
    });
}

function eliminarProducto(index) {
    // Elimina un producto de la lista de productos.
    productos.splice(index, 1);
    guardarProductos(productos);
    actualizarLista(productos);
}

function guardarProductos(productos) {
    //Guarda la lista de productos en el almacenamiento local.
    localStorage.setItem('listaCompras', JSON.stringify(productos));
}

function obtenerProductos() {
    //Recupera la lista de productos del localstorage
    let productos = localStorage.getItem('listaCompras');
    return productos ? JSON.parse(productos) : [];
}

document.querySelector("#iniciarBtn").addEventListener("click", iniciar);
