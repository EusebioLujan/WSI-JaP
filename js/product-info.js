const idInfo = localStorage.getItem("prodINFOID");
const container_info = document.getElementById("container-info");

document.addEventListener("DOMContentLoaded", () => {
    // Inicio el fetch para utilizar la data del localStorage
    let prodInfo = PRODUCT_INFO_URL + idInfo + EXT_TYPE;
    getJSONData(prodInfo).then((data) => {
        if (data.status === "ok") {
            const prodInfoArray = data.data;
            createProdInfo(prodInfoArray);
        }
    });
});
//se setea en el localstorage las id para poder trabajarlo en los productos relacionados
function setrelatedproductID(id){
    localStorage.setItem("prodINFOID",id);
    window.location = "product-info.html"
}

function createProdInfo(Obj) {
    //se seleciona con el slice las imagenes que esten en la pisicion 1 y 4 pero el slice el ultimo numero no te lo incluye entonces serian 3 imagenes
    let miniaturas = Obj.images.slice(1, 4); 
    //aqui estoy mapeando los productos relacionados y utilizando el join para unirlos en una sola cadena para insertarlo en el html
    const relatedProducts = Obj.relatedProducts.map(product => `
        <div class="car" id="${product.id}">
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <div onclick="setrelatedproductID(${product.id})">
            <a class="btn" >VER</a>
            </div>
        </div>
    `).join('');
    // aqui se esta mapeando miniaturas y guardandola en una variable
    const imagesHTML = miniaturas.map((image,index) => `
        <img src="${image}" alt="Miniatura" class="img-event" data-index="${index + 1}">
    `).join('');
    //bloque de codigo que se inserta en el HTML
    container_info.innerHTML = `
        <h1>${Obj.category}</h1>
        <h2 class="car-div-main">${Obj.name}</h2>
        <div class="car-main">
            <div class="car-details">
                <div class="main-image">
                    <img class="car-image" id="main-image" src="${Obj.images[0]}" alt="${Obj.name}">
                </div>
                <p class="description">${Obj.description}</p>
                <p class="price">${Obj.currency} ${Obj.cost}</p>
            </div>
            <div class="car-images">
                ${imagesHTML}
                <p class="sold-count">${Obj.soldCount} vendidos</p>
            </div>
        </div>
        <div class="car-secondary">
            ${relatedProducts}
        </div>
    `;

    let mainImage = document.getElementById('main-image');
    //en esta variable se esta guardando la url de main image
    let mainImageSrc = mainImage.src;

    document.querySelectorAll(".car-images img").forEach((element) => {
        element.addEventListener("click", function () {
            //se guarda en la variable la url del evento click es decir la url de la imagen
            let clickedImageSrc = element.src;
            //se cambia la url main por la clickeada
            mainImage.src = clickedImageSrc;
            //se cambia la url de la miniatura por la clickeada 
            element.src = mainImageSrc;
            //aca se actualiza la variable con la url de la imagen clickeada
            mainImageSrc = clickedImageSrc;
        });
    });
}

