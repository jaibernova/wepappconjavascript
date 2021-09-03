const express = require('express');
const router = express.Router();

const Task = require('../models/task');

//obtiene una consulta a la base de datos en el navegador
router.get('/', async (req, res) => {
    const tasks = await Task.find();
 
    res.json(tasks);
    
    
    /*res.json({
        status: 'funciona'
    });*/
});
//crea una nueva entrada en la base de datos de acuerto al Schema definido en elarchivo task.js
router.post('/', async (req, res) =>{
    const { title, description } = req.body;
    const task =new Task({title, description});
    await task.save();
    console.log(task);
    //res.json('recibido');
    res.json({status: 'tarea guardada'});
});
//metodo para actualizar un registro de la base de datos
router.put('/:id', async (req,res) => {
    const { title, description } = req.body;
    const newTask = {title, description};
    
    //obtiene el id por consola
    //console.log(req.params.id);
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'actualizado'});

});
//borra un registro en la base
router.delete('/:id', async (req,res) => {

    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'eliminado'});

});

router.get('/:id', async (req,res) => {

    const task = await Task.findById(req.params.id);
    res.json(task);

});
j

module.exports=router;