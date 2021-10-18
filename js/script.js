//Impresion de articulos
function PrintCompra(){
    if(compra.length == 0){
        $("#tuCompra").prepend(`<h5>Aún no has agregado nada a tu compra! </h5>`);
    }
    else {
        for(const art of compra) {

            $("#tuCompra").append(`<div class="card cardClass" id="compra${art.Nombre}">
            <div class="card-body">
            <h3 class="card-title">${art.Nombre}</h3>
            <p class="card-text">Descripcion: ${art.Descripcion}<br>
            Marca: ${art.Marca}<br>
            Contenido: ${art.Contenido}<br>
            Precio: ${art.Precio}<br>
            Stock: ${art.Stock}</p>
            <button class="btn btn-danger buttonCard" type="submit" id="btnEliminar${art.Nombre}"> Eliminar</button>
            </div></div>`);


            $("#btnEliminar"+art.Nombre).on("click", (e) => {
                let articuloHTML = document.getElementById(e.target.id).parentElement 
                let articulo = articulosTienda.find(a => a.Nombre == articuloHTML.childNodes[1].textContent);
                compra.shift(articulo);
                SaveLocalStorageCompra();
                $(`#compra${art.Nombre}`).fadeOut(); 
                PrintCompra();
                
            });
        }
    }
   
}




function PrintTienda(){
    for(const art of articulosTienda) {

        if(art.Stock > 0){
            $("#tienda").prepend(`<div class="card cardClass">
            <div class="card-body">
            <h3 class="card-title">${art.Nombre}</h3>
            <p class="card-text">Descripcion: ${art.Descripcion}<br>
            Marca: ${art.Marca}<br>
            Contenido: ${art.Contenido}<br>
            Precio: ${art.Precio}<br>
            Stock: ${art.Stock}</p>
            <button class="btn btn-primary buttonCard" type="button" id="btn${art.Nombre}"> Comprar</button>
            
            </div></div>`);
    
            $("#btn"+art.Nombre).on("click", (e) => {
                let articuloHTML = document.getElementById(e.target.id).parentElement; 
                let articulo = articulosTienda.find(a => a.Nombre == articuloHTML.childNodes[1].textContent);
                
               if(articulo != null){

                compra.push(articulo);
                SaveLocalStorageCompra();
               }
            })
        }
    }
}

{/* <button class="btn btn-primary buttonCard" type="button" id="btn${art.Nombre}"> Comprar</button> */}
//Grabado en LocalStorage
function SaveLocalStorageArticulos(){
    let stringJson = JSON.stringify(articulosTienda);
    localStorage.setItem("articulos", stringJson);
}

function SaveLocalStorageCompra(){
    let stringJson = JSON.stringify(compra);
    localStorage.setItem("compra", stringJson);
}

//VACIADO DE INPUTS
function VaciarInputs(){
    for(const input of $(":input")){
        input.value = "";
    }
}


//EVENTOS
$("#botonCargaArticulos").click(()=>{

    if(articulosTienda.find( art => art.Nombre == $("#nombre").val())){
        $("#estado").html("El libro ya se encuentra cargado.");
        $("#estado").css("color", "red");
    }
    else {
        let art = new Articulo($("#nombre").val(), $("#descripcion").val(), $("#marca").val(), $("#contenido").val(),
            $("#precio").val(), $("#stock").val());
   
        articulosTienda.push(art);
        SaveLocalStorageArticulos();
        VaciarInputs();
        PrintTienda();
        $("#estado").html("Articulo agregado con éxito. <br> Visible en apartado Tienda.");
        $("#estado").css("color", "green"); 
    }
})

$("#tituloTienda").on("mouseover", () => {
    $("#tituloTienda").slideUp("slow");
    $("#tituloTienda").delay(6000);
    $("#subtituloTienda").fadeIn();
})

$(document).ready(function() {
    const apiKey = "d8c036ae4fa6e63dac0c12bde2a2d528";
    const latitud = -37.83;
    const longitud = -57.5;
    //Declaramos la url del API
    const urlApi = `http://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=${apiKey}`;
    
    $.get(urlApi, function (respuesta, estado) {
        if(estado === "success"){
          let datosClima = respuesta;
          console.log(datosClima);
            clima.innerHTML += `<div class="divCuadrado">
                                 <h3>Ciudad: ${datosClima.name}</h3>
                                 <p> Temperatura actual:${datosClima.main.temp}</p>
                                </div>`;
          
        }
  });
});



    SaveLocalStorageArticulos();
    PrintTienda();
    PrintCompra();
    $("#subtituloTienda").hide();

