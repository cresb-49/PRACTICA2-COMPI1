class produccion{
    constructor(padre){
        this.padre = padre;
        this.derivaciones=[];
    }
    agregarDerivacion(dev){
        this.derivaciones.push(dev);
    }
    getDerivaciones(){
        return this.derivaciones;
    }
}