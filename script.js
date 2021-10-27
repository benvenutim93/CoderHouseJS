cantProductos.style.display = "none";

//Impresion de articulos
function PrintCompra(){
    if(compra.length == 0){
        $("#tuCompra").prepend(`<h5>Aún no has agregado nada a tu compra! </h5>`);
    }
    else {
        for(const art of compra) {

            const ID = art.Nombre.split(' ').join('');


            $("#tuCompra").append(`<div class="card cardClass" id="compra${art.Nombre}">
            <div class="card-body">
            <h3 class="card-title">${art.Nombre}</h3>
            <p class="card-text">Descripcion: ${art.Descripcion}<br>
            Marca: ${art.Marca}<br>
            Contenido: ${art.Contenido}<br>
            Precio: ${art.Precio}<br>
            Stock: ${art.Stock}<br>
            Cantidad: ${art.Cantidad}</p>
            <button class="btn btn-success btnCarrito" type="button" id="mas${ID}">+</button>
            <button class="btn btn-danger btnCarrito" type="button" id="menos${ID}">-</button>
            </div></div>`);

            $(`#mas${ID}`).click((e) =>{
                let articuloHTML = document.getElementById(e.target.id).parentElement; 
                let articuloTienda = articulosTienda.find(a => a.Nombre == articuloHTML.childNodes[1].textContent);

                if(articuloTienda.Stock > 0){
                    let articulo = compra.find(a => a.Nombre == articuloTienda.Nombre);
                    articulo.Cantidad ++;
                    
                    articuloTienda.Stock --;
                    articulo.Stock = articuloTienda.Stock;
                    SaveLocalStorageCompra();
                    SaveLocalStorageArticulos();
                
                $("#tuCompra").empty();
                PrintCompra();
                }
            });

            $(`#menos${ID}`).click((e) =>{
                let articuloHTML = document.getElementById(e.target.id).parentElement; 
                let articuloTienda = articulosTienda.find(a => a.Nombre == articuloHTML.childNodes[1].textContent);

                
                let articulo = compra.find(a => a.Nombre == articuloTienda.Nombre);
                articulo.Cantidad --;
                articuloTienda.Stock ++;
                articulo.Stock = articuloTienda.Stock;
                
                if(articulo.Cantidad == 0){
                    compra.shift(articulo);
                    $(`#compra${art.Nombre}`).fadeOut("fast"); 
                }

                SaveLocalStorageCompra();
                SaveLocalStorageArticulos();
                $("#tuCompra").empty();
                PrintCompra();
                
            });
            
        }
        cantProductos.style.display = "block";
        cantProductos.textContent = compra.length;
    }
   
}

function PrintTienda(){
    for(const art of articulosTienda) {

        const ID = art.Nombre.split(' ').join('');

        if(art.Stock > 0){
            $("#tienda").prepend(`<div class="card cardClass">
            <div class="card-body">
            <h3 class="card-title">${art.Nombre}</h3>
            <p class="card-text">Descripcion: ${art.Descripcion}<br>
            Marca: ${art.Marca}<br>
            Contenido: ${art.Contenido}<br>
            Precio: ${art.Precio}<br>
            Stock: ${art.Stock}</p>
           
            <button class="btn btn-primary buttonCard" type="button" id="btn${ID}"> Comprar</button>
            
            </div></div>`);
    
            $("#btn"+ID).on("click", (e) => {
                let articuloHTML = document.getElementById(e.target.id).parentElement; 
                let articulo = articulosTienda.find(a => a.Nombre == articuloHTML.childNodes[1].textContent);
                
               if(articulo != null){

                   if(articulo.Stock > 0)
                    {
                        articulo.Stock --;
                        let articuloCarrito = compra.find(a => a.Nombre == articulo.Nombre)
                        if(articuloCarrito != null){
                            articuloCarrito.Cantidad ++;
                            articuloCarrito.Stock = articulo.Stock;
                            
                        }
                        else {
                            articulo.Cantidad = 1;
                            compra.push(articulo);

                        }  
                    }
                    
                cantProductos.style.display = "block";
                cantProductos.textContent = compra.length;
                SaveLocalStorageCompra();
                SaveLocalStorageArticulos();
                $("#tienda").empty();
                PrintTienda();
               }
            });
        }
    }
}

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
        $("#estado").html("El articulo ya se encuentra cargado.");
        $("#estado").css("color", "red");
    }
    else {
        let art = new Articulo($("#nombre").val(), $("#descripcion").val(), $("#marca").val(), $("#contenido").val(),
            $("#precio").val(), $("#stock").val(), 1);
   
        articulosTienda.push(art);
        SaveLocalStorageArticulos();
        VaciarInputs();
        PrintTienda();
        $("#estado").html("Articulo agregado con éxito. <br> Visible en apartado Tienda.");
        $("#estado").css("color", "green"); 
    }
});

$("#btnCarrito").click(() => {
    window.location.href = 'compra.html'
})



    SaveLocalStorageArticulos();
    PrintTienda();
    PrintCompra();

