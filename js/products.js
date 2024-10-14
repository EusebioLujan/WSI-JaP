let productArray = [];
let categoryID = localStorage.getItem("catID");
let busqueda = document.getElementById("searchBar");
let minimumPrice = undefined;
let maximumPrice = undefined;
let sortOrder = ""; // Variable para almacenar el orden de clasificación

function setprodINFOID(id){
    localStorage.setItem("prodINFOID",id);
    window.location = "product-info.html";
}

function listadoProductos(productosFiltrados = productArray) {
    let htmlContentToAppend = "";

    if (sortOrder === "asc") {
        productosFiltrados.sort((a, b) => a.cost - b.cost);
    } else if (sortOrder === "desc") {
        productosFiltrados.sort((a, b) => b.cost - a.cost);
    }

    for (let i = 0; i < productosFiltrados.length; i++) {
        let product = productosFiltrados[i];

        if (((minimumPrice == undefined) || (minimumPrice != undefined && product.cost >= minimumPrice)) &&
            ((maximumPrice == undefined) || (maximumPrice != undefined && product.cost <= maximumPrice))) {
            htmlContentToAppend += `
                <div class="card" onclick="setprodINFOID(${product.id})">
                    <div class="image-details">
                        <img src="${product.image}" alt="${product.description}" class="car-image">
                    </div>
                    <div class="card-content">
                        <div class="title-row">
                            <h2 class="car-title">${product.name}</h2>
                            <span class="sold-info">${product.soldCount} Vendidos</span>
                        </div>
                        <p class="price">${product.currency} ${product.cost}</p>
                        <p class="description">${product.description}</p>
                    </div>
                </div>`;
        }
    }

    document.getElementById("probando").innerHTML = htmlContentToAppend;
}

// Cargar productos desde el servidor
function cargarProductos(){
    const catName= document.getElementById("categoryName");
    let autos = PRODUCTS_URL + categoryID + EXT_TYPE;
    getJSONData(autos).then(function(resultObj){
        if (resultObj.status === "ok"){
            productArray = resultObj.data.products;
            catName.innerHTML = resultObj?.data?.catName;
            listadoProductos();
        }
    });
}

// Evento para cargar productos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", cargarProductos);

// Filtro de precio
document.getElementById("filterButton").addEventListener("click", function () {
    minimumPrice = document.getElementById("minPrice").value;
    maximumPrice = document.getElementById("maxPrice").value;

    if (minimumPrice !== "" && parseInt(minimumPrice) >= 0) {
        minimumPrice = parseInt(minimumPrice);
    } else {
        minimumPrice = undefined;
    }

    if (maximumPrice !== "" && parseInt(maximumPrice) >= 0) {
        maximumPrice = parseInt(maximumPrice);
    } else {
        maximumPrice = undefined;
    }

    listadoProductos();
});

// Limpiar el filtro de precio
document.getElementById("cleanButton").addEventListener("click", function () {
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";
    
    minimumPrice = undefined;
    maximumPrice = undefined;

    listadoProductos();
});

// Ordenar productos por precio o relevancia
document.querySelectorAll(".dropdown-menu .dropdown-item").forEach(item => {
    item.addEventListener("click", function (event) {
        let selectedOption = event.target.textContent;
        if (selectedOption === "Menor precio") {
            sortOrder = "asc";
        } else if (selectedOption === "Mayor precio") {
            sortOrder = "desc";
        } else {
            sortOrder = ""; 
        }

        listadoProductos();
    });
});

// Búsqueda de productos
busqueda.addEventListener("input", function(){
    let arrayFiltrado = [];
    for(let i = 0; i < productArray.length; i++){
        let product = productArray[i];
        if (product.name.toLowerCase().includes(busqueda.value.trim().toLowerCase()) || 
            product.description.toLowerCase().includes(busqueda.value.trim().toLowerCase())){
            arrayFiltrado.push(product);
        }
    }
    listadoProductos(arrayFiltrado);
    if(arrayFiltrado.length === 0){
        document.getElementById("notFound").innerHTML = "<p>No hay coincidencias</p>";
    } else {
        document.getElementById("notFound").innerHTML = "";
    }
});
