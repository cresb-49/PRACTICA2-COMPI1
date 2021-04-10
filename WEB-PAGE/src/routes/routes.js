const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/archivoWison', (req, res) => {
    res.render('cargarArchivo');
});

router.post('/prosessWison',(req,res) =>{
    
});







//codigo de prueba
/*
router.get('/', (req,res) => {
    //res.send('Pagina en construccion');
    //res.sendFile(path.join(__dirname+'/views/index.html'));
    res.render(path.join(__dirname+'/views/index'));
    console.log(path.join(__dirname+'/views/index.ejs'));
    //Muestra el path de ejecucion del servidor 
    //console.log(__dirname);
});*/



 module.exports = router;