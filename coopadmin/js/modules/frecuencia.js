var ref = window.location.href;

const crearFrecuencia = (i) =>{
    return new Frecuencia(i.idItinerario, i.fechaSalida,
                            i.horaSalida, i.asientosDisponibles,
                            i.precioAsiento, i.viaje,
                            i.bus, i.chofer, i.agencia)
}

export const listForTable = (e) =>{
    let objetos;
    if(ref.includes('admin_frecuencia.html')){
        var frecuencias = []
        Object.values(e).forEach(function(item){
            var freq = crearFrecuencia(item);

            frecuencias.push(freq.forTable)
        } )
        objetos = frecuencias;
    }else{
        objetos = e;
    }
    
    return objetos;
}

export const listForCard = (e) =>{
    let objetos;
    if(ref.includes('venta_boletos.html')){
        var frecuencias = []
        Object.values(e).forEach(function(item){
            frecuencias.push(crearFrecuencia(item).forCard)
        } )
        objetos = frecuencias;
    }
    return objetos;
} 

class Frecuencia {
    constructor(idItinerario,fechaSalida,horaSalida,asientoDisponible,precioAsiento,
                viaje,bus,chofer,agencia){
        this.idItinerario = idItinerario;
        this.fechaSalida = fechaSalida;
        this.horaSalida = horaSalida;
        this.asientoDisponible = asientoDisponible;
        this.precioAsiento = precioAsiento;
        this.viaje = viaje;
        this.bus = bus;
        this.chofer = chofer;
        this.agencia = agencia;
    }

    get forTable(){
        return {
                "Hora":this.horaSalida,
                "Disponible":this.asientoDisponible,
                "Origen":this.viaje.origen,
                "Destino":this.viaje.destino.nombre,
                "Ruta":this.viaje.nombreRuta,
                "Chofer":this.chofer.nombre,
                "Placa":this.bus.placa
                };
    }

    get forCard(){
        return {
                "idItinerario":this.idItinerario,
                "Destino":this.viaje.destino.nombre,
                "Placa":this.bus.placa,
                "Disponible":this.asientoDisponible,
                "Precio":this.precioAsiento,
                "Hora":this.horaSalida
            };
    }
}