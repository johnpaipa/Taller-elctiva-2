const express = require('express');
const app = express();
const path = require('path');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.ejs');

//rutas
app.use('/', require('./routes/index'));

//puerto
app.listen(3000, function () {
    console.log('Server running on port 3000');
});