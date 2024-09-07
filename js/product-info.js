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
function setrelatedproductID(id){
    localStorage.setItem("prodINFOID",id);
    window.location = "product-info.html"
}

function createProdInfo(Obj) {
    let miniaturas = Obj.images.slice(1, 4); 

    const relatedProducts = Obj.relatedProducts.map(product => `
        <div class="car" id="${product.id}">
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <div onclick="setrelatedproductID(${product.id})">
            <a class="btn" >VER</a>
            </div>
        </div>
    `).join('');

    const imagesHTML = miniaturas.map((image, index) => `
        <img src="${image}" alt="Miniatura" class="img-event" data-index="${index + 1}">
    `).join('');

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
    let mainImageSrc = mainImage.src;

    document.querySelectorAll(".car-images img").forEach((event) => {
        event.addEventListener("click", function () {
            let clickedImageSrc = event.src;
            mainImage.src = clickedImageSrc;
            event.src = mainImageSrc;
            mainImageSrc = clickedImageSrc;
        });
    });
}

