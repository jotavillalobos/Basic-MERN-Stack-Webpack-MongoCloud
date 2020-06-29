const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const pTask = await Task.find();    
    console.log(pTask);
    res.json( {
        status: 'Skydive Logbook API',
        task: pTask
    })
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.json(task);
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;

    const task = new Task({
        title,
        description
    });
    await task.save();
    console.log(task);
    res.json({
        status: 'Task saved',
        taskId: task.id
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const newTask = {
        title,
        description
    }
    await Task.findByIdAndUpdate(id, newTask);
    res.json({
        status: 'Task updated'
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({
        status: 'Task deleted'
    });
});

module.exports = router;