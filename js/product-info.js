const idInfo = localStorage.getItem("prodINFOID");
const container_info = document.getElementById("container-info");
const comment = PRODUCT_INFO_COMMENTS_URL + idInfo + EXT_TYPE;
const prodInfo = PRODUCT_INFO_URL + idInfo + EXT_TYPE;
let commentArray = [];
let prodInfoArray = [];
let score;
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

function setrelatedproductID(id) {
  localStorage.setItem("prodINFOID", id);
  window.location = "product-info.html";
}

function createProdInfo(Obj, comments) {
  let miniaturas = Obj.images.slice(1, 4);
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
  const imagesHTML = miniaturas
    .map(
      (image, index) => `
        <img src="${image}" alt="Miniatura" class="img-event" data-index="${
        index + 1
      }">
    `
    )
    .join("");
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
        <p id="descproduinfo">${comment.description}</p>
      </div>
    `;
  })
  .join("");
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
                        <textarea class="form-control mt-3" placeholder="Escribe tu opinión aquí..." rows="3" id="comentario"></textarea>
                        <button class="btn btn-primary" id="enviar-opinion">Enviar</button>
                        </div>
                    </div>
                    <h3>Opiniones Destacadas </h3>
                    <div class="comment ">${commentsHTML}</div> 
                    <h3 class="relatedTitle">Quienes compraron este producto también vieron</h3>
                    <div class="car-secondary">${relatedProducts}</div>
    `;
  let mainImage = document.getElementById("main-image");
  let mainImageSrc = mainImage.src;

  document.querySelectorAll(".car-images img").forEach((element) => {
    element.addEventListener("click", function () {
      let clickedImageSrc = element.src;
      mainImage.src = clickedImageSrc;
      element.src = mainImageSrc;
      mainImageSrc = clickedImageSrc;
    });
  });
}


document.addEventListener("change", function (event) {
  if (
    event.target.closest(".star-rating") &&
    event.target.matches('input[type="radio"]')
  ) {
    score = event.target.value;
  }
});

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
    if (!score) {
      Swal.fire({
        icon: "error",
        title: "Debe calificar el producto para enviar su opinion",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    if (desc === '') {
        Swal.fire({
          icon: "error",
          title: "Porfavor deje un comentario antes de enviar su opinion",
          confirmButtonText: "Aceptar",
        });
        return;
    }
    let usuario = JSON.parse(localStorage.getItem("user"));
    let nuevaOpinion = {
      dateTime: fecha,
      description: desc,
      score: score,
      user: usuario.firstName +"_"+ usuario.lastName,
    };
  
    commentArray.push(nuevaOpinion);  
    createProdInfo(prodInfoArray, commentArray);
    score = undefined;
  }
});

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear()).slice(-2)} | ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}