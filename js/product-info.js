const idInfo = localStorage.getItem("prodINFOID");
const container_info = document.getElementById("container-info");
const comment = PRODUCT_INFO_COMMENTS_URL + idInfo + EXT_TYPE;
const prodInfo = PRODUCT_INFO_URL + idInfo + EXT_TYPE;
let commentArray = [];
let prodInfoArray = [];

document.addEventListener("DOMContentLoaded", () => {
    // Inicio el fetch para utilizar la data del localStorage
    Promise.all([
        getJSONData(prodInfo),
        getJSONData(comment)
    ]).then(([prodData,commentData])=>{
        if(prodData.status==="ok" &&commentData.status==="ok"){
            prodInfoArray=prodData.data;
            commentArray = commentData.data
            createProdInfo(prodInfoArray,commentArray)
        }
    })
    

});
//se setea en el localstorage las id para poder trabajarlo en los productos relacionados
function setrelatedproductID(id){
    localStorage.setItem("prodINFOID",id);
    window.location = "product-info.html"
}

function createProdInfo(Obj,comments) {
    
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
        //
        const commentsHTML = comments.map(comment => `
            <div>
                <p>${comment.dateTime}</p>
                <p>${comment.description}</p>
                <p>${comment.score}</p>
                <p>${comment.user}</p>
            </div>
        `).join('');
        //
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
                <div class="star-rating">
          <input type="radio" id="star5" name="rating" value="5">
          <label for="star5">&#9733;</label>
          
          <input type="radio" id="star4" name="rating" value="4">
          <label for="star4">&#9733;</label>
          
          <input type="radio" id="star3" name="rating" value="3">
          <label for="star3">&#9733;</label>
          
          <input type="radio" id="star2" name="rating" value="2">
          <label for="star2">&#9733;</label>
          
          <input type="radio" id="star1" name="rating" value="1">
          <label for="star1">&#9733;</label>
          </div> 

        
      
                
                <p class="price">${Obj.currency} ${Obj.cost}</p>
                  <div>


          <!-- opinión -->
          <textarea class="form-control mt-3" placeholder="Escribe tu opinión aquí..." rows="3" id="comentario"></textarea>
          
          <!-- Boton para enviar -->
          <button class="btn btn-primary mt-3 ms-auto d-block" id="enviar-opinion">Enviar</button>
          
          <div id="comments-container"></div>
    </div>
                
            </div>

            
            
            <div class="car-images">
                ${imagesHTML}
                <p class="sold-count">${Obj.soldCount} vendidos</p>
            </div>
            
        </div>
        
        <div class="comment"> ${commentsHTML}

        <p> aca pondria un comentario si tuviera uno</p>

        </div>
        
        <div class="car-secondary">
            ${relatedProducts}
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


// score o estrellitas
let score;
document.addEventListener('change', function(event) {
    // Verificamos si el elemento que disparó el evento está dentro del contenedor con la clase 'star-rating'
    if (event.target.closest('.star-rating') && event.target.matches('input[type="radio"]')) {
        score = event.target.value; // Guardamos el valor del score seleccionado
        console.log("Score seleccionado: " + score); // Verificamos que funcione correctamente
    }
});

// Event listener para el botón de enviar comentario
document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "enviar-opinion") {
        let fechaActual = new Date();
        let fecha = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')} ${String(fechaActual.getHours()).padStart(2, '0')}:${String(fechaActual.getMinutes()).padStart(2, '0')}:${String(fechaActual.getSeconds()).padStart(2, '0')}`;

        console.log(fecha);  

        let desc = document.getElementById("comentario").value.trim();
        
        // Verificamos si se ha seleccionado un puntaje antes de enviar la opinión
        if (!score) {
            alert("Debe calificar el producto para enviar su opinion");
            return;
        }

        let usuario = localStorage.getItem("user");

        let nuevaOpinion = {
            dateTime : fecha,
            description : desc,
            score : score, 
            user : usuario
        };

        commentArray.push(nuevaOpinion);
        createProdInfo(prodInfoArray, commentArray); // Se vuelve a generar la vista con los nuevos datos
        score = undefined;
    }
});







// //O LO Q SEA Q USEMOS PARA SE ENVIE, asumo q es un boton
// document.addEventListener("click", function(event) {
//     let score;
//     if (event.target && event.target.class === "star-rating") {
//         event.target.addEventListener('change', (event) => {
//             if (event.target.matches('input[type="radio"]')) {
//               score = event.target.value;
//             }
//         });
//     } else if (event.target && event.target.id === "enviar-opinion") {
//         let fechaActual = new Date();
//     let fecha = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')} ${String(fechaActual.getHours()).padStart(2, '0')}:${String(fechaActual.getMinutes()).padStart(2, '0')}:${String(fechaActual.getSeconds()).padStart(2, '0')}`;

//     console.log(fecha);  
//     //dios sabra si esto funca

//     //O COMO SEA Q SE LLAME EL ESPACIO PARA COMENTAR
//     let desc = document.getElementById("comentario").value.trim();

//     //ESTRELLITAS
    
//     console.log(localStorage)

//     //FALTA USUARIO Q ASUMO Q LO SACO DE LOCAL STORAGE
//     let usuario =localStorage.getItem("user")

//     let nuevaOpinion = {
//         dateTime : fecha,
//         description : desc,
//         score : score,
//         user : usuario
//     };
//     Promise.all([
//         getJSONData(prodInfo),
//         getJSONData(comment)
//     ]).then(([prodData,commentData])=>{
//         if(prodData.status==="ok" &&commentData.status==="ok"){
//             const prodInfoArray=prodData.data;
//             const commentArray = commentData.data;
//             commentArray.push(nuevaOpinion)
//             createProdInfo(prodInfoArray,commentArray)
//         }
//     })
//     }
// });
