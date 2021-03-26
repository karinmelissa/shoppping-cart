const apiKey = '8b99319c';
const omdbUrl = 'http://www.omdbapi.com/?apikey='+ apiKey+'&';
const cartDisplay = document.getElementById("cart");
cartDisplay.style.display = 'none';


//Creamos un array con las mejores peliculas calificadas por IMDb
//Esto para tener un top de recomendaciones en la pantalla principal.
const recomendenMovies = ["tt0304141","tt1392170","tt4154664","tt0068646","tt0111161","tt0468569","tt0108052","tt0167260",
"tt0110912","tt0109830","tt0133093","tt0047478","tt0317248","tt2015381","tt0484470","tt6751668","tt2582802","tt0209144"]

//Como queremos hacer un carrito de compras, le vamos a agregar un precio random

const showFavMovies = () =>{
    for(let i=0;i<recomendenMovies.length;i++){
        const movieUrl = omdbUrl + 'i=' + recomendenMovies[i];
        fetch(movieUrl)
        .then(response => response.json())
        .then(data => {
            const card = "<div class=' card'>" + 
                        "<div class='card-item image'>"+
                        "<img class='movie-poster' id='item-image' src="+ data.Poster +">" +
                        "</div>"+
                        "<div class='card-item movieInfo'>"+
                        "<h2 class='movie-title' id='item-title'>" + data.Title+"</h2>"+
                        "<p class='movie-year'>(" + data.Year+")</p>" +
                        //Como queremos hacer un carrito de compras, tomaremos la informacion de ratings
                        //y lo convertiremos en un precio
                        "<h3 class='movie-value' id='item-price'> $" + data.Ratings[0].Value.replace('/','')+"</h3>" +
                        "<button class='addToCart' id='addToCart'>Add to cart</button>"
                        "</div>"+
                        "</div>";
                        

            document.getElementById("cards-placeholder").innerHTML += card;  
            const addMovieToCart= document.getElementsByClassName("addToCart");
            for(let i=0;i<addMovieToCart.length;i++){
              let button = addMovieToCart[i];
              button.addEventListener('click',addToCartClicked); 
            }     

        })
    }
}
showFavMovies();

//Funciones de shopping cart
const addToCartClicked =(event)=> {
    const button = event.target;
    const item = button.closest('.card');

    const itemTitle = item.querySelector('.movie-title').textContent;
    const itemPrice = item.querySelector('.movie-value').textContent;
    const itemImage = item.querySelector('.movie-poster').src;
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
    cartTotal();
}

const addItemToShoppingCart = (itemTitle, itemPrice, itemImage) =>{
  console.log(itemTitle, itemPrice, itemImage);
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const shoppingCart = document.querySelector(".cart-items");
  const itemRow = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${itemImage}" width="100" height="100">
      <span class="cart-item-title">${itemTitle}</span>
  </div>
  <span class="cart-price cart-column">${itemPrice}</span>
  <button class="delete-item" id="delete-item type="button">X</button>
`
  cartRow.innerHTML= itemRow;
  shoppingCart.append(cartRow);
  cartRow.getElementsByClassName('delete-item')[0].addEventListener('click', removeCartItem);
}


const cartTotal = ()=>{
  let totalPayment = 0;
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItems.getElementsByClassName('cart-row');
  for (let i=0;i< cartRows.length;i++){
    let cartRow = cartRows[i];
    let priceMovie = cartRow.getElementsByClassName("cart-price")[0];
    var price = parseFloat(priceMovie.innerText.replace('$', ''))
    totalPayment = totalPayment + price ;
  }

  totalPayment = Math.round(totalPayment * 100) / 100;
  console.log(totalPayment);
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + totalPayment;
}

const showHiddeCart = ()=>{
  if (cartDisplay.style.display == 'none'){
    cartDisplay.style.display = 'block'
  }
  else if(cartDisplay.style.display == 'block'){
    cartDisplay.style.display = 'none'
  }
}

const removeCartItem =(e)=>{
  let buttonClick = e.target;
  buttonClick.parentElement.remove();
  cartTotal();
}

const cartButton = document.getElementById('cart-button');
cartButton.addEventListener('click',showHiddeCart);