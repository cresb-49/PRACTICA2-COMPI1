const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const multer = require('multer');
const analizador = require('../js/analizador');
const fs = require('fs');

const path = './uploads/';


var fileName = null;
const storage = multer.diskStorage(
    {
        destination: path,
        filename: function (req, file, cb) {
            cb("", fileName = file.originalname)
        }
    });

const upload = multer(
    {
        storage: storage
    }
);





router.use(morgan('dev'));
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


router.get('/', (req, res) => {
    res.render('index', { textWison: 'Wison¿\r\nLex {:\r\n\r\n:}\r\n\r\nSyntax{{:\r\n\r\n:}}\r\n?Wison', errores: [] });
});

router.get('/archivoWison', (req, res) => {
    res.render('cargarArchivo', { "errores": [] });
});

router.post('/file', upload.single('fileWison'), (req, res) => {
    var result = null;
    var respuesta = null;
    fs.readFile(path + fileName, 'utf-8', (err, data) => {
        if (err) {
            var fileErr = 'error: ' + err;
            respuesta = ({ "errores": fileErr })
            res.render('cargarArchivo', respuesta);
        } else {
            try {
                result = analizador.parse(data);
                verificarCompocicion(result);
                if (result !== undefined) {
                    respuesta = (
                        {
                            "errores": result.getErrores()
                        }
                    );
                    res.render('cargarArchivo', respuesta);
                } else {
                    res.render('cargarArchivo', { "errores": [] });
                }

            } catch (error) {
                var msj = 'Error fatal en analisis de gramatica: ' + error;
                respuesta = (
                    {
                        "errores": [msj]
                    }
                );
                res.render('cargarArchivo', respuesta);
            }
        }
    });
});

router.post('/prosessWison', (req, res) => {

    var result = null;
    var respuesta = null;
    try {
        result = analizador.parse(req.body.textWison);
        if (result !== undefined) {

            verificarCompocicion(result);
            respuesta = (
                {
                    "textWison": req.body.textWison,
                    "errores": (result.getErrores())
                }
            );
        }

    } catch (error) {
        var msj = 'Error fatal en analisis de gramatica: ' + error;
        respuesta = (
            {
                "textWison": req.body.textWison,
                "errores": [msj]
            }
        );
    }

    res.render('index', respuesta);
})

function verificarCompocicion(analisis) {
    var term = analisis.getTerminales();
    term.push('$_FIN');
    var noTerm = analisis.getNoTerminales();
    var prduc = analisis.getProducciones();

    var bandera = false;

    prduc.forEach(produc => {

        if (noTerm.find(pr => pr === produc.getPadre())) {
            bandera = true;
        } else {
            bandera = false;
        }

        if (bandera) {
            var element = produc.getDerivaciones();
            element.forEach(ele => {
                //console.log('Produccion: ' + produc.getPadre() + '->' + ele);
                if(!(term.find(t=> t === ele) || noTerm.find(te => te === ele))){
                    console.log('Error: '+ele+' se esta usando y no esta definido');
                    analisis.getErrores().push('Error estado no declarado: '+ele+' se esta usando y no esta definido');
                }
            });
        }else{
            //console.log('Error: '+produc.getPadre()+' no esta definido como no terminal')
            analisis.getErrores().push('Error estado no declarado: '+produc.getPadre()+' no esta definido como no terminal')
        }
    });
}


module.exports = router;