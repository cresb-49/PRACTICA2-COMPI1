const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const multer = require('multer');
const analizador = require('../js/analizador');
const fs = require('fs');

const path = '/media/benjamin/DATA/Documents/Programas_compiladores_1/PRACTICA_2/WEB-PAGE/uploads/';


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
            respuesta =({"errores":fileErr})
            res.render('cargarArchivo', respuesta);
        } else {
            try {
                result = analizador.parse(data);
                if (result !== undefined) {
                    respuesta = (
                        {
                            "errores": result.getErrores()
                        }
                    );
                    res.render('cargarArchivo', respuesta);
                }else{
                    res.render('cargarArchivo', {"errores":[]});
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

            console.log(result.getTerminales());
            console.log(result.getNoTerminales());

            respuesta = (
                {
                    "textWison": req.body.textWison,
                    "errores": result.getErrores()
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
module.exports = router;