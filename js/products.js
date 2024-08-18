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