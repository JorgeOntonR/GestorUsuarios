const path = require('path');
const express = require('express');
const morgan = require('morgan'); 
const mongoose = require('mongoose');

const app = express();

//Conexion a BD
mongoose.connect('mongodb://localhost/GestorUsuarios', { useNewUrlParser: true })
.then(db => console.log('Conexion a DB exitosa'))
.catch(err => console.log(err));
//var db = 'mongodb://<carlos>:<carlos1>@ds139768.mlab.com:39768/rectorado';

mongoose.set('useUnifiedTopology', true);


//rutas importadas
const indexRoutes = require('./routes/index');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev')); //para ver el mensaje corto de ida y vuelta de servidor y cliente
app.use(express.urlencoded({extended: false})); //para entender datos enviados desde HTML (formulario)
	

//rutas
app.use('/', indexRoutes);

//incialización de servidor
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});