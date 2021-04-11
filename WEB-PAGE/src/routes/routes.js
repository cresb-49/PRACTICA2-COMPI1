const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const analizador = require('../js/analizador');


router.use(morgan('dev'));
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


router.get('/', (req, res) => {
    res.render('index',{ textWison: 'Wison¿\r\nLex {:\r\n\r\n:}\r\n\r\nSyntax{{:\r\n\r\n:}}\r\n?Wison'});
});

router.get('/archivoWison', (req, res) => {
    res.render('cargarArchivo');
});

router.post('/prosessWison',(req,res)=>{
    //console.log(req.body);
    console.log(req.body.textWison);
    analizador.parse(req.body.textWison);
    var errors = analizador.errors;
    console.log('Imprecion desde Routes');
    console.log(errors);
    
    res.render('index',req.body);
})
module.exports = router;