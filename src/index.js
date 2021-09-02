const express = require('express');
const morgan=require('morgan');
const path= require('path');

const { mongoose } = require('./database');

const app = express();

//configuracion
app.set('port', process.env.PORT || 5000);

//middlewares funciones antes de llegar a las rutas json habilita a la pagina a recibir arhivos json
app.use(morgan('dev'));
app.use(express.json());
//rutas aqui se colocan las rutas de la pagina web
app.use('/api/tasks' ,require('./routes/task.routes'));

//static files archivos que van en la carpeta public html css javascript que son la pagina inicial de la pagina web


//path.join(__dirname, 'public') selecciona la ruta de la carpeta actual y le agrega la ruta public  que es donde esta el archivo html que se mostrara
//console.log(path.join(__dirname, 'public')); 
app.use(express.static(path.join(__dirname, 'public')));
//iniciando el servidor

app.listen(app.get('port'), () => {
    console.log(`inicializado en puerto ${app.get('port')}`)

});