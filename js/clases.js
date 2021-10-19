class Articulo {
    constructor (nombre, descripcion, marca, contenido, precio, stock, cantidad){
        this.Nombre = nombre;
        this.Descripcion = descripcion;
        this.Marca = marca;
        this.Contenido = contenido;
        this.Precio = precio;
        this.Stock = stock;
        this.Cantidad = cantidad;
    }
}

class Usuario{
    constructor(usuario, contrasenia){
        this.Usuario = usuario;
        this.Contrasenia = contrasenia;
    }
}

///Carga inicial de libros
let articulosIniciales = [new Articulo("Camiseta 20x30", "Bolsas tipo camiseta", "Inpla", "200 Un", "$100", 5),
new Articulo("Camiseta 30x40", "Bolsas tipo camiseta", "Inpla", "200 Un", "$150", 7),
new Articulo("Camiseta 40x50", "Bolsas tipo camiseta", "Inpla", "200 Un", "$200", 3),
new Articulo("Camiseta 45x60", "Bolsas tipo camiseta", "Inpla", "200 Un", "$250", 3),
new Articulo("Folex", "Separadores tipo fiambreros", "Margarita", "1 Kg", "$550", 10),
new Articulo("Cajas de pizza", "Cajas de cartón tamaño pizza", "Roland", "100 Un", "$2900", 1000),]


let usuarios =          JSON.parse(localStorage.getItem("usuarios"))    || [new Usuario("admin", "admin")];
let articulosTienda =   JSON.parse(localStorage.getItem("articulos"))   || articulosIniciales;
let compra =            JSON.parse(localStorage.getItem("compra"))      || [];
let userLogged =        JSON.parse(localStorage.getItem("userLogged"))  || [];
