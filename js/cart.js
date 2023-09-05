let carroComprar = [];

const productos = {
    1: ["Pua",
        "-",
        "img/merch1.jpg",
        "-",
        "idPua"],

    2: ["Pin 'A Cientos de Kilómetros'",
        "-",
        "img/merch2.jpg",
        "-",
        "idpin1"],
    3: ["Pin 'Último recurso'",
        "-",
        "img/merch3.jpg",
        "-",
        "idpin2"],
    4: ["Pin 'logo'",
        "-",
        "img/merch4.jpg",
        "-",
        "idpin3"],
    5: ["Pin logo 2",
        "-",
        "img/merch5.jpg",
        "-",
        "idpin4"],
    6: ["Cuadernillo 'Último recurso'",
        "-",
        "img/merch6.jpg",
        "-",
        "idcuad1"],
    7: ["Cuadernillo 'A Cientos de Kilómetros'",
        "-",
        "img/merch7.jpg",
        "-",
        "idcuad2"],
    8: ["Cuadernillo logo",
        "-",
        "img/merch8.jpg",
        "-",
        "idcuad3"],
        
}

class creador {
    constructor(nombre,talle, precio, cantidad, id) {
        this.nombre = nombre;
        this.talle = talle;
        this.precio = precio;
        this.cantidad = cantidad;
        this.id = id;
    }
}

function addCarrito(n) {

    let r = 0;

    if (carroComprar.length <= 0) {
        Armado(n);
    } else {
        for (i in carroComprar) {
            if (carroComprar[i]["nombre"] === productos[n][0]) {
                r = 1;
            }
        }
        if (r == 0) {
            Armado(n);
        }
    }

    
}


function Armado(n) {

    let carrito = document.getElementById("carro");

    const producto = new creador(productos[n][0], productos[n][1], productos[n][3], 1, productos[n][4]);

    carroComprar.push(producto);

    carrito.innerHTML += `<div id="${productos[n][0]}">
                        <div class="card rounded-3 mb-4">
                            <div class="card-body p-4">
                                <div class="row d-flex justify-content-between align-items-center">
                                    <div class="col-md-2 col-lg-2 col-xl-2">
                                        <img src="${productos[n][2]}"
                                             class="img-fluid rounded-3" alt="${productos[n][0]}">
                                    </div>
                                    <div class="col-md-3 col-lg-3 col-xl-3">
                                        <p class="lead fw-normal mb-2">${productos[n][0]}</p>
                                        <p><span class="text-muted">Talle: </span>${productos[n][1]}</p>
                                    </div>
                                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                         <span class="label label-primary">Cantidad: </span>
                                         <select onchange="masmenos(this.parentNode.querySelector('input[type=hidden]').value, this.value)">
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>  
                                        </select>
                                        <input type="hidden" value="${productos[n][0]}" id="valorReal"/>

                                    </div>
                                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                        <h5 class="mb-0" id="${productos[n][4]}">${productos[n][3]}$</h5>
                                        
                                    </div>
                                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                       <button type="button" value="${productos[n][0]}" onclick="Delet(this.value)" class="btn btn-danger">X</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        `;
}




function masmenos(p, cant) {

    for (i in carroComprar) {
        
        if (carroComprar[i]["nombre"] === p) {
            document.getElementById(carroComprar[i]["id"]).innerHTML = `${carroComprar[i]["precio"] * cant}$`
            carroComprar[i]["cantidad"] = cant

            let n = 0;

            while (n < 4) {
                document.getElementById(`${carroComprar[i]["nombre"]}`).querySelector(`select`).children[n].setAttribute("selected", false)
                n++;
            }

            document.getElementById(`${carroComprar[i]["nombre"]}`).querySelector(`select`).children[cant - 1].setAttribute("selected", true)
        }
    }

}

function Delet(n) {

    for (i in carroComprar) {
        if (carroComprar[i]["nombre"] === n) {
            carroComprar.pop(i)
        }
    }
    
    document.getElementById(n).remove()
}

function Comprar() {

    let prod = []

    let precioFinal = 0

    for (i in carroComprar) {
        prod += `%20${carroComprar[i].nombre} --> ${carroComprar[i].precio * carroComprar[i].cantidad}%0A`;

        precioFinal += carroComprar[i].precio * carroComprar[i].cantidad;

    }

    
    let telefono = "5491161625030";

    let url = `https://api.whatsapp.com/send?phone=${telefono}&text=
		*_Pedido hecho en joaquinbressan.com.ar_*%0A%0A
        ${prod}%0A%0A
        *Total:*$${precioFinal}%0A`
        ;

    window.open(url);
    location.reload(true);
    

}