class resultado{
    constructor(errores,terminales,noTerminales){
        this.errores = errores;
        this.terminales = terminales;
        this.noTerminales = noTerminales;
        this.producciones = [];
    }
    getErrores(){
        return this.errores;
    }
    getTerminales(){
        return this.terminales;
    }
    getNoTerminales(){
        return this.noTerminales;
    }
    getProducciones(){
        return this.producciones;
    }
}
module.exports = resultado;