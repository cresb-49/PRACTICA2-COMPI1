const express = require('express');
const app = express();
const path = require('path');

//configuracion del puerto del servidor
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares

//routes
app.use(require('./routes/routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

//Escuchas del servidor
app.listen(app.get('port'),()=>{
    console.log('Server start on PORT ',app.get('port'));
});