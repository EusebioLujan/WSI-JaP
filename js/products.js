let productsArray = [];
let categoryID = localStorage.getItem("catID");
let busqueda = document.getElementById("searchBar");
let minPrice = undefined;
let maxPrice = undefined;

function setprodINFOID(id){
    localStorage.setItem("prodINFOID",id);
    window.location = "product-info.html"
}

function listadoProductos(productosFiltrados){

    let htmlContentToAppend = "";

    //Para cada producto en el productsArray, lo muestro en el listado
    for(let i = 0; i < productosFiltrados.length; i++){

        let product = productosFiltrados[i];

        if (((minPrice == undefined) || (minPrice != undefined && product.cost >= minPrice)) &&
        ((maxPrice == undefined) || (maxPrice != undefined && product.cost <= maxPrice))) { 
        htmlContentToAppend += `
            <div class="card" onclick="setprodINFOID(${product.id})">
            <div class="image-details">
                <img src="${product.image}" alt="${product.description}" class="car-image ">
                </div>
                <div class="card-content">
                <div class="title-row">
                <h2 class="car-title">${product.name}</h2>
                <span class="sold-info">${product.soldCount} Vendidos</span>
                </div>
                <p class="price">${product.currency} ${product.cost}</p>
                <p class="description">
                ${product.description}
                </p>
                </div>
            </div>
            `}
    }
    document.getElementById("probando").innerHTML = htmlContentToAppend;
};

//Usa la funcion getJSONData que esta en init.js que me da los objetos en formato JSON
document.addEventListener("DOMContentLoaded", cargarProductos);
//
function cargarProductos(){
    const catName= document.getElementById("categoryName")
    let autos = PRODUCTS_URL + categoryID + EXT_TYPE;
    getJSONData(autos).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data.products; 
            catName.innerHTML = resultObj?.data?.catName
            listadoProductos(productsArray);
        }
    });
};
//
document.getElementById("filterButton").addEventListener("click", function () {
  // Obtener valores de los inputs de precio
  minPrice = document.getElementById("minPrice").value;
  maxPrice = document.getElementById("maxPrice").value;

  if (minPrice !== "" && parseInt(minPrice) >= 0) {
    minPrice = parseInt(minPrice);
  } else {
    minPrice = undefined;
  }

  if (maxPrice !== "" && parseInt(maxPrice) >= 0) {
    maxPrice = parseInt(maxPrice);
  } else {
    maxPrice = undefined;
  }

  cargarProductos();
});

  document.getElementById("mayor").addEventListener("click", function(){

    productsArray.sort((a, b)=>b.cost - a.cost);
    listadoProductos(productsArray);
    })

document.getElementById("menor").addEventListener("click", function(){

  productsArray.sort((a, b)=>a.cost - b.cost);
  listadoProductos(productsArray);
  })

  document.getElementById("relevancia").addEventListener("click", function(){

    productsArray.sort((a, b)=>b.soldCount - a.soldCount);
    listadoProductos(productsArray);
    })

document.getElementById("cleanButton").addEventListener("click", function () {
  // Limpiar los campos de los inputs
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  
  minPrice = undefined;
  maxPrice = undefined;

  cargarProductos();
});
//
//PARA LA BUSQUEDA
busqueda.addEventListener("input", function(){
    let arrayFiltrado = [];
    for(let i = 0; i < productsArray.length; i++){
        let product = productsArray[i];
        if ( product.name.toLowerCase().includes(busqueda.value.trim().toLowerCase()) || 
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
})
//
let productsArray = [];
let categoryID = localStorage.getItem("catID")

function setprodINFOID(id){
    localStorage.setItem("prodINFOID",id);
    window.location = "product-info.html"
}

function listadoProductos(){

    let htmlContentToAppend = "";

    //Para cada producto en el productsArray, lo muestro en el listado
    for(let i = 0; i < productsArray.length; i++){

        let product = productsArray[i];

        //row = fila , col = columna
        htmlContentToAppend += `
            <div class="card" onclick="setprodINFOID(${product.id})">
            <div class="image-details">
                <img src="${product.image}" alt="${product.description}" class="car-image ">
                </div>
                <div class="card-content">
                <div class="title-row">
                <h2 class="car-title">${product.name}</h2>
                <span class="sold-info">${product.soldCount} Vendidos</span>
                </div>
                <p class="price">${product.currency} ${product.cost}</p>
                <p class="description">
                ${product.description}
                </p>
                </div>
            </div>
            `
    }
    document.getElementById("probando").innerHTML = htmlContentToAppend;
};

//Usa la funcion getJSONData que esta en init.js que me da los objetos en formato JSON
document.addEventListener("DOMContentLoaded", function(e){
    const catName= document.getElementById("categoryName")
    let autos = PRODUCTS_URL + categoryID + EXT_TYPE;
    getJSONData(autos).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data.products; 
            catName.innerHTML = resultObj?.data?.catName
            listadoProductos();
        }
    });
});

let minPrice = undefined;
let maxPrice = undefined;
let currentProductsArray = [];
let sortOrder = ""; // Variable para almacenar el orden de clasificación

function showProductsList() {
  let htmlContentToAppend = "";
  
  if (sortOrder === "asc") {
    currentProductsArray.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    currentProductsArray.sort((a, b) => b.price - a.price);
  }

  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    // Filtrar productos que estén en el rango 
    if (((minPrice == undefined) || (minPrice != undefined && product.price >= minPrice)) &&
        ((maxPrice == undefined) || (maxPrice != undefined && product.price <= maxPrice))) {

      htmlContentToAppend += `
        <div class="list-group-item">
          <h4>${product.name}</h4>
          <p>Precio: ${product.price}</p>
        </div>`;
    }
  }
  
  document.getElementById("probando").innerHTML = htmlContentToAppend;
}

document.getElementById("filterButton").addEventListener("click", function () {
  
  minPrice = document.getElementById("minPrice").value;
  maxPrice = document.getElementById("maxPrice").value;

  if (minPrice !== "" && parseInt(minPrice) >= 0) {
    minPrice = parseInt(minPrice);
  } else {
    minPrice = undefined;
  }

  if (maxPrice !== "" && parseInt(maxPrice) >= 0) {
    maxPrice = parseInt(maxPrice);
  } else {
    maxPrice = undefined;
  }

  showProductsList();
});

document.getElementById("cleanButton").addEventListener("click", function () {
  
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  
  minPrice = undefined;
  maxPrice = undefined;

  showProductsList();
});

// Manejador de eventos para el menú desplegable 
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

    showProductsList();
  });
});