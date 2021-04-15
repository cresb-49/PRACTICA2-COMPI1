class produccion{
    constructor(padre){
        this.padre = padre;
        this.derivaciones=[];
    }
    getPadre(){
        return this.padre;
    }
    agregarDerivacion(dev){
        this.derivaciones = dev;
    }
    getDerivaciones(){
        return this.derivaciones;
    }
}

module.exports = produccion;