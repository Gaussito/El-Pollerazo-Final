et carrito =
JSON.parse(
localStorage.getItem("carrito")
)||[];

let precioBase=0;


// BASE DE DATOS

const platos={

mote:{
nombre:"Mote de queso",
precio:20000,
descripcion:"Plato típico tradicional",
imagen:"img/mote.jpg",
categoria:"tipicos"
},

bocachico1:{
nombre:"Bocachico Frito",
precio:35000,
descripcion:"Plato típico",
imagen:"img/bocachico.jpg",
categoria:"tipicos"
},

bocachico2:{
nombre:"Bocachico Frito Especial",
precio:40000,
descripcion:"Plato típico",
imagen:"img/bocachico.jpg",
categoria:"tipicos"
},

pato:{
nombre:"Pato guisado en sumo de coco",
precio:50000,
descripcion:"Plato típico",
imagen:"img/pato.jpg",
categoria:"tipicos"
},

tilapia:{
nombre:"Tilapia Roja",
precio:50000,
descripcion:"Tilapia con acompañamientos",
imagen:"img/tilapia.jpg",
categoria:"tipicos"
},

gallina:{
nombre:"Gallina",
precio:30000,
descripcion:"Plato típico",
imagen:"img/gallina.jpg",
categoria:"tipicos"
},

carnero:{
nombre:"Carnero guisado",
precio:36000,
descripcion:"Plato típico",
imagen:"img/carnero.jpg",
categoria:"tipicos"
},

pavo:{
nombre:"Pavo en sumo de coco",
precio:50000,
descripcion:"Plato típico",
imagen:"img/pavo.jpg",
categoria:"tipicos"
},



pechuga:{
nombre:"Pechuga",
precio:30000,
descripcion:"Pechuga especial",
imagen:"img/pechuga.jpg",
categoria:"platos"
},

lomo:{
nombre:"Lomo",
precio:28000,
descripcion:"Lomo especial",
imagen:"img/lomo.jpg",
categoria:"platos"
},

pechugaB:{
nombre:"Pechuga Bistec",
precio:25000,
descripcion:"Plato especial",
imagen:"img/pechuga.jpg",
categoria:"platos"
},

lomoB:{
nombre:"Lomo de cerdo en bistec",
precio:29000,
descripcion:"Plato especial",
imagen:"img/lomo.jpg",
categoria:"platos"
},



decorche:{
nombre:"Decorche",
precio:35000,
descripcion:"Bebida",
imagen:"img/decorche.jpg",
categoria:"bebidas"
},

cerveza:{
nombre:"Cerveza",
precio:3000,
descripcion:"Bebida",
imagen:"img/cerveza.jpg",
categoria:"bebidas"
},

buchanas:{
nombre:"Buchana's Master 750ml",
precio:225000,
descripcion:"Bebida",
imagen:"img/buchanas.jpg",
categoria:"bebidas"
},

coco:{
nombre:"Copa de coco",
precio:8000,
descripcion:"Bebida",
imagen:"img/coco.jpg",
categoria:"bebidas"
},

limonada:{
nombre:"Copa limonada",
precio:8000,
descripcion:"Bebida",
imagen:"img/limonada.jpg",
categoria:"bebidas"
},

jarra:{
nombre:"Jarra limonada",
precio:16000,
descripcion:"Bebida",
imagen:"img/jarra.jpg",
categoria:"bebidas"
},

aguila:{
nombre:"Aguila Light",
precio:5000,
descripcion:"Bebida",
imagen:"img/aguila.jpg",
categoria:"bebidas"
},

gaseosa:{
nombre:"Gaseosa 2.5",
precio:15000,
descripcion:"Bebida",
imagen:"img/gaseosa.jpg",
categoria:"bebidas"
}

};



// MENU INICIO

function cargarInicio(){

["tipicos","platos","bebidas"]

.forEach(cat=>{

let contenedor=
document.getElementById(cat);

if(!contenedor)return;

contenedor.innerHTML="";


Object.entries(platos)

.filter(([id,p])=>

p.categoria===cat

)

.slice(0,4)

.forEach(([id,p])=>{

contenedor.innerHTML += `

<div class="card plato">

<img src="${p.imagen}">

<h3>${p.nombre}</h3>

<p class="precio">

$${p.precio.toLocaleString()}

</p>

<button
class="agregar"
onclick="location.href='producto.html?plato=${id}'">

Agregar

</button>

</div>

`;

});

});

}



// CATALOGO

function abrirCatalogo(tipo){

localStorage.setItem(
"categoria",
tipo
);

window.location=
"catalogo.html";

}



function cargarCatalogo(){

let lista=
document.getElementById(
"catalogoLista"
);

if(!lista)return;


let categoria=
localStorage.getItem(
"categoria"
);

lista.innerHTML="";


Object.entries(platos)

.filter(([id,p])=>

p.categoria===categoria

)

.forEach(([id,p])=>{

lista.innerHTML+=`

<div class="card plato">

<img src="${p.imagen}">

<h3>${p.nombre}</h3>

<p class="precio">

$${p.precio.toLocaleString()}

</p>

<button
class="agregar"
onclick="location.href='producto.html?plato=${id}'">

Agregar

</button>

</div>

`;

});

}



// BUSCADOR

function buscarPlatos(){

let texto=
document
.getElementById(
"buscador"
)
?.value
.toLowerCase()
.trim();

if(texto==null)return;


// Si borró búsqueda vuelve normal
if(texto===""){

cargarInicio();

return;

}


["tipicos","platos","bebidas"]

.forEach(cat=>{

let contenedor=
document.getElementById(cat);

if(!contenedor)return;

contenedor.innerHTML="";


Object.entries(platos)

.filter(([id,p])=>

p.categoria===cat &&

p.nombre
.toLowerCase()
.includes(texto)

)

.forEach(([id,p])=>{

contenedor.innerHTML += `

<div class="card plato">

<img src="${p.imagen}">

<h3>

${p.nombre}

</h3>

<p class="precio">

$${p.precio.toLocaleString()}

</p>

<button
class="agregar"
onclick="location.href='producto.html?plato=${id}'">

Agregar

</button>

</div>

`;

});

});

}



// PRODUCTO

function cargarProducto(){

let p=
new URLSearchParams(
window.location.search
);

let tipo=
p.get("plato");

if(!tipo)return;

let plato=
platos[tipo];

if(!plato)return;


// Imagen y datos

document.getElementById(
"foto"
).src=
plato.imagen;


document.getElementById(
"nombre"
).innerText=
plato.nombre;


document.getElementById(
"descripcion"
).innerText=
plato.descripcion;


precioBase=
plato.precio;


document.getElementById(
"precioFinal"
).innerText=
"$"+
plato.precio.toLocaleString();




// Mostrar u ocultar adiciones

let bloqueAdiciones=
document.getElementById(
"extrasContainer"
);

if(bloqueAdiciones){

if(
plato.categoria==="bebidas"
){

bloqueAdiciones.style.display=
"none";

}else{

bloqueAdiciones.style.display=
"block";

}

}

}



function calcularExtras(){

let total=
precioBase;


document
.querySelectorAll(
".extra:checked"
)

.forEach(extra=>{

total +=
parseInt(
extra.value
);

});


let precio=
document.getElementById(
"precioFinal"
);


if(precio){

precio.innerText=

"$"+

total.toLocaleString();

}


return total;

}



function agregarConExtras(){

let p=
new URLSearchParams(
window.location.search
);

let tipo=
p.get("plato");

let plato=
platos[tipo];

let total=
calcularExtras();


carrito.push({

nombre:plato.nombre,
precio:total,
cantidad:1,
cubiertos:0,
imagen:plato.imagen

});

guardar();

window.location=
"carrito.html";

}



function guardar(){

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

}



// CARRITO

function mostrarCarrito(){

let lista=
document.getElementById("lista");

if(!lista)return;

lista.innerHTML="";

let total=0;


carrito.forEach((p,i)=>{

lista.innerHTML+=`

<div class="card carrito-item">

<img src="${p.imagen}">

<div>

<h3>${p.nombre}</h3>

<p>

Precio:
$${p.precio.toLocaleString()}

</p>

<p>

Cantidad:
${p.cantidad}

</p>

<div>

<button onclick="restar(${i})">−</button>

<button onclick="sumar(${i})">+</button>

</div>

<p>

Cubiertos:
${p.cubiertos}

</p>

<div>

<button onclick="cubiertosMenos(${i})">−</button>

<button onclick="cubiertosMas(${i})">+</button>

</div>

</div>

</div>

`;

total+=
p.precio*p.cantidad;

});


let t=
document.getElementById(
"total"
);

if(t){

t.innerText=
"$"+
total.toLocaleString();

}

guardar();

mostrarResumenPedido();

}



function mostrarResumenPedido(){

let resumen=
document.getElementById(
"resumen"
);

if(!resumen)return;

resumen.innerHTML="";

let total=0;


carrito.forEach(item=>{

resumen.innerHTML+=`

<div style="margin-bottom:10px">

<p>

${item.nombre}

x${item.cantidad}

</p>

<p>

$${(item.precio*item.cantidad).toLocaleString()}

</p>

</div>

`;

total+=
item.precio*
item.cantidad;

});


let totalPedido=
document.getElementById(
"totalPedido"
);

if(totalPedido){

totalPedido.innerText=
"$"+
total.toLocaleString();

}

}



function sumar(i){

carrito[i].cantidad++;

guardar();

mostrarCarrito();

}



function restar(i){

if(
carrito[i].cantidad>1
){

carrito[i].cantidad--;

}
else{

carrito.splice(i,1);

}

guardar();

mostrarCarrito();

}



function cubiertosMas(i){

carrito[i].cubiertos++;

guardar();

mostrarCarrito();

}



function cubiertosMenos(i){

if(
carrito[i].cubiertos>0
){

carrito[i].cubiertos--;

}

guardar();

mostrarCarrito();

}



function pedido(){

alert(
"Pedido enviado correctamente"
);

localStorage.removeItem(
"carrito"
);

window.location=
"index.html";

}

document
.querySelectorAll(
".extra"
)

.forEach(check=>{

check.addEventListener(
"change",
calcularExtras
);

});



// INICIAR

cargarInicio();

cargarCatalogo();

mostrarCarrito();

mostrarResumenPedido();

cargarProducto();

calcularExtras();
