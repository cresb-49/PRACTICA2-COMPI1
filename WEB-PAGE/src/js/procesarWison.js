const parser = require('./analizador');

function procesarTexto(textWison) {
    parser.parse(textWison);

}

module.exports = procesarTexto;

