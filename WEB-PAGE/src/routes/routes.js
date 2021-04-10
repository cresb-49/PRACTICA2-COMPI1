const express = require('express');
const router = express.Router();
const morgan = require('morgan');

router.use(morgan('dev'));
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/archivoWison', (req, res) => {
    res.render('cargarArchivo');
});

router.post('/prosessWison',(req,res)=>{
    console.log(req.body);
    res.render('index');
})

module.exports = router;