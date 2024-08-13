let productsArray = [];
let categoryID = localStorage.getItem("catID")

function listadoProductos(){

    let htmlContentToAppend = "";

    //Para cada producto en el productsArray, lo muestro en el listado
    for(let i = 0; i < productsArray.length; i++){

        let product = productsArray[i];

        //row = fila , col = columna
        htmlContentToAppend += `
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name}</h4>
                        <small class="text-muted">${product.soldCount} artículos vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                    <h5> Por tan solo ${product.currency} ${product.cost} </h5>
                </div>
            </div>
            `
    }
    document.getElementById("probando").innerHTML = htmlContentToAppend;
};

//Usa la funcion getJSONData que esta en init.js que me da los objetos en formato JSON
document.addEventListener("DOMContentLoaded", function(e){
    let autos = PRODUCTS_URL + categoryID + EXT_TYPE;
    getJSONData(autos).then(function(resultObj){
        if (resultObj.status === "ok"){
            console.log(resultObj);
            productsArray = resultObj.data.products;
            listadoProductos();
        }
    });
});