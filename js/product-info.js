const idInfo = localStorage.getItem("prodINFOID");
const container_info = document.getElementById("container-info");
const comment = PRODUCT_INFO_COMMENTS_URL + idInfo + EXT_TYPE;
const prodInfo = PRODUCT_INFO_URL + idInfo + EXT_TYPE;
let commentArray = [];
let prodInfoArray = [];

document.addEventListener("DOMContentLoaded", () => {
  // Inicio el fetch para utilizar la data del localStorage
  Promise.all([getJSONData(prodInfo), getJSONData(comment)]).then(
    ([prodData, commentData]) => {
      if (prodData.status === "ok" && commentData.status === "ok") {
        prodInfoArray = prodData.data;
        commentArray = commentData.data;
        createProdInfo(prodInfoArray, commentArray);
      }
    }
  );
});
//se setea en el localstorage las id para poder trabajarlo en los productos relacionados
function setrelatedproductID(id) {
  localStorage.setItem("prodINFOID", id);
  window.location = "product-info.html";
}

function createProdInfo(Obj, comments) {
  //se seleciona con el slice las imagenes que esten en la pisicion 1 y 4 pero el slice el ultimo numero no te lo incluye entonces serian 3 imagenes
  let miniaturas = Obj.images.slice(1, 4);
  //aqui estoy mapeando los productos relacionados y utilizando el join para unirlos en una sola cadena para insertarlo en el html
  const relatedProducts = Obj.relatedProducts
    .map(
      (product) => `
        <div class="car" id="${product.id}">
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <div onclick="setrelatedproductID(${product.id})">
            <a class="btn" >VER</a>
            </div>
        </div>
    `
    )
    .join("");
  // aqui se esta mapeando miniaturas y guardandola en una variable
  const imagesHTML = miniaturas
    .map(
      (image, index) => `
        <img src="${image}" alt="Miniatura" class="img-event" data-index="${
        index + 1
      }">
    `
    )
    .join("");
  //
  const commentsHTML = comments
  .map((comment, index) => {
    const stars = Array(5) 
      .fill('&#9733;') 
      .map((star, i) => i < comment.score ? `<span class="star-filled">&#9733;</span>` : `<span class="star-empty">&#9734;</span>`) 
      .join(''); 
      const formattedDate = formatDate(comment.dateTime);
    return `
      <div class="${index % 2 === 0 ? 'even-comment' : 'odd-comment'}">
        <div class="commentsData">
          <div class="commentsNS">
            <strong id="userC"><p>${comment.user}</p></strong>   
            <p>${stars}</p>
          </div>
          <p class="commentsDT">${formattedDate}</p>
        </div>
        <p>${comment.description}</p>
      </div>
    `;
  })
  .join("");

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
                     
                        <p class="price">${Obj.currency} ${Obj.cost}</p>
                    </div>
                    <div class="car-images">
                        ${imagesHTML}
                        <p class="sold-count">${Obj.soldCount} vendidos</p>
                    </div>
                    </div>
                    <div class="mainReseña">
                    <div class="styleReseña">
                    <h3>Deja tu Reseña</h3>
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
                    </div>
                    <div class="styleTB">
                        <!-- opinión -->
                        <textarea class="form-control mt-3" placeholder="Escribe tu opinión aquí..." rows="3" id="comentario"></textarea>
                        <!-- Boton para enviar -->
                        <button class="btn btn-primary" id="enviar-opinion">Enviar</button>
                        </div>
                    </div>
                    <h3>Opiniones Destacadas </h3>
                    <div class="comment ">${commentsHTML}</div> 
                    <h3 class="relatedTitle">Quienes compraron este producto también vieron</h3>
                    <div class="car-secondary">${relatedProducts}</div>
    `;

  let mainImage = document.getElementById("main-image");
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
document.addEventListener("change", function (event) {
  // Verificamos si el elemento que disparó el evento está dentro del contenedor con la clase 'star-rating'
  if (
    event.target.closest(".star-rating") &&
    event.target.matches('input[type="radio"]')
  ) {
    score = event.target.value; // Guardamos el valor del score seleccionado
    console.log("Score seleccionado: " + score); // Verificamos que funcione correctamente
  }
});

// Event listener para el botón de enviar comentario
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "enviar-opinion") {
    let fechaActual = new Date();
    let fecha = `${fechaActual.getFullYear()}-${String(
      fechaActual.getMonth() + 1
    ).padStart(2, "0")}-${String(fechaActual.getDate()).padStart(
      2,
      "0"
    )} ${String(fechaActual.getHours()).padStart(2, "0")}:${String(
      fechaActual.getMinutes()
    ).padStart(2, "0")}:${String(fechaActual.getSeconds()).padStart(2, "0")}`;
    let desc = document.getElementById("comentario").value.trim();
    // Verificamos si se ha seleccionado un puntaje antes de enviar la opinión
    if (!score) {
      Swal.fire({
        icon: "error",
        title: "Debe calificar el producto para enviar su opinion",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    // Verificamos si se la opinion tiene contenido antes de enviar la opinión
    if (desc === '') {
        Swal.fire({
          icon: "error",
          title: "Porfavor deje un comentario antes de enviar su opinion",
          confirmButtonText: "Aceptar",
        });
        return;
    }
    let usuario = localStorage.getItem("user");
    let nuevaOpinion = {
      dateTime: fecha,
      description: desc,
      score: score,
      user: usuario,
    };
    commentArray.push(nuevaOpinion);
    createProdInfo(prodInfoArray, commentArray); // Se vuelve a generar la vista con los nuevos datos
    score = undefined;
  }
});

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear()).slice(-2)} | ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

//boton modo noche
document.getElementById('switch').addEventListener('click', function() {
  // alternar la clase 'active' en el botón
  this.classList.toggle('active');

  // cambia el modo de la página
  document.body.classList.toggle('dark');
  document.getElementById('container-info').classList.toggle('dark');
  
  
    // cambia los sibolitos
  const isDarkMode = document.body.classList.contains('dark');
  });

// pone el modo inicial
if (localStorage.getItem('mode') === 'dark') {
  document.body.classList.add('dark');
  document.getElementById('switch').classList.add('active');
  document.querySelector('i.fa-sun').style.display = 'none';
  document.querySelector('i.fa-moon').style.display = 'inline';
} else {
  document.body.classList.add('light');
}

// guardar el modo en localStorage
window.addEventListener('unload', () => {
  localStorage.setItem('mode', document.body.classList.contains('dark') ? 'dark' : 'light');
});
